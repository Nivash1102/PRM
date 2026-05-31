using prm as service from '../../srv/service';
annotate service.Partners with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Name',
                Value : Name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Status',
                Value : Status,
            },
            {
                $Type : 'UI.DataField',
                Value : address.City,
                Label : 'City',
            },
            {
                $Type : 'UI.DataField',
                Value : address.Country,
                Label : 'Country',
            },
            {
                $Type : 'UI.DataField',
                Value : address.PostalCode,
                Label : 'PostalCode',
            },
            {
                $Type : 'UI.DataField',
                Value : address.State,
                Label : 'State',
            },
            {
                $Type : 'UI.DataField',
                Value : address.Street,
                Label : 'Street',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Address',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Contacts',
            ID : 'Contacts',
            Target : 'contacts/@UI.LineItem#Contacts',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : Name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : Status,
        },
    ],
    UI.SelectionFields : [
        Name,
        Status,
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View',
    },
    UI.LineItem #tableView : [
    ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View 1',
    },
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'PartnerHeader',
            ID : 'PartnerHeader',
            Target : '@UI.FieldGroup#PartnerHeader',
        },
    ],
    UI.FieldGroup #PartnerHeader : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Name,
            },
            {
                $Type : 'UI.DataField',
                Value : Status,
            },
        ],
    },
    UI.FieldGroup #AddressSection : {
        $Type : 'UI.FieldGroupType',
        Data : [
        ],
    },
);

annotate service.Partners with {
    Name @Common.Label : 'Name'
};

annotate service.Partners with {
    Status @Common.Label : 'Status'
};

annotate service.contact with @(
    UI.LineItem #Contacts : [
        {
            $Type : 'UI.DataField',
            Value : Email,
            Label : 'Email',
        },
        {
            $Type : 'UI.DataField',
            Value : FirstName,
            Label : 'FirstName',
        },
        {
            $Type : 'UI.DataField',
            Value : LastName,
            Label : 'LastName',
        },
    ],
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'ContactHeader',
            ID : 'ContactHeader',
            Target : '@UI.FieldGroup#ContactHeader',
        },
    ],
    UI.FieldGroup #ContactHeader : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : FirstName,
                Label : 'FirstName',
            },
            {
                $Type : 'UI.DataField',
                Value : LastName,
                Label : 'LastName',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'User Authorization',
            ID : 'UserAuthorization',
            Target : 'userAuths/@UI.LineItem#UserAuthorization',
        },
    ],
);

annotate service.userAuth with @(
    UI.LineItem #UserAuthorization : [
        {
            $Type : 'UI.DataField',
            Value : UserAuth,
            Label : 'UserAuth',
        },
        {
            $Type : 'UI.DataField',
            Value : StartDate,
            Label : 'StartDate',
        },
        {
            $Type : 'UI.DataField',
            Value : EndDate,
            Label : 'EndDate',
        },
    ]
);

