using {PartnerRelationshipManagement as my} from '../db/schema.cds';

@path: '/service/prm'
service prm {

    @cds.redirection.target
    //@odata.draft.enabled
    entity Partners as
        projection on my.Partners {
            *
        }
        excluding {
            createdAt,
            createdBy,
            modifiedAt,
            modifiedBy
        };

    entity contact as
        projection on my.Contact {
            *
        }
        excluding {
            createdAt,
            createdBy,
            modifiedAt,
            modifiedBy
        };

    action createPartner(
        Name     : String,
        Status   : my.PartnerStatus,    // ← was String, now uses enum type
        address  : {
            Street     : String;
            City       : String;
            State      : String;
            PostalCode : String;
            Country    : String;
        },
        contacts : many {
            FirstName  : String;
            LastName   : String;
            Email      : String;
           
            userAuths  : many {
                UserAuth  : my.UserAuthValues;  // ← was String, now uses enum type
                
            };
        }
    ) returns String;

}