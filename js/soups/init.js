import { smartstore, mobilesync, forceUtil } from "react-native-force";
//import { querySoup } from "react-native-force/src/react.force.smartstore";

import Account from './Account';
import Contact from './Contact';
import Opportunity from './Opportunity';
import Task from './Task';
import EnquiryModel from "./EnquiryModel";

import SoupHelper from './SoupHelper';
import Lead from './Lead';

const soupExists = forceUtil.promiser(smartstore.soupExists);
const registerSoup = forceUtil.promiser(smartstore.registerSoup);
const querySoup = forceUtil.promiser(smartstore.querySoup);
const buildExactQuerySpec = forceUtil.promiser(smartstore.buildExactQuerySpec);

function createSoupSync(soupInfo) {
    let fieldlist = SoupHelper.getSoupFieldList(soupInfo);

    mobilesync.syncUp(
        false,
        {},
        soupInfo.soupName,
        {
            mergeMode: mobilesync.MERGE_MODE.OVERWRITE,
            fieldlist
        },
        soupInfo.soupSyncName,
        s => {
            console.log(JSON.stringify(s));
            console.log(soupInfo.soupSyncName + " - sync success");
        },
        e => {
            console.log(JSON.stringify(e));
            console.log(soupInfo.soupSyncName + " - sync fail");
        }
    )
}

function registerNewSoup(soupInfo) {
    registerSoup(
        false,
        soupInfo.soupName,
        soupInfo.soupEntries,
        (data) => {
            console.log(soupInfo.soupName + ' - soup created success = ' + data);
            createSoupSync(soupInfo);
        },
        (err) => {
            console.log(soupInfo.soupName + ' - soup register failed = ' + err);
            alert(soupInfo.soupName + ' - Unable to initialize, kindly retry again !');
        }
    );
}

function createSoup(soupInfo) {
	soupExists(false, 
        soupInfo.soupName, 
        (data) => {
            console.log(soupInfo.soupName + ' - soup exists = ' + data);
            if(data == false) {
                registerNewSoup(soupInfo);
            }
        }, 
        (err) => {
            console.log(soupInfo.soupName + ' - soup exists err = ' + err);
            alert(soupInfo.soupName + ' - Unable to initialize, kindly retry again !')
        }
    );
}

function displaySoups() {
    //let querySpec = "SELECT * from opportunity";//buildExactQuerySpec(Opportunity.soupName);

    {   //Working
        //  {"beginKey": null, "endKey": null, "indexPath": undefined, "likeKey": null, "matchKey": null, "order": "ascending", "orderPath": null, "pageSize": 10, "queryType": "smart", "selectPaths": null, "smartSql": "select {opportunity:Name} from {opportunity}"}

        let querySpec = smartstore.buildSmartQuerySpec('select {account:Id} from {' + Account.soupName + '}', 10);
        console.log(querySpec);
        smartstore.runSmartQuery(false, querySpec, records => {console.log('===== RECORDS ==== '); console.log(JSON.stringify(records))}, error => {console.log(error)});
    }

    /*{
        //  working
        var querySpec = smartstore.buildExactQuerySpec(
            '_soupEntryId',
            '2');
        smartstore.querySoup(false, Account.soupName,
            querySpec, function(cursor) {
                console.log('---------');
                console.log(cursor);
            }, e => {console.log(e)});
    }*/
}

export default function initSoups() {
    //console.log(Opportunity)
    // smartstore.removeSoup(false, Account.soupName);
    // smartstore.removeSoup(false, Contact.soupName);
    // smartstore.removeSoup(false, Opportunity.soupName);
    // smartstore.removeSoup(false, Task.soupName);
    // smartstore.removeSoup(false, EnquiryModel.soupName);
    // mobilesync.deleteSync(false, Account.soupSyncName);
    // mobilesync.deleteSync(false, Contact.soupSyncName);
    // mobilesync.deleteSync(false, Opportunity.soupSyncName);
    // mobilesync.deleteSync(false, Task.soupSyncName);
    // mobilesync.deleteSync(false, EnquiryModel.soupSyncName);

	createSoup(Account);
	createSoup(Contact);
    createSoup(Opportunity);
    createSoup(Task);
    createSoup(EnquiryModel);
    createSoup(Lead);

    //displaySoups();
}