const cds = require('@sap/cds');
const db = cds.entities('PartnerRelationshipManagement');

module.exports = cds.service.impl(async function() {
  const { Partners } = this.entities;

  this.on('submitPartner', async (req) => {
    const data = req.data;
    const tx = cds.tx(req);
    const partnerID = cds.utils.uuid();

    const result = await tx.run( 
      INSERT .into(db.Partners).entries({ ID: partnerID,
        Name: data.Name,
        Status: data.Status,
      address: data.address,
      contact: data.contacts
    })
  );   
  return await tx.run(SELECT .one .from (db.Partners).where({ ID: result.ID }) 
  .columns( '*', { address: ['*'] }, { contacts: ['*'] }
                )
        ); 
    });

    this.on('greetUser', async (req) => {
      const data = req.data;
      const tx = cds.tx(req);
      const partnerID = cds.utils.uuid();




      await tx.run(
        INSERT .into(db.Partners).entries({ 
          ID: partnerID,
          Name: data.Name,
          Status: data.Status,
        address: data.address,
        contacts: data.contacts
      })
    );

    const result = await tx.run(SELECT .one .from (db.Partners).where({ ID: partnerID })    
    .columns( '*', { address: ['Street,City,State,PostalCode,Country'] }, { contacts: ['FirstName,LastName,Email'] }
                  )
          );
      //return `Recieved the Partner details with Name: ${result.Name}, Partner number: ${result.Status} and ${result.PartnerNumber}`;
      return result;
    });
});