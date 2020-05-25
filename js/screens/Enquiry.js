import React, { Component } from "react";
import {
  Avatar,
  Card,
  Chip,
  Title,
  Paragraph,
  TextInput,
  RadioButton,
  ActivityIndicator,
} from "react-native-paper";
import {
  Text,
  View,
  Header,
  Icon,
  Left,
  Body,
  DatePicker,
  Picker,
  Label,
  Row,
  Right,
  Item,
  Button,
} from "native-base";
import { ProgressSteps, ProgressStep } from "../ProgressSteps/index";
import {
  StyleSheet,
  BackHandler,
  Alert,
  Modal,
  ScrollView,
  TimePickerAndroid,
} from "react-native";

import Account from "../soups/Account";
import Contact from "../soups/Contact";
import Opportunity from "../soups/Opportunity";
import Task from "../soups/Task";
import SoupHelper from "../soups/SoupHelper";

//import { smartstore, mobilesync, forceUtil } from "react-native-force";
import { syncUp } from "react-native-force/src/react.force.mobilesync";
import enquiryPickList from "../PicklistHelpers/EnquiryPickListHelper";
import contactPickList from "../PicklistHelpers/ContactPickListHelper";
import enquiryProduct2PickListHelper from "../PicklistHelpers/EnquiryProduct2PickListHelper";
import taskPickList from "../PicklistHelpers/TaskPickListHelper";

import {
  forceUtil,
  mobilesync,
  oauth,
  net,
  smartstore,
} from "react-native-force";
import EnquiryModel from "../soups/EnquiryModel";

//const upsertSoupEntries = forceUtil.promiser(smartstore.upsertSoupEntries);

const MAX_CALENDAR_DAYS = 30 * 24 * 60 * 60 * 1000;

class Enquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      check: false,
      chosenDate: "",
      checked: "first",
      FirstName: "",
      LastName: "",
      Age: "",
      Email: "",
      //ReferByName: "",
      MobileNumber: "",
      //ReferralMobileNumber: "",
      Enquirytype: "",
      EnquirySource: "",
      LikelyPurchase: "",
      OccupationType: "",
      Gender: "",
      CustomerType : "",
      enquiryTab3Err: false,
      //Quantity: "",
      //next: false,
      SubSource: "",
      ProductName: "",
      dealerC: "",
      //Variant: "",
      //Color: "",
      //FuelType: "",
      //SeatCapacity: "",
      //TransmissionType: "",
      //isValid: false,
      //errors: false,
      postalCodeValidate: "",
      stateValidate: "",
      cityValidate: "",
      streetValidate: "",
      ProspectType: "",
      ProspectTypeLabel: "",
      State: "",
      City: "",
      PostalCode: "",
      Country: "",
      Street: "",
      name: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      err: false,
      NextFollowUpActions: "",
      //isDisabled: false,
      showAddVehicleModal: false,
      addressErr: false,
      prospectTypeData: [],

      //  Add Vehicle
      chooseModel: "",
      quantity: "1",
      interest: "",
      primaryInterestModel: "",

      //  Followup
      subject: "",
      model: "",
      type: "",
      status: "",
      task: false,
      enquiryLastTabErr : false,
      remark: "",
      Remark: "",
      RemarkType: "",
      RemarkSubType: "",
      selectedTimeSlot: this.getNextTimeSlot(),

      //  Picklist for Enquiry
      Prospect_Type__c: [],
      Likely_Purchase__c: [],
      Enquiry_Source__c: [],
      Enquiry_Type__c: [],
      Enquiry_Sub_Source__c: [],
      //Customer_Type__c:[],
      Occupation__c:[],

      //  Picklist for followup
      TaskSubject: [],
      TaskType: [],
      TaskStatus: [],

      //  placeholder for added list of models
      addListOfModel: {},
      currentDate: new Date(),

      isEnquirySourceLoading: false,
      enquirySourceList: undefined,
      enquirySubSourceList : undefined,

      ownerId: undefined,
      AccessToken: undefined,

      userStepHasError: true,
      addressStepHasError: true,
      demographicHasError : true,
      enquiryStepHasError: true,
      productStepHasError: true,
      followUpStepHasError: true
    };

    // .....FOR FOCUSING TO NEXT TEXTINPUT.....

    this.GotoFirstName = React.createRef();
    this.GoToLastName = React.createRef();
    this.GoToEmail = React.createRef();
    this.GoToMobileNumber = React.createRef();
    this.GoToReferByName = React.createRef();
    this.GoToReferralMobileNumber = React.createRef();
    this.GoToLastName = React.createRef();
    this.GoToEnquiryDate = React.createRef();
    this.GoToEnquiryType = React.createRef();
    this.GoToEnquirySource = React.createRef();
    this.GoToStreet = React.createRef();
    this.State = React.createRef();
    this.City = React.createRef();
    this.Country = React.createRef();
    this.PostalCode = React.createRef();
    // .....BIND THE DATE TO THE SETDATE OBJECT.....

    this.setDate = this.setDate.bind(this);

    // HANDELING HARDWARE BACK BUTTON CONTROL

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    // ................................................
  }

  validateUserStep = () => {

    var expressionForMailValidation = /^(.+)@(.+)$/;
    var expressionForPhoneNumber = /^\d{10}$/;
    
    if (!this.state.FirstName) {
      alert('Please provide First Name'); return;
    } else if (!this.state.LastName) {
      alert('Please provide Last Name'); return;
    } else if (!this.state.Email) {
      alert('Please provide Email'); return;
    } else if (!expressionForMailValidation.test(this.state.Email)) {
      alert('Invalid mail id'); return;
    } else if (!this.state.MobileNumber) {
      alert('Please provide Mobile Number'); return;
    } else if(this.state.MobileNumber.length < 10) {
      alert('Mobile number must be 10 digits'); return;
    } else if(!expressionForPhoneNumber.test(this.state.MobileNumber)) {
      alert('Invalid mobile number'); return;
    }  
    else {
      this.setState({userStepHasError: false});
    }
  }
  validateDemographicStep = () =>{
      this.setState({demographicHasError : false});
  }

  validateAddressStep = () => {
    if (!this.state.PostalCode) {
      alert('Please provide Postal Code'); return;
    } else if(this.state.PostalCode.length<6) {
      alert('Postal code should be 6 digits'); return;
    } else if (!this.state.State) {
      alert('Please provide State'); return;
    } else if (!this.state.City) {
      alert('Please provide City'); return;
    } else if (!this.state.Street) {
      alert('Please provide Street'); return;
    } else {
      this.setState({addressStepHasError: false});
    }
  }

  validateEnquiryStep = () => {
    if (!this.state.EnquiryType) {
      alert('Please provide Enquiry Type'); return;
    } else
    if (!this.state.EnquirySource) {
      alert('Please provide Enquiry Source'); return;
    } else
    if (!this.state.SubSource) {
      alert('Please provide Sub Source'); return;
    } else
    if (!this.state.LikelyPurchase) {
      alert('Please provide Likely Purchase'); return;
    } else {
      this.setState({enquiryStepHasError: false});
    }
  }

  validateProductStep = () => {
    if(Object.keys(this.state.addListOfModel).length == 0) {
      alert('Please add atleast one vehicle / product'); return;
    } else {
      this.setState({productStepHasError: false});
    }
  }
  
  validateFollowUpStep = () => {
    if (!this.state.model) {
      alert('Please provide Model'); return;
    } else 
    if (!this.state.type) {
      alert('Please provide Type'); return;
    } else 
    if (!this.state.chosenDate) {
      alert('Please provide a Call date'); return;
    } else {
      this.setState({followUpStepHasError: false});
      this.onEnquirySubmit();
    }
  }

  /*getNameValidate = () => {
    if (this.state.FirstName == "") {
      this.setState({
        name: "Name cannot be empty",
      });
    } else {
      this.setState({
        name: "",
      });
    }
  };

  getLastNameValidate = () => {
    if (this.state.LastName == "") {
      this.setState({
        lastName: "Last Name cannot be empty",
      });
    } else {
      this.setState({
        lastName: "",
      });
    }
  };

  getEmailValidate = () => {
    if (
      this.state.Email == "" ||
      !(this.state.Email.includes(".") && this.state.Email.includes("@"))
    ) {
      this.setState({
        email: "Invalid mail id",
      });
    } else {
      this.setState({
        email: "",
      });
    }
  };

  getMobileNumberValidate = () => {
    if (this.state.MobileNumber == "") {
      this.setState({
        mobileNumber: "field cannot be empty",
      });
    } else {
      this.setState({
        mobileNumber: "",
      });
    }

    if (this.state.mobileNumber.length < 10) {
      this.setState({
        mobileNumber: "mobile number must be 10 digits",
      });
    }
  };

  UserDetailsValidation = () => {
    this.setState({
      err: false,
    });
    // if (
    //   this.state.FirstName == "" ||
    //   this.state.LastName == "" ||
    //   this.state.Email == "" ||
    //   !(this.state.Email.includes(".") && this.state.Email.includes("@")) ||
    //   (this.state.MobileNumber == "" && this.state.mobileNumber.length < 11)
    // ) {
    //   this.setState({
    //     err: true,
    //   });
    //   if (this.state.Age == "") {
    //     alert("Select Age");
    //   }

    
    if (this.state.FirstName == "") {
      this.setState({
        name: "Name cannot be empty",
        err: true
      });
    }

   else if (this.state.LastName == "") {
      this.setState({
        lastName: "Last Name cannot be empty",
        err : true
      });
    }

    else if (this.state.Age == "") {
      alert("please elect Age....");
      this.setState({
        err : true
      })
    }

   else if (
      this.state.Email == ""
    ) {
      this.setState({
        email: "Blank field",
        err: true
      });
    }
    else if(
      !(this.state.Email.includes(".")) || !(this.state.Email.includes("@"))
      ) {
      this.setState({
        email: "wrong mail id",
        err: true
      })
    }

    else if (this.state.MobileNumber == "") {
      this.setState({
        mobileNumber: "field cannot be empty",
        err: true
      });
    }

  else if (this.state.MobileNumber.length < 10) {
      this.setState({
        mobileNumber: "mobile number must be 10 digits",
        err : true
      });
    } else {
      this.setState({
        err : false
      })
    }
  };

  getPostalValidate = () => {
    if (this.state.PostalCode == "") {
      this.setState({
        postalCodeValidate: "field cannot be empty",
      });
    } else {
      this.setState({
        postalCodeValidate: "",
      });
    }
  };

  getStateValidate = () => {
    if (this.state.State == "") {
      this.setState({
        stateValidate: "field cannot be empty",
      });
    } else {
      this.setState({
        stateValidate: "",
      });
    }
  };

  getCityValidate = () => {
    if (this.state.City == "") {
      this.setState({
        cityValidate: "field cannot be empty",
      });
    } else {
      this.setState({
        cityValidate: "",
      });
    }
  };

  getStreetValidate = () => {
    if (this.state.Street == "") {
      this.setState({
        streetValidate: "field cannot be empty",
      });
    } else {
      this.setState({
        streetValidate: "",
      });
    }
  };

  AddressValidation = () => {
    this.setState({
      addressErr: false,
    });
    // if (
    //   this.state.PostalCode == "" ||
    //   this.state.State == "" ||
    //   this.state.City == "" ||
    //   this.state.Street == ""
    // ) {
    //   this.setState({
    //     addressErr: true,
    //   });
    // }
    if (this.state.PostalCode == "") {
      this.setState({
        postalCodeValidate: "field cannot be empty",
        addressErr: true
      });
    }

   else if (this.state.State == "") {
      this.setState({
        stateValidate: "field cannot be empty",
        addressErr: true
      });
    }

    else if (this.state.City == "") {
      this.setState({
        cityValidate: "field cannot be empty",
        addressErr: true
      });
    }

    else if (this.state.Street == "") {
      this.setState({
        streetValidate: "field cannot be empty",
        addressErr: true
      });
    }
    else {
      addressErr: false;
    }
  };*/
  // HANDELING HARDWARE BACK BUTTON CONTROL

  // componentDidMount() {
  //   const fieldlist = ["Name","StageName","Enquiry_Date__c","Enquiry_Type__c","Enquiry_Source__c","Usage_Area__c","Likely_Purchase__c","Prospect_Type__c"
  //   ];

  //   syncUp(false, {}, 'opportunity', {mergeMode: [mobilesync.MERGE_MODE.OVERWRITE], fieldlist}).then(() => {
  //     console.log('syncup done');
  //   });
  // }

  fetchDealerCode = (ownerId) => {
    net.query(
      "SELECT Id, Name, ContactId, AccountId FROM User where Id='" +
        ownerId +
        "'",
      (d) => {
        this.setState({ dealerC: d.records[0].AccountId });
      },
      (e) => {
        console.log(JSON.stringify(e));
      }
    );
  }

  componentDidMount() {
    let SharedPreferences = require("react-native-shared-preferences");
    
    SharedPreferences.getItem("OwnerId", ownerId => {
      this.fetchDealerCode(ownerId);
      this.setState({ ownerId: ownerId });
    });

    SharedPreferences.getItem(
      "OwnerId",
      function(value) {
        net.query(
          "SELECT Id, Name, ContactId, AccountId FROM User where Id='" +
            value +
            "'",
          (d) => {
            this.setState({ dealerC: d.records[0].AccountId });
          },
          (e) => {
            console.log(JSON.stringify(e));
          }
        );
      }.bind(this)
    );

    SharedPreferences.getItem("AccessToken", accessToken => {
      this.setState({ AccessToken: accessToken });
    });

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );

    let enquiryPickListData = enquiryPickList();
    let econtactPickListData = contactPickList();
    let taskData = taskPickList();
    this.setState({
      Prospect_Type__c: enquiryPickListData.Prospect_Type__c,
      Likely_Purchase__c: enquiryPickListData.Likely_Purchase__c,
      //Enquiry_Source__c: enquiryPickListData.Enquiry_Source__c,
      Enquiry_Type__c: enquiryPickListData.Enquiry_Type__c,
      //Enquiry_Sub_Source__c: enquiryPickListData.Enquiry_Sub_Source__c,
      Occupation__c : econtactPickListData.Occupation__c,
      //Customer_Type__c : enquiryPickListData.Customer_Type__c,
      TaskSubject: taskData.Subject,
      TaskType: taskData.Type,
      TaskStatus: taskData.Status__c,
    });
  }

  componentWillUnmount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate("Home");
    return true;
  }
  // ----------------------------------------------------------

  DropdownSubSource(value) {
    this.setState({
      SubSource: value,
    });
  }

  DropdownLikelyPurchase(value) {
    this.setState({
      LikelyPurchase: value,
    });
  }

  DropdownCustomerType(value){
    this.setState({
      CustomerType: value,
    });
  }

  DropdownOccupation(value){
    this.setState({
      OccupationType: value,
    });
  }

  DropdownProductName(value) {
    this.setState({
      ProductName: value,
    });
  }
  DropdownVariant(value) {
    this.setState({
      Variant: value,
    });
  }
  DropdownColor(value) {
    this.setState({
      Color: value,
    });
  }
  DropdownFueltype(value) {
    this.setState({
      FuelType: value,
    });
  }
  DropdownSeatCapacity(value) {
    this.setState({
      SeatCapacity: value,
    });
  }
  DropdownTransmissionType(value) {
    this.setState({
      TransmissionType: value,
    });
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  DropdownEnquiryType(value) {
    this.setState({ EnquiryType: value});
    if(this.state.enquirySourceList == undefined) {
      this.fetchEquirySourceList(this.state.ownerId, this.state.accessToken, value);

    } else {
      if (value) {
        this.setState({
          
          EnquirySource: '',
          Enquiry_Source__c: this.state.enquirySourceList[value] ? this.state.enquirySourceList[value] : []
        });
        
      }
    }
  }

  fetchEquirySourceList = (ownerId, accessToken, value) => {
    let usable_access_token = accessToken;
    let salesConsultantIds = [];
    salesConsultantIds.push(ownerId);

    this.setState({
      isEnquirySourceLoading: true,
    });

    net.sendRequest(
      "/services/apexrest/getDependentPicklistValues",
      "getDependentPicklistValues",
      (res) => {
        let responseData = JSON.parse(res);
        console.log(responseData);
        this.setState({
          isEnquirySourceLoading: false,
          enquirySourceList: responseData,
          Enquiry_Source__c: value ? responseData[value] : [] //NAVAL OPEN IT WHEN THE TEAM COMPLETES ITS JOB
        });
      },
      (err) => {
        console.log("error - " + JSON.stringify(err));
      },
      "POST",
      { dependentString: "Opportunity.Enquiry_Source__c" },
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + usable_access_token,
      },
      null,
      null,
      false
    );
  }

  fetchEquirySubSourceList = (ownerId, accessToken, value) => {
    let usable_access_token = accessToken;
    let salesConsultantIds = [];
    salesConsultantIds.push(ownerId);

    this.setState({
      isEnquirySourceLoading: true,
    });

    net.sendRequest(
      "/services/apexrest/getDependentPicklistValues",
      "getDependentPicklistValues",
      (res) => {
        let responseData = JSON.parse(res);
        console.log(responseData);
        this.setState({
          isEnquirySourceLoading: false,
          enquirySubSourceList: responseData,
          Enquiry_Sub_Source__c: value ? responseData[value] : [] //NAVAL OPEN IT WHEN THE TEAM COMPLETES ITS JOB
        });
      },
      (err) => {
        console.log("error - " + JSON.stringify(err));
      },
      "POST",
      { dependentString: "Opportunity.Enquiry_Sub_Source__c" },
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + usable_access_token,
      },
      null,
      null,
      false
    );
  }

  EnquiryTab3Validate = () => {
    this.setState({
      enquiryTab3Err: false,
    });
    const {
      EnquiryType,
      EnquirySource,
      SubSource,
      LikelyPurchase,
    } = this.state;

    if (
      EnquiryType == "" ||
      EnquirySource == "" ||
      SubSource == "" ||
      LikelyPurchase == ""
    ) {
      this.setState({
        enquiryTab3Err: true,
      });
      alert("You have missed something");
    } else {
      this.setState({
        enquiryTab3Err: false,
      });
    }
  };
  
  DropdownProspectType(value) {
    //  HACK
    let label = "";
    switch (value) {
      case "IND":
        label = "Personal";
        break;
      case "CRP":
        label = "Commercial";
        break;
    }
    //  HACK
    this.setState({
      ProspectType: value,
      ProspectTypeLabel: label,
      check: true,
    });

    if(value == "") {
      this.setState({
        check: false
      })
    }

    if (value) {
      net.query(
        "SELECT Name FROM Product2 WHERE Segment_Code__c= '" +
        //value +
        label + //  HACK
          "' GROUP BY Name",
        (d) => {
          this.setState({
            prospectTypeData: d.records,
            addListOfModel: {},
            primaryInterestModel: "",
            check: false,
          });
        },
        (e) => {
          console.log(JSON.stringify(e));
        }
      );
    } else {
      this.setState({
        prospectTypeData: [],
        addListOfModel: {},
        primaryInterestModel: "",
      });
    }
  }

  DropdownEnquirySource(value) {
    this.setState({ EnquirySource: value});
    if(this.state.enquirySubSourceList == undefined) {
      this.fetchEquirySubSourceList(this.state.ownerId, this.state.accessToken, value);
    } else {
      if (value) {
        this.setState({
          SubSource: '',
          Enquiry_Sub_Source__c: this.state.enquirySubSourceList[value] ? this.state.enquirySubSourceList[value] : []
        });
      }
    }
  }

  DropdownAge(value) {
    this.setState({
      Age: value,
    });
  }

  DropdownNextFollowUpActions(value) {
    this.setState({
      NextFollowUpActions: value,
    });
  }

  DropdownChooseModel(value) {
    this.setState({
      chooseModel: value,
    });
  }

  DropdownInterest(value) {
    this.setState({
      interest: value,
    });
  }

  DropdownSubject(value) {
    this.setState({
      subject: value,
    });
  }

  DropdownModel(value) {
    this.setState({
      model: value,
    });
  }

  DropdownType(value) {
    this.setState({
      type: value,
    });
  }

  DropdownStatus(value) {
    this.setState({
      status: value,
    });
  }

  DropdownRemark(value) {
    this.setState({
      Remark: value,
    });
  }

  DropdownRemarkType(value) {
    this.setState({
      RemarkType: value,
    });
  }

  DropdownRemarkSubType(value) {
    this.setState({
      RemarkSubType: value,
    });
  }

  DropdownTime(value) {
    this.setState({ selectedTimeSlot: value });
  }

  openModal = () => {
    this.setState({ showAddVehicleModal: true });
  };

  addModel = () => {
    let model = this.state.chooseModel;
    let qty = this.state.quantity;
    let interest = this.state.interest;
    let primaryInterestModel = this.state.primaryInterestModel;

    if (!model) {
      Alert.alert("", "Please select a model");
      return;
    }

    if (qty <= 0) {
      Alert.alert("", "Quantity should be greater than 0");
      return;
    }

    let addListOfModel = this.state.addListOfModel;
    addListOfModel[model] = Product(model, qty, interest);

    console.log(interest);
    if (interest === "Primary_Interest") {
      primaryInterestModel = model;
    }
    //console.log(primaryInterestModel);

    this.setState({
      addListOfModel: addListOfModel,
      primaryInterestModel: primaryInterestModel,
      chooseModel: "",
      quantity: "1",
      interest: "",
      showAddVehicleModal: false,
    });
  };

  removeTextInput = (model) => {
    let addListOfModel = this.state.addListOfModel;
    let primaryInterestModel = this.state.primaryInterestModel;

    if (primaryInterestModel == model) primaryInterestModel = "";

    delete addListOfModel[model];
    this.setState({
      addListOfModel: addListOfModel,
      primaryInterestModel: primaryInterestModel,
    });
  };

  // .....VALIDATION PART.....

  onEnquirySubmit = () => {

      this.setState({
        enquiryTab3Err: false,
      });
      const {
        subject,
        model,
        type,
        status,
        chosenDate
      } = this.state;
  
      if (
        // model == "" ||
        type == "" ||
        chosenDate === ""
      ) {
        this.setState({
          enquiryLastTabErr: true,
        });
        alert("You have missed something");
      } else {
        this.setState({
          enquiryLastTabErr: false,
          showLoading: true 
        });

        console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        console.log(new Date());
        console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
        // this.setState({ showLoading: true });
        this.createSFAccount();
      }


    // if (this.state.FirstName == "") {
    //   alert("First name is blank goto step 1");
    // } else if (this.state.LastName == "") {
    //   alert("Last name is black goto step 1");
    // } else if (!this.state.Age) {
    //   alert("age must be between 20 - 100 goto step 1");
    // }
    // else if (this.state.MobileNumber.length < 10) {
    //   alert("Mobile number must be 10 digits goto step 1");
    // } else if (this.state.Enquirytype == "") {
    //   alert("Enquiry type is blank goto step 2");
    // } else if (this.state.EnquirySource == "") {
    //   alert("Enquiry source is blank goto step 2");
    // } else if (this.state.LikelyPurchase == "") {
    //   alert("Blank field likely purchase goto step 2");
    // } else {
    //   //this.props.navigation.navigate("Home");
    //   createSFEnquiry();
    // }
    //this.createSFEnquiry();
    //  Add to soup here

    // console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    // console.log(new Date());
    // console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");

    //this.createSFTask();
    // this.setState({ showLoading: true });
    // this.createSFAccount();
  };

  createSFAccount = () => {
    let account_details = {
      Name: this.state.LastName + " HouseHold",
      RecordTypeId: "0125D000000PIZYQA4",
      BillingPostalCode: this.state.PostalCode,
      BillingState: this.state.State,
      BillingCity: this.state.City,
      BillingStreet: this.state.Street,

      attributes: { type: Account.salesForceName },

      __local__: true,
      __locally_created__: true,
      __locally_updated__: false,
      __locally_deleted__: false,
    };

    //  Upsert into soup
    SoupHelper.addSingleRecordToSoupAndSync(
      Account,
      account_details,
      (response) => {
        if (response.error) {
          console.log("Error in adding ACCOUNT");
        } else {
          console.log("Success in adding ACCOUNT");
          SoupHelper.getSoupRecordBySoupEntryId(
            Account,
            response.data._soupEntryId,
            (record) => {
              if (record.error) {
                console.log(
                  "Error while obtaining the Record from soup at addSingleRecordToSoupAndSync"
                );
              } else {
                this.createSFContact(record.data.Id);
              }
            }
          );
        }
      }
    );
  };

  createSFContact = (AccountId) => {
    console.log("AccountId = " + AccountId);
    if (AccountId) {
      let contact_details = {
        Salutation: this.state.Salutation,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Age__c: this.state.Age,
        Email: this.state.Email,
        MobilePhone: this.state.MobileNumber,
        MailingPostalCode: this.state.PostalCode,
        MailingState: this.state.State,
        MailingCity: this.state.City,
        MailingStreet: this.state.Street,
        AccountId: AccountId,

        attributes: { type: Contact.salesForceName },

        __local__: true,
        __locally_created__: true,
        __locally_updated__: false,
        __locally_deleted__: false,
      };

      //  Upsert into soup
      SoupHelper.addSingleRecordToSoupAndSync(
        Contact,
        contact_details,
        (response) => {
          if (response.error) {
            console.log("Error in adding CONTACT");
          } else {
            console.log("Success in adding CONTACT");
            SoupHelper.getSoupRecordBySoupEntryId(
              Contact,
              response.data._soupEntryId,
              (record) => {
                console.log("Upsynced record of contact = " + record);
                if (record.error) {
                  console.log(
                    "Error while obtaining the Record from soup at addSingleRecordToSoupAndSync"
                  );
                } else {
                  this.createSFEnquiry(AccountId, record.data.Id);
                }
              }
            );
          }
        }
      );
    } else {
      alert("AccountId is received NULL");
      this.setState({ showLoading: false });
    }
  };

  createSFEnquiry = (AccountId, ContactId) => {
    console.log(
      "creating opportunity for AccountId=  " +
        AccountId +
        ", ContactId" +
        ContactId
    );
    if (AccountId && ContactId) {
      let enqiry_details = {
        Name: this.state.FirstName + " " + this.state.LastName,
        AccountId: AccountId,
        Dealer__c: this.state.dealerC,
        StageName: "Enquiry",
        Contact__c: ContactId,
        Enquiry_Type__c: this.state.EnquiryType,
        Enquiry_Source__c: this.state.EnquirySource,
        Enquiry_Sub_Source__c: this.state.SubSource,
        Likely_Purchase__c: this.state.LikelyPurchase,
        Prospect_Type__c: this.state.ProspectType,
        Customer_type__c :this.state.CustomerType,

        CloseDate: "2020-04-21",

        attributes: { type: Opportunity.salesForceName },

        __local__: true,
        __locally_created__: true,
        __locally_updated__: false,
        __locally_deleted__: false,
      };

      //  Upsert into soup
      SoupHelper.addSingleRecordToSoupAndSync(
        Opportunity,
        enqiry_details,
        (response) => {
          if (response.error) {
            console.log("Error in adding OPPORTUNITY");
          } else {
            console.log("Success in adding OPPORTUNITY");
            SoupHelper.getSoupRecordBySoupEntryId(
              Opportunity,
              response.data._soupEntryId,
              (record) => {
                console.log("Upsynced record of Opportunity = " + record);
                if (record.error) {
                  console.log(
                    "Error while obtaining the Record from soup at addSingleRecordToSoupAndSync"
                  );
                } else {
                  this.createSFEnquiryModel(record.data.Id);
                }
              }
            );
          }
        }
      );
    } else {
      alert("AccountId || ContactId is received NULL");
      this.setState({ showLoading: false });
    }
  };

  createSFEnquiryModel = (EnquiryId) => {
    console.log("creating EnquiryModel for EnquiryId=  " + EnquiryId);

    if (EnquiryId) {
      let enquiryModelsToAdd = Object.keys(this.state.addListOfModel).map(
        (model) => {
          return {
            Product_Family_Text__c: this.state.addListOfModel[model].model,
            Interest_Category__c:
              this.state.primaryInterestModel ==
              this.state.addListOfModel[model].model
                ? "Primary_Interest"
                : "Other_Interest",
            //Interest_Category__c: this.state.addListOfModel[model].interest,
            Quantity__c: this.state.addListOfModel[model].qty,
            Enquiry__c: EnquiryId,

            attributes: { type: EnquiryModel.salesForceName },

            __local__: true,
            __locally_created__: true,
            __locally_updated__: false,
            __locally_deleted__: false,
          };
        }
      );

      console.log("DELETE 1 = " + JSON.stringify(enquiryModelsToAdd));

      //  Upsert into soup
      SoupHelper.addMultipleRecordsToSoupAndSync(
        EnquiryModel,
        enquiryModelsToAdd,
        (response) => {
          if (response.error) {
            console.log("Error in adding ENQUIRYMODEL");
          } else {
            console.log("Success in adding ENQUIRYMODEL");
            this.createSFTask(EnquiryId);
          }
        }
      );
    } else {
      alert("EnquiryId is received NULL for Model Cretion");
      this.setState({ showLoading: false });
    }
  };

  createSFTask = (EnquiryId) => {
    if (EnquiryId) {
      let selectedTimeSlot = this.state.selectedTimeSlot.split(":");
      let chosenDate = new Date(this.state.chosenDate);
      chosenDate.setHours(selectedTimeSlot[0]);
      chosenDate.setMinutes(selectedTimeSlot[1]);

      let followupTask = {
        Subject: this.state.subject,
        Activity_Type__c: this.state.type,
        Status__c: this.state.status,
        Product_Family__c: this.state.model,

        WhatId: EnquiryId,

        //Call_End_Time__c: date.toISOString(),
        Call_Start_Time__c: chosenDate.toISOString(),
        //Actual_CallTime__c: '300',

        attributes: { type: Task.salesForceName },

        __local__: true,
        __locally_created__: true,
        __locally_updated__: false,
        __locally_deleted__: false,
      };

      //  Upsert into soup
      SoupHelper.addSingleRecordToSoupAndSync(
        Task,
        followupTask,
        (response) => {
          console.log(response);
          if (response.error) {
            console.log("Error in adding TASK");
          } else {
            console.log("Success in adding TASK");
            this.props.navigation.navigate("Customer360", {
              enquiryId: EnquiryId,
            });
          }
          console.log(
            "=-=-=-=-=-=-=-=-=-= END -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
          );
          console.log(new Date());
          console.log(
            "=-=-=-=-=-=-=-=-=-= END -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
          );
        }
      );
    } else {
      alert("AccountId is received NULL in TASK creation");
      this.setState({ showLoading: false });
    }
  };

  getNextTimeSlot = () => {
    let currentDate = new Date();
    let hrs = currentDate.getHours();
    let mins = currentDate.getMinutes();

    if (mins < 15) {
      mins = 15;
    } else if (mins < 30) {
      mins = 30;
    } else if (mins < 45) {
      mins = 45;
    } else {
      mins = 0;
    }

    if (mins == 0) {
      if (hrs == 23) hrs = 0;
      else hrs++;
    }

    return "" + hrs + ":" + mins;
  };

  render() {
    if (this.state.showLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#E31837" size="large" animating />
          <Text style={{ padding: 60, textAlign: "center" }}>
            Please wait while the enquiry is getting created
          </Text>
        </View>
      );
    }

    const { checked } = this.state;
    //const productData = enquiryProduct2PickListHelper();
    // console.log("Enquiry Json Feilds : " + JSON.stringify(productData));
    //console.log("okay===================================" + JSON.stringify(this.state.prospectTypeData));

    //let nextTimeSlot = this.getNextTimeSlot();
    let modelKeys = Object.keys(this.state.addListOfModel);
    return (
      <View style={styles.EnquiryOverallView}>
        <Header
          style={{ backgroundColor: "#E31837" }}
          androidStatusBarColor="#A31837"
        >
          <Left>
            <Button
              transparent
              style={{ backgroundColor: "#E31837" }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="md-arrow-back" style={{ color: "white" }} />
            </Button>
          </Left>
          <Body>
            <Title
              style={{
                color: "white",
                fontFamily: "barlow",
                fontWeight: "bold",
              }}
            >
              Enquiry
            </Title>
          </Body>
          <Right />
        </Header>
        <ProgressSteps
          //activeStep='4'
          disabledStepNumColor="black"
          style={styles.ProgressSteps}
        >
          <ProgressStep
            label="Personal"
            onNext={this.validateUserStep}
            errors={this.state.userStepHasError}
          >
            {/* <Card style={{ alignItems: 'center', marginRight: 10, marginLeft: 10, shadowColor: '#cccccc', shadowRadius: 10 }}> */}
            <View>
              <View
                style={{
                  borderWidth: 1,
                  margin: "5%",
                  borderColor: "#00000000",
                  borderRadius: 10,
                  elevation: 1,
                  backgroundColor: "#E3DFCE",
                }}
              >
                <View style={{ border: 20, margin: 20 }}>
                  <Row style={{ alignItems: "center"}}>
                    
                    <Chip style={styles.chipInput} selected={this.state.salutation} onPress={() => this.setState({  })}>Mr.</Chip>

                    <Chip style={styles.chipInput}  onPress={() => this.setState({  })}>Mrs.</Chip>

                    <Chip style={styles.chipInput}  onPress={() => this.setState({  })}>Ms.</Chip>

                    <Chip style={styles.chipInput}  onPress={() => this.setState({  })}>Dr.</Chip>
                    
                  </Row>
                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="First Name"
                    value={this.state.FirstName}
                    onChangeText={(FirstName) => this.setState({ FirstName })}
                    mode="outlined"
                    returnKeyType="next"
                    ref={this.GoToFirstName}
                    onSubmitEditing={() => this.GoToLastName.current.focus()}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent",
                      },
                    }}
                    onBlur={() => {
                      //this.getNameValidate();
                    }}
                  />
                  {this.state.FirstName == "" ? (
                    <Text style={{ color: "red" }}>{this.state.name}</Text>
                  ) : null}
                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Last Name"
                    value={this.state.LastName}
                    onChangeText={(LastName) => this.setState({ LastName })}
                    mode="outlined"
                    returnKeyType="next"
                    ref={this.GoToLastName}
                    onSubmitEditing={() => this.GoToEmail.current.focus()}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent",
                      },
                    }}
                    onBlur={() => {
                      //this.getLastNameValidate();
                    }}
                  />
                  {this.state.LastName == "" ? (
                    <Text style={{ color: "red" }}>{this.state.lastName}</Text>
                  ) : null}

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Email"
                    value={this.state.Email}
                    onChangeText={(Email) => this.setState({ Email })}
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="email-address"
                    ref={this.GoToEmail}
                    blurOnSubmit={false}
                    onSubmitEditing={() =>
                      this.GoToMobileNumber.current.focus()
                    }
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent",
                      },
                    }}
                    onBlur={() => {
                      //this.getEmailValidate();
                    }}
                  />
                  {this.state.Email == "" ? (
                    <Text style={{ color: "red" }}>{this.state.email}</Text>
                  ) : null}

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Mobile Number"
                    value={this.state.MobileNumber}
                    onChangeText={(MobileNumber) =>
                      this.setState({ MobileNumber })
                    }
                    mode="outlined"
                    keyboardType="number-pad"
                    maxLength={10}
                    returnKeyType="next"
                    ref={this.GoToMobileNumber}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent",
                      },
                    }}
                    onBlur={() => {
                      //this.getMobileNumberValidate();
                    }}
                  />
                  {this.state.MobileNumber == "" ? (
                    <Text style={{ color: "red" }}>
                      {this.state.mobileNumber}
                    </Text>
                  ) : null}

                  {/* <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Referral Mobile Number"
                    value={this.state.ReferralMobileNumber}
                    onChangeText={ReferralMobileNumber =>
                      this.setState({ ReferralMobileNumber })
                    }
                    mode="outlined"
                    keyboardType="number-pad"
                    maxLength={10}
                    ref={this.GoToReferralMobileNumber}
                  /> */}
                </View>
              </View>
            </View>
            {/* </Card> */}
          </ProgressStep>
          
          <ProgressStep
            label="QE Information"
            onNext={this.validateEnquiryStep}
            errors={this.state.enquiryStepHasError}
          >
            <View style={styles.EnquiryProgressStepForUser}>
              <View
                style={{
                  borderWidth: 1,
                  margin: "5%",
                  borderColor: "#00000000",
                  borderRadius: 10,
                  elevation: 1,
                  backgroundColor: "#E3DFCE",
                }}
              >
                <View style={{ border: 20, margin: 20 }}>

                <Text style={styles.dropDownTextLabel}>Segment</Text>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  selectedValue={this.state.ProspectType}
                  onValueChange={this.DropdownProspectType.bind(this)}
                >
                  {this.state.Prospect_Type__c.map((ProspectType) => {
                    return (
                      <Picker.Item
                        label={ProspectType.label}
                        value={ProspectType.value}
                        key={ProspectType.value}
                      />
                    );
                  })}
                </Picker>
                
                  <Text style={styles.dropDownTextLabel}>Enquiry Type</Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.EnquiryType}
                    onValueChange={this.DropdownEnquiryType.bind(this)}
                  >
                    <Picker.Item label="-None-" value="" />
                    {this.state.Enquiry_Type__c.map((EnquiryType) => {
                      return (
                        <Picker.Item
                          label={EnquiryType.label}
                          value={EnquiryType.value}
                          key={EnquiryType.value}
                        />
                      );
                    })}
                  </Picker>

                  <Text style={styles.dropDownTextLabel}>Enquiry Source</Text>
                  {
                    this.state.isEnquirySourceLoading == true ? 
                    (
                      <ActivityIndicator
                        size="small"
                        color="#E31837"
                        animating
                      />
                    ) : 
                    (
                      <Picker
                      enabled={this.state.Enquiry_Source__c.length > 0}
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.EnquirySource}
                      onValueChange={this.DropdownEnquirySource.bind(this)}
                    >
                      <Picker.Item label="-None-" />
                      {this.state.Enquiry_Source__c.map((EnquirySource) => {
                        return (
                          <Picker.Item
                            label={EnquirySource.key}
                            value={EnquirySource.value}
                            key={EnquirySource.value}
                          />
                        );
                      })}
                    </Picker>
                    )
                  }

                  <Text style={styles.dropDownTextLabel}>Enquiry Sub Source</Text>
                  <Picker
                  enabled={this.state.Enquiry_Sub_Source__c.length > 0}
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.SubSource}
                    onValueChange={this.DropdownSubSource.bind(this)}
                  >
                    <Picker.Item label="-None-" />
                    {this.state.Enquiry_Sub_Source__c.map((SubSource) => {
                      return (
                        <Picker.Item
                          label={SubSource.key}
                          value={SubSource.value}
                          key={SubSource.value}
                        />
                      );
                    })}
                  </Picker>

                  <Text style={styles.dropDownTextLabel}>Likely Purchase</Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.LikelyPurchase}
                    onValueChange={this.DropdownLikelyPurchase.bind(this)}
                  >
                    <Picker.Item label="-None-" value="" />
                    {this.state.Likely_Purchase__c.map((LikelyPurchase) => {
                      return (
                        <Picker.Item
                          label={LikelyPurchase.label}
                          value={LikelyPurchase.value}
                          key={LikelyPurchase.value}
                        />
                      );
                    })}
                  </Picker>

                  {/* <Text style={styles.dropDownTextLabel}>
                    Next FollowUp Actions
                  </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.NextFollowUpActions}
                    onValueChange={this.DropdownNextFollowUpActions.bind(this)}
                  >
                    <Picker.Item label="Next FollowUp Actions" />
                  </Picker> */}
                </View>
              </View>
            </View>
          </ProgressStep>

          <ProgressStep label="Product" 
            onNext={this.validateProductStep} 
            errors={this.state.productStepHasError}>
            <View
              style={{
                borderWidth: 1,
                margin: "5%",
                borderColor: "#00000000",
                borderRadius: 10,
                elevation: 1,
                backgroundColor: "#E3DFCE",
              }}
            >
              <View style={{ border: 20, margin: 20 }}>
                

                {modelKeys.length > 0 && (
                  <Row
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ flex: 2, fontWeight: "bold" }}>Model</Text>
                    <Text style={{ flex: 1, fontWeight: "bold" }}>
                      Quantity
                    </Text>
                    <Text style={{ flex: 1, fontWeight: "bold" }} />
                  </Row>
                )}
                {modelKeys.map((key) => {
                  return (
                    <Row
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ flex: 2 }}>
                        {(this.state.addListOfModel[key].model ==
                        this.state.primaryInterestModel
                          ? "* "
                          : "") + this.state.addListOfModel[key].model}
                      </Text>
                      <Text style={{ flex: 1 }} alignSelf="flex-end">
                        {this.state.addListOfModel[key].qty}
                      </Text>
                      <Icon
                        style={{ flex: 1 }}
                        name="close"
                        onPress={() => {
                          this.removeTextInput(
                            this.state.addListOfModel[key].model
                          );
                        }}
                        style={{ color: "#E31837" }}
                      />
                    </Row>
                  );
                })}
                {this.state.prospectTypeData.length > 0 && (this.state.check == false ) ?
                  <View style={{ flexDirection: "row" }}>
                    <Button
                    light
                    style={{
                      marginTop: 5,
                      alignSelf: "center",
                      alignContent: "center",
                    }}
                    onPress={() => this.openModal()}
                  >
                    <Icon name="add" 
                    style={{
                      color : 'red',
                      
                    }}
                    />
                    
                  </Button>
                  <Text
                  style={{
                    textAlign : 'left',
                  }}>
                    Add Product
                  </Text>
                  </View>
                : null}
              </View>
            </View>
          </ProgressStep>
          
          <ProgressStep
            label="Address"
            onNext={this.validateAddressStep}
            errors={this.state.addressStepHasError}
          >
            <View style={styles.EnquiryProgressStepForUser}>
              <View
                style={{
                  borderWidth: 1,
                  margin: "5%",
                  borderColor: "#00000000",
                  borderRadius: 10,
                  elevation: 1,
                  backgroundColor: "#E3DFCE",
                }}
              >
                <View style={{ border: 20, margin: 20 }}>
                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Postal Code"
                    value={this.state.PostalCode}
                    onChangeText={(PostalCode) => this.setState({ PostalCode })}
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="number-pad"
                    maxLength={6}
                    ref={this.PostalCode}
                    onSubmitEditing={() => this.State.current.focus()}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent",
                      },
                    }}
                    onBlur={() => {
                      //this.getPostalValidate();
                    }}
                  />
                  {this.state.PostalCode == "" ? (
                    <Text style={{ color: "red" }}>
                      {this.state.postalCodeValidate}
                    </Text>
                  ) : null}

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="State"
                    value={this.state.State}
                    onChangeText={(State) => this.setState({ State })}
                    mode="outlined"
                    returnKeyType="next"
                    ref={this.State}
                    onSubmitEditing={() => this.City.current.focus()}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent",
                      },
                    }}
                    onBlur={() => {
                      //this.getStateValidate();
                    }}
                  />
                  {this.state.State == "" ? (
                    <Text style={{ color: "red" }}>
                      {this.state.stateValidate}
                    </Text>
                  ) : null}

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="City"
                    value={this.state.City}
                    onChangeText={(City) => this.setState({ City })}
                    mode="outlined"
                    returnKeyType="next"
                    ref={this.City}
                    onSubmitEditing={() => this.GoToStreet.current.focus()}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent",
                      },
                    }}
                    onBlur={() => {
                      //this.getCityValidate();
                    }}
                  />
                  {this.state.City == "" ? (
                    <Text style={{ color: "red" }}>
                      {this.state.cityValidate}
                    </Text>
                  ) : null}

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Street"
                    value={this.state.Street}
                    onChangeText={(Street) => this.setState({ Street })}
                    ref={this.GoToStreet}
                    mode="outlined"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent",
                      },
                    }}
                    onBlur={() => {
                      //this.getStreetValidate();
                    }}
                  />
                  {this.state.Street == "" ? (
                    <Text style={{ color: "red" }}>
                      {this.state.streetValidate}
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
          </ProgressStep>
          <ProgressStep label="Followup"
           onSubmit={this.validateFollowUpStep}>
            <ScrollView>
              <View
                style={{
                  borderWidth: 1,
                  margin: "5%",
                  borderColor: "#00000000",
                  borderRadius: 10,
                  elevation: 1,
                  backgroundColor: "#E3DFCE",
                }}
              >
                <View style={{ border: 20, margin: 20 }}>
                <Item picker style={{ flexDirection: "row" }}>
                    <Label style={{ flex: 1 }}>Follow Up Type</Label>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.type}
                      onValueChange={this.DropdownType.bind(this)}
                    >
                      <Picker.Item label="-None-" />
                      {this.state.TaskType.map((type) => {
                        return (
                          <Picker.Item
                            label={type.label}
                            value={type.value}
                            key={type.value}
                          />
                        );
                      })}
                    </Picker>
                  </Item>

                  <Item picker style={{ flexDirection: "row" }}>
                    <Label style={{ flex: 1 }}>Model</Label>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.model}
                      onValueChange={this.DropdownModel.bind(this)}
                    >
                      <Picker.Item label="-None-" />
                      {modelKeys.map((model) => {
                        return (
                          <Picker.Item
                            label={model}
                            value={model}
                            key={model}
                          />
                        );
                      })}
                    </Picker>
                  </Item>

                  <Label style={{ color: "black" }}>Follow Up Date Time</Label>
                  <Row
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Label style={{ color: "black" }}>Date</Label>
                    <DatePicker
                      defaultDate={new Date()}
                      minimumDate={new Date()}
                      maximumDate={
                        new Date(
                          this.state.currentDate.getTime() +
                            15 * 24 * 60 * 60 * 1000
                        )
                      }
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText={
                        <Icon style={{ color: "#E31837" }} name="calendar" />
                      } //"Order Date"
                      textStyle={{ color: "black" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={this.setDate}
                      disabled={false}
                    />
                  </Row>
                  <Row
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Label style={{ color: "black" }}>Time</Label>
                    <Picker
                    mode="dropdown"
                    placeholderStyle={{ color: "#2874F0" }}
                    note={false}
                    selectedValue={this.state.selectedTimeSlot} //? this.state.selectedTimeSlot : nextTimeSlot}
                    onValueChange={this.DropdownTime.bind(this)}
                  >
                    <Picker.Item label="12:00 AM" value="0:0" key="0:0" />
                    <Picker.Item label="12:15 AM" value="0:15" key="0:15" />
                    <Picker.Item label="12:30 AM" value="0:30" key="0:30" />
                    <Picker.Item label="12:45 AM" value="0:45" key="0:45" />
                    <Picker.Item label="1:00 AM" value="1:0" key="1:0" />
                    <Picker.Item label="1:15 AM" value="1:15" key="1:15" />
                    <Picker.Item label="1:30 AM" value="1:30" key="1:30" />
                    <Picker.Item label="1:45 AM" value="1:45" key="1:45" />
                    <Picker.Item label="2:00 AM" value="2:0" key="2:0" />
                    <Picker.Item label="2:15 AM" value="2:15" key="2:15" />
                    <Picker.Item label="2:30 AM" value="2:30" key="2:30" />
                    <Picker.Item label="2:45 AM" value="2:45" key="2:45" />
                    <Picker.Item label="3:00 AM" value="3:0" key="3:0" />
                    <Picker.Item label="3:15 AM" value="3:15" key="3:15" />
                    <Picker.Item label="3:30 AM" value="3:30" key="3:30" />
                    <Picker.Item label="3:45 AM" value="3:45" key="3:45" />
                    <Picker.Item label="4:00 AM" value="4:0" key="4:0" />
                    <Picker.Item label="4:15 AM" value="4:15" key="4:15" />
                    <Picker.Item label="4:30 AM" value="4:30" key="4:30" />
                    <Picker.Item label="4:45 AM" value="4:45" key="4:45" />
                    <Picker.Item label="5:00 AM" value="5:0" key="5:0" />
                    <Picker.Item label="5:15 AM" value="5:15" key="5:15" />
                    <Picker.Item label="5:30 AM" value="5:30" key="5:30" />
                    <Picker.Item label="5:45 AM" value="5:45" key="5:45" />
                    <Picker.Item label="6:00 AM" value="6:0" key="6:0" />
                    <Picker.Item label="6:15 AM" value="6:15" key="6:15" />
                    <Picker.Item label="6:30 AM" value="6:30" key="6:30" />
                    <Picker.Item label="6:45 AM" value="6:45" key="6:45" />
                    <Picker.Item label="7:00 AM" value="7:0" key="7:0" />
                    <Picker.Item label="7:15 AM" value="7:15" key="7:15" />
                    <Picker.Item label="7:30 AM" value="7:30" key="7:30" />
                    <Picker.Item label="7:45 AM" value="7:45" key="7:45" />
                    <Picker.Item label="8:00 AM" value="8:0" key="8:0" />
                    <Picker.Item label="8:15 AM" value="8:15" key="8:15" />
                    <Picker.Item label="8:30 AM" value="8:30" key="8:30" />
                    <Picker.Item label="8:45 AM" value="8:45" key="8:45" />
                    <Picker.Item label="9:00 AM" value="9:0" key="9:0" />
                    <Picker.Item label="9:15 AM" value="9:15" key="9:15" />
                    <Picker.Item label="9:30 AM" value="9:30" key="9:30" />
                    <Picker.Item label="9:45 AM" value="9:45" key="9:45" />
                    <Picker.Item label="10:00 AM" value="10:0" key="10:0" />
                    <Picker.Item label="10:15 AM" value="10:15" key="10:15" />
                    <Picker.Item label="10:30 AM" value="10:30" key="10:30" />
                    <Picker.Item label="10:45 AM" value="10:45" key="10:45" />
                    <Picker.Item label="11:00 AM" value="11:0" key="11:0" />
                    <Picker.Item label="11:15 AM" value="11:15" key="11:15" />
                    <Picker.Item label="11:30 AM" value="11:30" key="11:30" />
                    <Picker.Item label="11:45 AM" value="11:45" key="11:45" />

                    <Picker.Item label="12:00 PM" value="12:0" key="12:0" />
                    <Picker.Item label="12:15 PM" value="12:15" key="12:15" />
                    <Picker.Item label="12:30 PM" value="12:30" key="12:30" />
                    <Picker.Item label="12:45 PM" value="12:45" key="12:45" />
                    <Picker.Item label="1:00 PM" value="13:0" key="13:0" />
                    <Picker.Item label="1:15 PM" value="13:15" key="13:15" />
                    <Picker.Item label="1:30 PM" value="13:30" key="13:30" />
                    <Picker.Item label="1:45 PM" value="13:45" key="13:45" />
                    <Picker.Item label="2:00 PM" value="14:0" key="14:0" />
                    <Picker.Item label="2:15 PM" value="14:15" key="14:15" />
                    <Picker.Item label="2:30 PM" value="14:30" key="14:30" />
                    <Picker.Item label="2:45 PM" value="14:45" key="14:45" />
                    <Picker.Item label="3:00 PM" value="15:0" key="15:0" />
                    <Picker.Item label="3:15 PM" value="15:15" key="15:15" />
                    <Picker.Item label="3:30 PM" value="15:30" key="15:30" />
                    <Picker.Item label="3:45 PM" value="15:45" key="15:45" />
                    <Picker.Item label="4:00 PM" value="16:0" key="16:0" />
                    <Picker.Item label="4:15 PM" value="16:15" key="16:15" />
                    <Picker.Item label="4:30 PM" value="16:30" key="16:30" />
                    <Picker.Item label="4:45 PM" value="16:45" key="16:45" />
                    <Picker.Item label="5:00 PM" value="17:0" key="17:0" />
                    <Picker.Item label="5:15 PM" value="17:15" key="17:15" />
                    <Picker.Item label="5:30 PM" value="17:30" key="17:30" />
                    <Picker.Item label="5:45 PM" value="17:45" key="17:45" />
                    <Picker.Item label="6:00 PM" value="18:0" key="18:0" />
                    <Picker.Item label="6:15 PM" value="18:15" key="18:15" />
                    <Picker.Item label="6:30 PM" value="18:30" key="18:30" />
                    <Picker.Item label="6:45 PM" value="18:45" key="18:45" />
                    <Picker.Item label="7:00 PM" value="19:0" key="19:0" />
                    <Picker.Item label="7:15 PM" value="19:15" key="19:15" />
                    <Picker.Item label="7:30 PM" value="19:30" key="19:30" />
                    <Picker.Item label="7:45 PM" value="19:45" key="19:45" />
                    <Picker.Item label="8:00 PM" value="20:0" key="20:0" />
                    <Picker.Item label="8:15 PM" value="20:15" key="20:15" />
                    <Picker.Item label="8:30 PM" value="20:30" key="20:30" />
                    <Picker.Item label="8:45 PM" value="20:45" key="20:45" />
                    <Picker.Item label="9:00 PM" value="21:0" key="21:0" />
                    <Picker.Item label="9:15 PM" value="21:15" key="21:15" />
                    <Picker.Item label="9:30 PM" value="21:30" key="21:30" />
                    <Picker.Item label="9:45 PM" value="21:45" key="21:45" />
                    <Picker.Item label="10:00 PM" value="22:0" key="22:0" />
                    <Picker.Item label="10:15 PM" value="22:15" key="22:15" />
                    <Picker.Item label="10:30 PM" value="22:30" key="22:30" />
                    <Picker.Item label="10:45 PM" value="22:45" key="22:45" />
                    <Picker.Item label="11:00 PM" value="23:0" key="23:0" />
                    <Picker.Item label="11:15 PM" value="23:15" key="23:15" />
                    <Picker.Item label="11:30 PM" value="23:30" key="23:30" />
                    <Picker.Item label="11:45 PM" value="23:45" key="23:45" />
                  </Picker>
                  </Row>

                  
                </View>
              </View>
            </ScrollView>
          </ProgressStep>
        </ProgressSteps>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.showAddVehicleModal}
          onRequestClose={() => {
            //console.log("Modal has been closed.");
          }}
        >
          {/*All views of Modal*/}
          <View style={styles.showAddVehicleModal}>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <Button
                transparent
                style={{ flexDirection: "row-reverse" }}
                onPress={() => {
                  this.setState({
                    showAddVehicleModal: !this.state.showAddVehicleModal,
                  });
                }}
              >
                <Icon style={{ color: "black" }} name="close" />
              </Button>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Add Products
              </Text>
              <ScrollView>
                <View style={{ flexDirection: "column", marginVertical: "5%" }}>
                  <Text style={styles.dropDownTextLabel}>
                  Model Group{" "}
                  </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.chooseModel}
                    onValueChange={this.DropdownChooseModel.bind(this)}
                  >
                    {this.state.prospectTypeData.map((model) => {
                      return (
                        <Picker.Item
                          label={model.Name}
                          value={model.Name}
                          key={model.Name}
                        />
                      );
                    })}
                  </Picker>
                  
                  <Text style={styles.dropDownTextLabel}>
                  Interest Category{" "}
                  </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.interest}
                    onValueChange={this.DropdownInterest.bind(this)}
                  >
                    <Picker.Item
                      label="Primary Interest"
                      value="Primary_Interest"
                      key="Primary_Interest"
                    />
                    <Picker.Item
                      label="Other Interest"
                      value="Other_Interest"
                      key="Other_Interest"
                    />
                  </Picker>
                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Quantity"
                    value={this.state.quantity}
                    onChangeText={(quantity) =>
                      this.setState({ quantity: quantity })
                    }
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="numeric"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent",
                      },
                    }}
                  />
                  <Button
                    danger
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      this.addModel();
                    }}
                  >
                    <Text style={{ color: "white", padding: "5%" }}>Add</Text>
                  </Button>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  EnquiryOverallView: {
    flex: 1,
  },
  dropDownTextLabel: {
    color: "gray",
    fontSize: 12,
  },
  inputs: {
    flex: 1,
    alignSelf: "stretch",
  },
  chipInput:{
    margin : 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  showAddVehicleModal: {
    backgroundColor: "lightgrey",
    height: "70%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    margin: "10%",
  },
  text: {
    color: "#3f2949",
  },
  OnErrorTextColor: {
    color: "red",
  },
  textInput: {
    height: 40,
    width: 250,
    borderColor: "lightgrey",
    borderWidth: 0.5,
    margin: 10,
  },
});

function Product(model, qty, interest) {
  return { model: model, qty: qty, interest: interest };
}

export default Enquiry;
