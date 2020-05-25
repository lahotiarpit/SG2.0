const soupName = 'opportunity';
const soupSyncName = 'opportunitySync';
const salesForceName = 'Opportunity';
const soupEntries = [
	{ path: "Id", type: "string" },
	{ path: "Name", type: "string" },
	{ path: "AccountId", type: "string" },
	{ path: "Dealer__c", type: "string" },
	{ path: "StageName", type: "string" },
	{ path: "Contact__c", type: "string" },
	{ path: "Enquiry_Type__c", type: "string" },
	{ path: "Enquiry_Source__c", type: "string" },
	{ path: "Usage_Area__c", type: "string" },
	{ path: "Likely_Purchase__c", type: "string" },
	{ path: "Prospect_Type__c", type: "string" },
	{ path: "CloseDate", type: "string" },

	{ path: "__local__", type: "string" },
	{ path: "__locally_created__", type: "string" },
	{ path: "__locally_updated__", type: "string" },
	{ path: "__locally_deleted__", type: "string" },
];

export default Opportunity = {soupName: soupName, soupEntries: soupEntries, soupSyncName: soupSyncName, salesForceName: salesForceName}
