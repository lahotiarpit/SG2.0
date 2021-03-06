const soupName = 'product';
const soupSyncName = 'productSync';
const salesForceName = 'ACE_Product_Interest__c';
const soupEntries = [
	{ path: "Id", type: "string" },
	{ path: "Product_Family_Text__c", type: "string" },
	{ path: "Interest_Category__c", type: "string" },
	{ path: "Quantity__c", type: "string" },
	{ path: "Enquiry__c", type: "string" },

	{ path: "__local__", type: "string" },
	{ path: "__locally_created__", type: "string" },
	{ path: "__locally_updated__", type: "string" },
	{ path: "__locally_deleted__", type: "string" },
];

export default ACE_Product_Interest__c = {soupName: soupName, soupEntries: soupEntries, soupSyncName: soupSyncName, salesForceName: salesForceName}
