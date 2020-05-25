/* 9876543829
 * Copyright (c) 2015, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import React, { Component } from "react";
import {
  AppRegistry,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import App from "./js/App";
import {
  forceUtil,
  mobilesync,
  oauth,
  net,
  smartstore
} from "react-native-force";

import { PermissionsAndroid } from "react-native";
import CallLogs from "react-native-call-log";
import { Assets } from "@react-navigation/stack";

var SharedPreferences = require("react-native-shared-preferences");
SharedPreferences.setName("sales_genie");
SharedPreferences.getItem("OwnerId", function(value) {
  //  If you have the value, then do nothing, else set the correct value.
  if (value) {
  } else {
    oauth.getAuthCredentials(success_response => {
      SharedPreferences.setItem("OwnerId", success_response.userId);
      SharedPreferences.setItem("AccessToken", success_response.accessToken);
    });
  }
});

// oauth.getAuthCredentials(
//   success_response => {
//     console.log("oauth success");
//     let salesConsultantIds = [];
//     salesConsultantIds.push(success_response.userId);
//     net.sendRequest(
//       "/services/apexrest/getDependentPicklistValues",
//       "getDependentPicklistValues",
//       response => {
//         console.log("############################" + JSON.stringify (response));
//       },
//       err => {
//         console.log("error - " + JSON.stringify(err));
//       },
//       "POST",
//       { dependentString: "Opportunity.Enquiry_Source__c" },
//       {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + success_response.accessToken
//       },
//       null,
//       null,
//       false
//     );
//   },
//   error_resp => {
//     console.error("oauth error");
//   }
// );

/*************/

// SELECT ID, Name, Phone, MobilePhone, (SELECT Id, Dealer__c, StageName FROM Enquiries__r WHERE(StageName !=: 'Delivered' AND StageName !=: 'Lost')) FROM Contact WHERE Phone =: searchQuery OR MobilePhone =: searchQuery OR Name like: nameSearch

// import enquiryPickList  from './PicklistHelpers/EnquiryPickListHelper';

// net.query("SELECT Id, Subject, Activity_Type__c, Model__c,Model__r.Name,Status__c,Dealer_Remarks__c,Dealer_Remarks_Type__c,Dealer_Remarks_Subtype__c,Call_Start_Time__c FROM Task",
// (data) => {
//   console.log(JSON.stringify(data));
// },
// (err) => {
//   console.log(JSON.stringify(err));
// });

// const syncUp = forceUtil.promiserNoRejection(mobilesync.syncUp);
// oauth.getAuthCredentials(
//   success_response => {
//     let usable_access_token = success_response.accessToken; //.replace('!', '\\!');
//     //alert(JSON.stringify(success_response));
//     let salesConsultantIds = [];
//     salesConsultantIds.push(success_response.userId);
//     // SharedPreferences.setItem("OwnerId", success_response.userId);
//     net.sendRequest(
//       "/services/data/v47.0/sobjects/Lead/",
//       "describe",
//       response => {
//         console.log("############################" +JSON.stringify(response));
//       },
//       err => {
//         alert("error - " + JSON.stringify(err));
//       },
//       "GET",
//       { salesConsultantIds: salesConsultantIds },
//       {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + usable_access_token
//       },
//       null,
//       null,
//       false
//     );

//   });

// net.query("SELECT Name FROM Product2 WHERE Segment_Code__c= 'Personal' GROUP BY Name",
// (d) => {
//   d.records.map((data) => {
//     console.log(data.Name);
//   })
// },
// (e) => {
//   console.log(JSON.stringify(e))
// });

// oauth.getAuthCredentials(success_response => {
//   let usable_access_token = success_response.accessToken; //.replace('!', '\\!');
//   //alert(JSON.stringify(success_response));
//   let salesConsultantIds = [];
//   salesConsultantIds.push(success_response.userId);
//   net.sendRequest(
//     "/services/apexrest/getDependentPicklistValues",
//     "describe",
//     response => {
//       console.log("############################" + JSON.parse(JSON.stringify(response)));
//     },
//     err => {
//       console.log("error - " + JSON.stringify(err));
//     },
//     "POST",
//     { dependentString: "Lead.Enquiry_Source__c" },
//     {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + usable_access_token
//     },
//     null,
//     null,
//     false
//   );
// });

// // net.query("SELECT Name FROM Product2 WHERE Segment_Code__c= 'Personal' GROUP BY Name",
// // (d) => {
// //   d.records.map((data) => {
// //     console.log(data.Name);
// //   })
// // },
// // (e) => {
// //   console.log(JSON.stringify(e))
// // });

// net.query(
//   "SELECT Id, Name, Email, MobilePhone, Enquiry_Type__c, Likely_Purchase__c, Enquiry_Source__c, Enquiry_Sub_Source__c, Segment__c, (SELECT Id, Subject, Activity_Type__c, Model__c, Product_Family__c ,Status, Status__c,Dealer_Remarks__c,Dealer_Remarks_Type__c,Dealer_Remarks_Subtype__c,Call_Start_Time__c, Actual_CallTime__c, Call_End_Time__c, WhoId  FROM Tasks where IsClosed= false), ( Select Id, Product_Family_Text__c, Interest_Category__c, Quantity__c,Vehicle_Colors__c, Product_Family_Variant__c, Fuel_Type_Text__c, Seating_Capacity_Text__c, Lead__c from Product_Interests__r) FROM Lead WHERE OwnerId = '0055D000002mkWcQAI' AND Id = '00Q5D000002ktx7UAA'",
//   (response) => {
//     console.log("=== " + JSON.stringify(response));

//   },
//   (err) => {
//     console.log("************1");
//     console.log(err);
//   }
// );



class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }
  componentDidMount() {
    // const a = [];
    // const syncUp = forceUtil.promiserNoRejection(mobilesync.syncUp);
    // oauth.getAuthCredentials(success_response => {
    //   let usable_access_token = success_response.accessToken; //.replace('!', '\\!');
    //   //alert(JSON.stringify(success_response));
    //   let salesConsultantIds = [];
    //   salesConsultantIds.push(success_response.userId);
    //   let data;
    //   net.sendRequest(
    //     "/services/apexrest/getDependentPicklistValues",
    //     "getDependentPicklistValues",
    //     res => {
    //       data = JSON.parse(res);
    //       console.log(data["Response"]);
    //     },
    //     err => {
    //       console.log("error - " + JSON.stringify(err));
    //     },
    //     "POST",
    //     { dependentString: "Task.Dealer_Remarks_Type__c" },
    //     {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + usable_access_token
    //     },
    //     null,
    //     null,
    //     false
    //   );
    // });
    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
    //     {
    //       title: "Call Log Example",
    //       message: "Access your call logs",
    //       buttonNeutral: "Ask Me Later",
    //       buttonNegative: "Cancel",
    //       buttonPositive: "OK"
    //     }
    //   );
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     console.log(CallLogs);
    //     let sum = 0;
    //     const a = [];
    //     CallLogs.load(10).then(c => {
    //       c.map((h) => {
    //         if((parseInt(h.dateTime) == new Date().getDate()) && h.phoneNumber == "+917977040526") {
    //           a.push(h.duration);
    //         }
    //       })
    //       sum = a.reduce((result,number) => result+number);
    //       console.log(sum);
    //     });
    //   } else {
    //     console.log("Call Log permission denied");
    //   }
    // } catch (e) {
    //   console.log(e);
    // }

    // net.query("SELECT ID, Phone, MobilePhone, ACE_Dealer__c, Email, Status, Segment__c, (SELECT ID, Product__c FROM Product_Interests__r) FROM Lead WHERE MobilePhone=\'9988665533\' AND recordTypeId = \‘0125D000000Qa87QAC\’ ",
    // (data) => {
    //   console.log(JSON.stringify(data));
    // },
    // (error) => {
    //   console.log(JSON.stringify(error));
    // })

  };
  render() {
    // const customData = require("./EnquiryPickList.json");
    // // console.log("custom data  : " + customData);
    // let picklistValues = {};

    // customData.fields.map((field, index) => {
    //   /*if (field.picklistValues.length) {
    //     //console.log('' + index + ' - ' + field.name);
    //     picklistValues[field.name] = field.picklistValues.map(pick => {
    //       return pick.label;
    //     });
    //   }*/
    //   console.log(index + ' - label = ' + field.label + ', name = ' + field.name);
    // });

    // console.log(JSON.stringify(picklistValues));

    // const customData = require("./RSAShieldAccessoriesPickList.json");

    // console.log(JSON.stringify(customData));
    // console.log("okay");

    return <View></View>;
  }
}
AppRegistry.registerComponent("sf_mahindra", () => App);

