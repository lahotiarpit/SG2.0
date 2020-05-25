import { smartstore, mobilesync, forceUtil } from "react-native-force";

export default {
	addMultipleRecordsToSoupAndSync: function(soupInfo, records, callback) {
		smartstore.upsertSoupEntries(false, soupInfo.soupName, records,
			data => {
				console.log(soupInfo.soupName +  " - Upsert success = " + JSON.stringify(data));
				mobilesync.reSync(false, soupInfo.soupSyncName, 
					(resync_data) => {
						console.log('resync success = ' + JSON.stringify(resync_data));
						callback({data: data});  //	?????? CHECK in addSingleRecordToSoupAndSync if you need more info, else explore.
					}, (e) => {
						console.error(e);
						callback({error: e})
					}
				);
			},
			error => {
				console.log(soupInfo.soupName + " - Upsert fail = " + error);
				callback({error: error})
			}
		);
	},

	addSingleRecordToSoupAndSync: function(soupInfo, record, callback) {
		smartstore.upsertSoupEntries(false, soupInfo.soupName, [record],
			data => {
				console.log(soupInfo.soupName +  " - Upsert success = " + JSON.stringify(data));
				mobilesync.reSync(false, soupInfo.soupSyncName, 
					(resync_data) => {
						console.log('resync success = ' + JSON.stringify(resync_data));
						callback({data: data[0]});  //	We are passing data because it is the actual soup record.
					}, (e) => {
						console.error(e);
						callback({error: e})
					}
				);
			},
			error => {
				console.log(soupInfo.soupName + " - Upsert fail = " + error);
				callback({error: error})
			}
		);
	},

	getSoupRecordBySoupEntryId: function(soupInfo, soupEntryId, callback) {
		console.log('calling getSoupRecordBySoupEntryId for soupEntryId = ' + soupEntryId);
		var querySpec = smartstore.buildExactQuerySpec(
            '_soupEntryId',
            '' + soupEntryId);
        smartstore.querySoup(false, soupInfo.soupName,
            querySpec, function(cursor) {
				console.log('cursor = ' + JSON.stringify(cursor))
				if(cursor && cursor.totalEntries > 0) {
					callback({data: cursor.currentPageOrderedEntries[0]});
				}
            }, e => {console.log(e); callback({error: e})});
	},

	getSoupFieldList: function(soupInfo) {
		return soupInfo.soupEntries.filter(field => {
			switch(field.path) {
				case 'Id':
				case '__local__':
				case '__locally_created__':
				case '__locally_updated__':
				case '__locally_deleted__':
					return false;
				default:
					return true;
			}
		}).map(value => {return value.path});
	}
}