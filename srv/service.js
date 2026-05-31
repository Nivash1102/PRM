// srv/service.js
const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    // ── Resolve entities directly from DB model ───────────────────────
    const Partners = cds.db.model.definitions['PartnerRelationshipManagement.Partners'];
    const Address  = cds.db.model.definitions['PartnerRelationshipManagement.Address'];
    const Contact  = cds.db.model.definitions['PartnerRelationshipManagement.Contact'];
    const UserAuth = cds.db.model.definitions['PartnerRelationshipManagement.UserAuth'];

    // ── Date Helpers ──────────────────────────────────────────────────
    const getStartDate = () => new Date().toISOString().split('T')[0];

    const getEndDate = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 2);
        return date.toISOString().split('T')[0];
    };

    // ── Enum Helpers ──────────────────────────────────────────────────
    const getValidStatuses = () => {
        const statusType = cds.model.definitions['PartnerRelationshipManagement.PartnerStatus'];
        return Object.entries(statusType?.enum ?? {}).map(([key, val]) => val.val ?? key);
    };

    const getValidUserAuthValues = () => {
        const userAuthType = cds.model.definitions['PartnerRelationshipManagement.UserAuthValues'];
        return Object.entries(userAuthType?.enum ?? {}).map(([key, val]) => val.val ?? key);
    };

    this.on('createPartner', async (req) => {

        const { Name, Status, address, contacts } = req.data;

        // ── Basic field validations ───────────────────────────────────
        if (!Name)    return req.error(400, 'Partner Name is required.');
        if (!Status)  return req.error(400, 'Partner Status is required.');
        if (!address) return req.error(400, 'Partner Address is required.');

        // ── Model-driven enum validations ─────────────────────────────
        const validStatuses       = getValidStatuses();
        const validUserAuthValues = getValidUserAuthValues();

        if (!validStatuses.length) {
            return req.error(500, 'Could not resolve PartnerStatus enum from CDS model.');
        }
        if (!validUserAuthValues.length) {
            return req.error(500, 'Could not resolve UserAuthValues enum from CDS model.');
        }

        if (!validStatuses.includes(Status)) {
            return req.error(400, `Invalid Status '${Status}'. Must be one of: ${validStatuses.join(', ')}`);
        }

        // ── Validate ALL inputs upfront before any DB writes ──────────
        if (contacts?.length > 0) {
            for (const [cIdx, contact] of contacts.entries()) {

                if (!contact.FirstName) return req.error(400, `Contact[${cIdx}]: FirstName is required.`);
                if (!contact.LastName)  return req.error(400, `Contact[${cIdx}]: LastName is required.`);
                if (!contact.Email)     return req.error(400, `Contact[${cIdx}]: Email is required.`);

                if (contact.userAuths?.length > 0) {
                    for (const [uIdx, ua] of contact.userAuths.entries()) {
                        if (!ua.UserAuth) {
                            return req.error(400, `Contact[${cIdx}] UserAuth[${uIdx}]: UserAuth value is required.`);
                        }
                        if (!validUserAuthValues.includes(ua.UserAuth)) {
                            return req.error(400, `Contact[${cIdx}] UserAuth[${uIdx}]: Invalid value '${ua.UserAuth}'. Must be one of: ${validUserAuthValues.join(', ')}`);
                        }
                    }
                }
            }
        }

        // ── Capture dates once for entire request ─────────────────────
        const startDate = getStartDate();
        const endDate   = getEndDate();

        // ── Wrap everything in a transaction ──────────────────────────
        const tx = cds.transaction(req);

        try {

            // ── 1. Create Partner ─────────────────────────────────────
            const partnerId = cds.utils.uuid();

            await tx.run(
                INSERT.into('PartnerRelationshipManagement.Partners').entries({
                    ID    : partnerId,
                    Name  : Name,
                    Status: Status,
                })
            );

            // ── 2. Create Address ─────────────────────────────────────
            await tx.run(
                INSERT.into('PartnerRelationshipManagement.Address').entries({
                    ID          : cds.utils.uuid(),
                    Street      : address.Street,
                    City        : address.City,
                    State       : address.State,
                    PostalCode  : address.PostalCode,
                    Country     : address.Country,
                    StartDate   : startDate,
                    EndDate     : endDate,
                    Active      : true,
                    partners_ID : partnerId,
                })
            );

            // ── 3. Create Contacts + UserAuths ────────────────────────
            if (contacts?.length > 0) {

                for (const [cIdx, contact] of contacts.entries()) {

                    const contactId = cds.utils.uuid();

                    await tx.run(
                        INSERT.into('PartnerRelationshipManagement.Contact').entries({
                            ID          : contactId,
                            FirstName   : contact.FirstName,
                            LastName    : contact.LastName,
                            Email       : contact.Email,
                            StartDate   : startDate,
                            EndDate     : endDate,
                            Active      : true,
                            partners_ID : partnerId,
                        })
                    );

                    // ── 4. Create UserAuths per Contact ───────────────
                    if (contact.userAuths?.length > 0) {

                        const userAuthEntries = contact.userAuths.map((ua) => ({
                            ID         : cds.utils.uuid(),
                            UserAuth   : ua.UserAuth,
                            StartDate  : startDate,
                            EndDate    : endDate,
                            Active     : true,
                            contact_ID : contactId,
                        }));

                        await tx.run(
                            INSERT.into('PartnerRelationshipManagement.UserAuth').entries(userAuthEntries)
                        );
                    }
                }
            }

            // ── 5. Commit transaction ─────────────────────────────────
            await tx.commit();

            return `Partner '${Name}' created successfully with ID: ${partnerId}`;

        } catch (err) {

            // ── Rollback on any failure ───────────────────────────────
            await tx.rollback();
            req.error(500, `Partner creation failed. Reason: ${err.message}`);
        }
    });

});