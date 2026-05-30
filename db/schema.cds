namespace PartnerRelationshipManagement;

using { managed } from '@sap/cds/common';

entity Partners : managed
{
    key ID : UUID;
    Name : String(100);
    Status : PartnerStatus;
    address : Composition of one Address on address.partners = $self;
    contacts : Composition of many Contact on contacts.partners = $self;
}

entity Address : managed
{
    key ID : UUID;
    Street : String(100);
    City : String(50);
    State : String(50);
    PostalCode : String(20);
    Country : String(20);
    partners : Association to one Partners;
}

entity Contact : managed
{
    key ID : UUID;
    FirstName : String(50);
    LastName : String(50);
    Email : String(100);
    partners : Association to one Partners;
    userAuths : Composition of many UserAuth on userAuths.contact = $self;
}

entity UserAuth : managed
{
    key ID : UUID;
    UserAuth : UserAuthValues;
    contact : Association to one Contact;
}

type PartnerStatus : String enum
{
    Prospect;
    Active;
    Terminated;
}

type UserAuthValues : String enum
{
    PB = 'Partnership Basic';
    PUA = 'Partnership User Admin';
    ESI = 'E-signer';
}
