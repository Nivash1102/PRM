sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/prm/prmui/test/integration/pages/PartnersList",
	"com/prm/prmui/test/integration/pages/PartnersObjectPage"
], function (JourneyRunner, PartnersList, PartnersObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/prm/prmui') + '/test/flp.html#app-preview',
        pages: {
			onThePartnersList: PartnersList,
			onThePartnersObjectPage: PartnersObjectPage
        },
        async: true
    });

    return runner;
});

