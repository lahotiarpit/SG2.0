const soupName = 'account';
const soupSyncName = 'accountSync';
const salesForceName = 'Account';
const soupEntries = [
	{ path: "Id", type: "string" },
	{ path: "Name", type: "string" },
	{ path: "RecordTypeId", type: "string" },
	{ path: "BillingPostalCode", type: "string" },
	{ path: "BillingState", type: "string" },
	{ path: "BillingCity", type: "string" },
	{ path: "BillingStreet", type: "string" },
	
	{ path: "__local__", type: "string" },
	{ path: "__locally_created__", type: "string" },
	{ path: "__locally_updated__", type: "string" },
	{ path: "__locally_deleted__", type: "string" },
];

export default Account = {soupName: soupName, soupEntries: soupEntries, soupSyncName: soupSyncName, salesForceName: salesForceName}
