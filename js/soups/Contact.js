const soupName = 'contact';
const soupSyncName = 'contactSync';
const salesForceName = 'Contact';
const soupEntries = [
	{ path: "Id", type: "string" },
	{ path: "Salutation", type: "string" },
	{ path: "FirstName", type: "string" },
	{ path: "LastName", type: "string" },
	{ path: "Age__c", type: "string" },
	{ path: "Email", type: "string" },
	{ path: "MobilePhone", type: "string" },
	{ path: "MailingPostalCode", type: "string" },
	{ path: "MailingState", type: "string" },
	{ path: "MailingCity", type: "string" },
	{ path: "MailingStreet", type: "string" },
	{ path: "AccountId", type: "string" },

	{ path: "__local__", type: "string" },
	{ path: "__locally_created__", type: "string" },
	{ path: "__locally_updated__", type: "string" },
	{ path: "__locally_deleted__", type: "string" },
];

export default Contact = {soupName: soupName, soupEntries: soupEntries, soupSyncName: soupSyncName, salesForceName: salesForceName}
