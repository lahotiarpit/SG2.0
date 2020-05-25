const soupName = 'enquiryModel';
const soupSyncName = 'enquiryModelSync';
const salesForceName = 'ACE_Product_Interest__c';
const soupEntries = [
	
	{ path: "Id", type: "string" },

	{ path: "Product_Family_Text__c", type: "string" },
	{ path: "Interest_Category__c", type: "string" },
	{ path: "Quantity__c", type: "string" },
	{ path: "Enquiry__c", type: "string" },
	{ path: "Lead__c", type: "string" },
	{ path: "Product_Family_Variant__c", type: "string" },
	{ path: "Vehicle_Colors__c", type: "string" },
	{ path: "Seating_Capacity_Text__c", type: "string" },
	{ path: "Fuel_Type_Text__c", type: "string" },
	
	{ path: "__local__", type: "string" },
	{ path: "__locally_created__", type: "string" },
	{ path: "__locally_updated__", type: "string" },
    { path: "__locally_deleted__", type: "string" },

];

export default EnquiryModel = {soupName: soupName, soupEntries: soupEntries, soupSyncName: soupSyncName, salesForceName: salesForceName}
