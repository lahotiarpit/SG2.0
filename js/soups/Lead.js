const soupName = 'Lead';
const soupSyncName = 'LeadSync';
const salesForceName = 'Lead';
const soupEntries = [
	{ path: "Company", type: "string" },
	{ path: "recordTypeId", type: "string" },
	{ path: "ACE_Dealer__c", type: "string" },
	{ path: "LeadSource", type: "string" },
	{ path: "Salutation", type: "string" },
	{ path: "FirstName", type: "string" },
	{ path: "LastName", type: "string" },
	{ path: "Email", type: "string" },
	{ path: "MobilePhone", type: "string" },
	{ path: "Segment__c", type: "string" },
	{ path: "Enquiry_Type__c", type: "string" },
	{ path: "Enquiry_Source__c", type: "string" },
	{ path: "Sub_Source__c", type: "string" },
	{ path: "Likely_Purchase__c", type: "string" },

	{ path: "__local__", type: "string" },
	{ path: "__locally_created__", type: "string" },
	{ path: "__locally_updated__", type: "string" },
	{ path: "__locally_deleted__", type: "string" },
];

export default Lead = {soupName: soupName, soupEntries: soupEntries, soupSyncName: soupSyncName, salesForceName: salesForceName}
