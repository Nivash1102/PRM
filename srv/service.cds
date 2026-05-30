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

    action submitPartner(Name: String,
                         Status: String,
                         address: {
        Street     : String;
        City       : String;
        State      : String;
        PostalCode : String;
        Country    : String
    },
                         contacts: many {
        FirstName  : String;
        LastName   : String;
        Email      : String
    }) returns Partners;

    action greetUser (
        Name: String, 
        Status: String, 
        address: {
        Street     : String;
        City       : String;
        State      : String;
        PostalCode : String;
        Country    : String
    },
                         contacts: many {
        FirstName  : String;
        LastName   : String;
        Email      : String
    }

        ) returns Partners; 




}
