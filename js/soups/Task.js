const soupName = 'task';
const soupSyncName = 'taskSync';
const salesForceName = 'Task';
const soupEntries = [
	
	{ path: "Id", type: "string" },
	{ path: "Subject", type: "string" },
	{ path: "Activity_Type__c", type: "string" },
	{ path: "Type", type: "string" },
	
	{ path: "Status__c", type: "string" },
	
	{ path: "Product_Family__c", type: "string" },
	{ path: "WhatId", type: "string" },
	{ path: "WhoId", type: "string" },
	
	{ path: "Dealer_Remarks__c", type: "string" },
	{ path: "Dealer_Remarks_Type__c", type: "string" },
	{ path: "Dealer_Remarks_Subtype__c", type: "string" },
	
	{ path: "Call_Start_Time__c", type: "string" },
	{ path: "Call_End_Time__c", type: "string" },
	{ path: "Actual_CallTime__c", type: "string" },

	{ path: "__local__", type: "string" },
	{ path: "__locally_created__", type: "string" },
	{ path: "__locally_updated__", type: "string" },
    { path: "__locally_deleted__", type: "string" },

];

export default Task = {soupName: soupName, soupEntries: soupEntries, soupSyncName: soupSyncName, salesForceName: salesForceName}
