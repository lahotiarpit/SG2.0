import React, { Component } from "react";
import {
  Avatar,
  Card,
  Title,
  Paragraph,
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
  Accordion,
} from "native-base";
import { ProgressSteps, ProgressStep } from "../ProgressSteps/index";
import {
  StyleSheet,
  BackHandler,
  Alert,
  Modal,
  ScrollView,
  TextInput,
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
import enquiryProduct2PickListHelper from "../PicklistHelpers/EnquiryProduct2PickListHelper";
import taskPickList from "../PicklistHelpers/TaskPickListHelper";
import quickEnqsEnquiryTypeAndSourcePickList from "../PicklistHelpers/QuickEnqsEnquiryTypeAndSourcePickList";
import RadioChip  from '../app-shared/RadioChip/index';

import {
  forceUtil,
  mobilesync,
  oauth,
  net,
  smartstore,
} from "react-native-force";
import EnquiryModel from "../soups/EnquiryModel";
import { color } from "react-native-reanimated";

//const upsertSoupEntries = forceUtil.promiser(smartstore.upsertSoupEntries);

const MAX_CALENDAR_DAYS = 30 * 24 * 60 * 60 * 1000;

class QuickEnquiryOnSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalPickListValues: props.route.params.props.segment,
      Segment: "",
      showLoading: false,
      check: false,
      chosenDate: "",
      
      Salutation:"",
      FirstName: "",
      LastName: "",
      Email: "",
      MobilePhone: "",
      
      Enquirytype: "",
      EnquirySource: "",
      EnquirySubSource: "",
      LikelyPurchase: "",
      
      enquiryTab3Err: false,
      UsageArea: "",
      ProductName: "",
      dealerC: "",
      
      
      showAddDetails: false,
      
      err: false,
      NextFollowUpActions: "",
      //isDisabled: false,
      showAddVehicleModal: false,
      addressErr: false,
      prospectTypeData: [],

      //  Add Vehicle
      chooseModel: "",
      Quantity: "1",
      interest: "",
      primaryInterestModel: "",
      Variant: "",
      Color: "",
      FuelType: "",
      SeatCapacity: "",

      //  Followup
      subject: "",
      model: "",
      type: "",
      status: "",
      task: false,
      enquiryLastTabErr: false,
      remark: "",
      Remark: "",
      RemarkType: "",
      RemarkSubType: "",
      selectedTimeSlot: this.getNextTimeSlot(),

      //  Picklist for Enquiry
      Prospect_Type__c: [],
      Likely_Purchase__c: [],
      Enquiry_Source__c: [],
      Enquiry_Sub_Source__c: [],
      Enquiry_Type__c: [],
      Usage_Area__c: [],

      //  Picklist for followup
      TaskSubject: [],
      TaskType: [],
      TaskStatus: [],

      //  placeholder for added list of models
      addListOfModel: {},
      currentDate: new Date(),

      isEnquirySourceLoading: false,
      enquirySourceList: undefined,
      isEnquirySubSourceLoading: false,
      enquirySubSourceList : undefined,

      ownerId: undefined,
      AccessToken: undefined,

      quickEnquirySalutation : [],
      quickEnquiryTypeData: [],
      quickEnquirySourceData: [],
      quickEnquirySubSourceData: [],
      quickEnquiryLikelyPurchase: [],

      QEInformationStepHasError: true,
      //personalDetailsStepHasError: true,
      //productStepHasError: true,
      //   enquiryStepHasError: true,
      followUpStepHasError: true
    };

    // .....FOR FOCUSING TO NEXT TEXTINPUT.....

    this.GotoFirstName = React.createRef();
    this.GoToLastName = React.createRef();
    this.GoToAge = React.createRef();
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

  validateQEInformationStep = () => {
    if (!this.state.EnquiryType) {
      alert("Please select Enquiry Type");
      return;
    } else if (!this.state.EnquirySource) {
      alert("Please select Enquiry Source");
      return;
    } else if (!this.state.EnquirySubSource) {
      alert("Please select Enquiry Sub Source");
      return;
    }
     else {
      this.setState({ QEInformationStepHasError: false });
    }
  };

  validatePersonalDetailsStep = () => {
    var expressionForMailValidation = /^(.+)@(.+)$/;
    var expressionForPhoneNumber = /^\d{10}$/;

    if (!this.state.FirstName) {
      alert("Please provide First Name");
      return;
    } else if (!this.state.LastName) {
      alert("Please provide Last Name");
      return;
    } else if (!this.state.Email) {
      alert("Please provide Email");
      return;
    } else if (!expressionForMailValidation.test(this.state.Email)) {
      alert("Invalid mail id");
      return;
    } else if (!this.state.MobileNumber) {
      alert("Please provide Mobile Number");
      return;
    } else if (this.state.MobileNumber.length < 10) {
      alert("Mobile number must be 10 digits");
      return;
    } else if (!expressionForPhoneNumber.test(this.state.MobileNumber)) {
      alert("Invalid mobile number");
      return;
    } else {
      this.setState({ personalDetailsStepHasError: false });
    }
  };

  validateProductStep = () => {
    this.setState({
      productStepHasError: true,
    });
    if (Object.keys(this.state.addListOfModel).length == 0) {
      alert("Please add atleast one vehicle / product");
      return;
    } else {
      this.setState({ productStepHasError: false });
    }
  };

  validateFollowUpStep = () => {
    alert('In submit');
    if (!this.state.type) {
      alert("Please provide Type");
      return;
    }else if (!this.state.chosenDate) {
      alert("Please provide a Date");
      return;
    }else {
      this.setState({ followUpStepHasError: false });
      this.onEnquirySubmit();
    }
  };

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
  };

  componentDidMount() {
    let SharedPreferences = require("react-native-shared-preferences");

    SharedPreferences.getItem("OwnerId", (ownerId) => {
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

    SharedPreferences.getItem("AccessToken", (accessToken) => {
      this.setState({ AccessToken: accessToken });
    });

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );

    let enquiryPickListData = enquiryPickList();
    let taskData = taskPickList();
    let quickEnquiryTypeAndSource = quickEnqsEnquiryTypeAndSourcePickList();
    this.setState({
      Prospect_Type__c: enquiryPickListData.Prospect_Type__c,
      Likely_Purchase__c: enquiryPickListData.Likely_Purchase__c,
      //Enquiry_Source__c: enquiryPickListData.Enquiry_Source__c,
      Enquiry_Type__c: enquiryPickListData.Enquiry_Type__c,
      Usage_Area__c: enquiryPickListData.Usage_Area__c,

      TaskSubject: taskData.Subject,
      TaskType: taskData.Type,
      TaskStatus: taskData.Status__c,

      quickEnquiryTypeData: quickEnquiryTypeAndSource.Enquiry_Type__c,
      quickEnquirySalutation : quickEnquiryTypeAndSource.Salutation,
      //quickEnquirySourceData: quickEnquiryTypeAndSource.Enquiry_Source__c,
      //quickEnquirySubSourceData: quickEnquiryTypeAndSource.Sub_Source__c,
      quickEnquiryLikelyPurchase: quickEnquiryTypeAndSource.Likely_Purchase__c,
    });
    
                      
    //To getting values for modal in Product (Add Vehicle)
    net.query(
      "SELECT Name FROM Product2 WHERE Segment_Code__c= '" +
      //value +
      this.state.ModalPickListValues + //  HACK
        "' GROUP BY Name",
      (d) => {
        console.log("################" + JSON.stringify(d));
        this.setState({
          prospectTypeData: d.records,
          addListOfModel: {},
          primaryInterestModel: "",
          check: false,
        });
        if (this.state.ModalPickListValues == "Personal") {
          this.setState({ Segment: "IND" });
        }
        if (this.state.ModalPickListValues == "Commercial") {
          this.setState({ Segment: "CRP" });
        }
      },
      (e) => {
        console.log(JSON.stringify(e));
      }
    );
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

  DropdownLikelyPurchase(value) {
    this.setState({
      LikelyPurchase: value,
    });
  }

  setSalutation(value) {
    this.setState({
      Salutation: value,
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
      "describe",
      (res) => {
        let responseData = JSON.parse(res);
        console.log(responseData);
        this.setState({
          isEnquirySourceLoading: false,
          enquirySourceList: responseData,
          Enquiry_Source__c: value ? responseData[value] : [] 
        });
      },
      (err) => {
        console.log("error - " + JSON.stringify(err));
      },
      "POST",
      { dependentString: "Lead.Enquiry_Source__c" },
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + usable_access_token,
      },
      null,
      null,
      false
    );
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

    if (value == "") {
      this.setState({
        check: false,
      });
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
          EnquirySubSource: '',
          Enquiry_Sub_Source__c: this.state.enquirySubSourceList[value] ? this.state.enquirySubSourceList[value] : []
        });
      }
    }
  }

  fetchEquirySubSourceList = (ownerId, accessToken, value) => {
    let usable_access_token = accessToken;
    let salesConsultantIds = [];
    salesConsultantIds.push(ownerId);

    this.setState({
      isEnquirySubSourceLoading: true,
    });

    net.sendRequest(
      "/services/apexrest/getDependentPicklistValues",
      "getDependentPicklistValues",
      (res) => {
        let responseData = JSON.parse(res);
        console.log(responseData);
        this.setState({
          isEnquirySubSourceLoading: false,
          enquirySubSourceList: responseData,
          Enquiry_Sub_Source__c: value ? responseData[value] : [] //NAVAL OPEN IT WHEN THE TEAM COMPLETES ITS JOB
        });
      },
      (err) => {
        console.log("error - " + JSON.stringify(err));
      },
      "POST",
      { dependentString: "Lead.Enquiry_Sub_Source__c" },
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + usable_access_token,
      },
      null,
      null,
      false
    );
  }

  DropdownEnquirySubSource(value){
    this.setState({ EnquirySubSource: value});
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
    let Variant = this.state.Variant;
    let Color = this.state.Color;
    let SeatCapacity = this.state.SeatCapacity;
    let FuelType = this.state.FuelType;
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
    addListOfModel[model] = Product(
      model,
      qty,
      interest,
      Variant,
      Color,
      SeatCapacity,
      FuelType
    );

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
      Variant: "",
      Color: "",
      SeatCapacity: "",
      FuelType: "",
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

  onEnquirySubmit = () => {
    this.createSFLead();
  };

  createSFLead = () => {
    this.setState({
      showLoading: true,
    });
    // if (AccountId) {
    let lead_details = {
      Company: this.state.LastName,
      recordTypeId: "0125D000000Qa87QAC",
      ACE_Dealer__c: this.state.dealerC,
      LeadSource: "Dealer QE",
      Salutation: this.state.Salutation,
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email,
      MobilePhone: this.state.MobilePhone,
      Segment__c: this.state.Segment,
      Enquiry_Type__c: this.state.EnquiryType,
      Enquiry_Source__c: this.state.EnquirySource,
      Enquiry_Sub_Source__c: this.state.EnquirySubSource,
      Likely_Purchase__c: this.state.LikelyPurchase,

      attributes: { type: Lead.salesForceName },

      __local__: true,
      __locally_created__: true,
      __locally_updated__: false,
      __locally_deleted__: false,
    };

    //  Upsert into soup
    SoupHelper.addSingleRecordToSoupAndSync(Lead, lead_details, (response) => {
      if (response.error) {
        console.log("Error in adding CONTACT");
      } else {
        console.log("Success in adding Lead");
        // this.props.navigation.navigate("QuickEnquiryCustomer360");
        SoupHelper.getSoupRecordBySoupEntryId(
          Lead,
          response.data._soupEntryId,
          (record) => {
            console.log("Upsynced record of Lead = " + JSON.stringify(record));
            if (record.error) {
              console.log(
                "Error while obtaining the Record from soup at addSingleRecordToSoupAndSync"
              );
            } else {
              // this.createSFEnquiry(AccountId, record.data.Id);
              this.createSFQuickEnquiryModel(record.data.Id);
              console.log("thisisthedata"+JSON.stringify(record));
            }
          }
        );
      }
    });
    // } else {
    //   alert("AccountId is received NULL");
    //   this.setState({ showLoading: false });
    // }
  };

  createSFQuickEnquiryModel = (QuickEnquiryId) => {
    console.log(
      "creating QuickEnquiryModel for QuickEnquiryId=  " + QuickEnquiryId
    );

    if (QuickEnquiryId) {
      let enquiryModelsToAdd = Object.keys(this.state.addListOfModel).map(
        (model) => {
          return {
            Product_Family_Text__c: this.state.chooseModel,
            Interest_Category__c: "Primary_Interest",
            Quantity__c: this.state.Quantity,
            Lead__c: QuickEnquiryId,
            Product_Family_Variant__c: this.state.Variant,
            Vehicle_Colors__c: this.state.Color,
            Seating_Capacity_Text__c: this.state.SeatCapacity,
            Fuel_Type_Text__c: this.state.FuelType,

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
            console.log("Error in adding QUICK ENQUIRY MODEL");
          } else {
            console.log("Success in adding QUICK ENQUIRY MODEL");
            console.log(JSON.stringify(response));
            this.createSFQETask(QuickEnquiryId);
          }
        }
      );
    } else {
      alert("EnquiryId is received NULL for Model Creation");
      this.setState({ showLoading: false });
    }
  };

  createSFQETask = (QuickEnquiryId) => {


    if (QuickEnquiryId) {
      let selectedTimeSlot = this.state.selectedTimeSlot.split(":");
      let chosenDate = new Date(this.state.chosenDate);
      chosenDate.setHours(selectedTimeSlot[0]);
      chosenDate.setMinutes(selectedTimeSlot[1]);

      let followupTask = {
        // Subject: this.state.subject,
        Subject: this.state.type,
        Product_Family__c: this.state.chooseModel,

        WhoId: QuickEnquiryId,

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
            console.log("Error in adding QETASK");
          } else {
            this.setState({
              showLoading: false,
            });
            console.log("Success in adding QETASK");
            alert("Success in adding");
            this.props.navigation.navigate("Quick Enquiry");
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

  renderViewMore(onPress) {
    return (
      <Button small style={styles.showMoreButton} onPress={onPress}>
        <Text>show more</Text>
      </Button>
    );
  }

  renderViewLess(onPress) {
    return (
      <Button small style={styles.showLessButton} onPress={onPress}>
        <Text>show less</Text>
      </Button>
    );
  }

  render() {
    let showDetails = false;
    if (this.state.showLoading) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#E31837" size="large" animating />
          <Text style={{ padding: 60, textAlign: "center" }}>
            Please wait while the quick enquiry is getting created
          </Text>
        </View>
      );
    }

    const { checked, checkedLikelyPurchase } = this.state;
    //const productData = enquiryProduct2PickListHelper();
    // console.log("Enquiry Json Feilds : " + JSON.stringify(productData));
    //console.log("okay===================================" + JSON.stringify(this.state.prospectTypeData));

    //let nextTimeSlot = this.getNextTimeSlot();
    let modelKeys = Object.keys(this.state.addListOfModel);
    return (
      <View style={styles.EnquiryOverallView}>
        <Header
          style={{ backgroundColor: "#333333" }}
          androidStatusBarColor="#A31837"
        >
          <Left>
            <Button
              transparent
              style={{ backgroundColor: "#333333" }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="md-arrow-back" style={{ color: "white" }} />
            </Button>
          </Left>
          <Body style={{textAlign:Left,}}>
            <Title
              style={{
                color: "white",
                fontFamily: "Poppins-Medium",
                fontWeight: "400",
              }}
            >
              Create Quick Enquiry
            </Title>
          </Body>
          
        </Header>
        <ProgressSteps
          disabledStepNumColor="black"
          style={styles.ProgressSteps}
        >
          <ProgressStep
            label="Quick Enquiry Details"
            onNext={this.validateQEInformationStep}
            errors={this.state.QEInformationStepHasError}
          >
            <View style={styles.EnquiryProgressStepForUser}>
              <View style={styles.bigcard}> 
                <Text style={styles.title}>QUICK ENQUIRY DETAILS</Text>
                <View style={{ border: 20, margin: 20 }}>
                  <Text style={styles.dropDownTextLabel}>Type <Text style={{color:"#E92D46"}}>*</Text></Text>
                  <RadioChip options={this.state.quickEnquiryTypeData} onValueChange={this.DropdownEnquiryType.bind(this)} />
                  

                  <Text style={styles.dropDownTextLabel}>Source <Text style={{color:"#E92D46"}}>*</Text></Text>
                  {this.state.isEnquirySourceLoading == true ? (
                    <ActivityIndicator size="small" color="#E31837" animating />
                  ) : (
                    <RadioChip options={this.state.Enquiry_Source__c} onValueChange={this.DropdownEnquirySource.bind(this)} />
                    
                  )}

                  <Text style={styles.dropDownTextLabel}>Sub Source <Text style={{color:"#E92D46"}}>*</Text></Text>
                  {this.state.isEnquirySubSourceLoading == true ? (
                    <ActivityIndicator size="small" color="#E31837" animating />
                  ) : (
                    <RadioChip options={this.state.Enquiry_Sub_Source__c} onValueChange={this.DropdownEnquirySubSource.bind(this)}/>
                    
                  )}
                  
                  <Text style={styles.dropDownTextLabel}>Likely Purchase <Text style={{color:"#E92D46"}}>*</Text></Text>
                  <RadioChip options={this.state.quickEnquiryLikelyPurchase} onValueChange={this.DropdownLikelyPurchase.bind(this)}/>
                </View>
              </View>

              <View style={styles.bigcard}> 
               <Text style={styles.title}>PERSONAL DETAILS</Text>
               <View style={{ border: 20, margin: 20 }}>
                  <RadioChip options={this.state.quickEnquirySalutation} onValueChange={this.setSalutation.bind(this)}/>

                  <Text style={styles.dropDownTextLabel}>First Name<Text style={{color:"#E92D46"}}>*</Text></Text>
                  <TextInput
                    placeholder="Enter First Name"
                    placeholderTextColor="#B3B3B3"
                    value = {this.state.FirstName}
                    onChangeText={(FirstName) => {this.setState({ FirstName });}}
                    style={styles.inputs}
                    
                  />

                  <Text style={styles.dropDownTextLabel}>Last Name<Text style={{color:"#E92D46"}}>*</Text></Text>
                  <TextInput
                    placeholder="Enter Last Name"
                    placeholderTextColor="#B3B3B3"
                    value = {this.state.LastName}
                    onChangeText={(LastName) => {this.setState({ LastName });}}
                    style={styles.inputs}
                    
                  />

                  <Text style={styles.dropDownTextLabel}>Email <Text style={{color:"#E92D46"}}>*</Text></Text>
                  <TextInput
                    placeholder="Enter Email Id"
                    placeholderTextColor="#B3B3B3"
                    value = {this.state.Email}
                    onChangeText={(Email) => {this.setState({ Email });}}
                    style={styles.inputs}
                    
                  />

                  <Text style={styles.dropDownTextLabel}>Mobile<Text style={{color:"#E92D46"}}>*</Text></Text>
                  <TextInput
                    placeholder="Enter Mobile Number"
                    placeholderTextColor="#B3B3B3"
                    value = {this.state.MobilePhone}
                    onChangeText={(MobilePhone) => {this.setState({ MobilePhone });}}
                    style={styles.inputs}
                    
                  />
                  
               </View>
              </View>

              <View style={styles.bigcard}> 
               <Text style={styles.title}>MODEL DETAILS</Text>
               <View style={{ border: 20, margin: 20 }}>
                  <Text style={styles.dropDownTextLabel}>Model <Text style={{color:"#E92D46"}}>*</Text></Text>
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

                  <Text style={styles.dropDownTextLabel}>Quantity <Text style={{color:"#E92D46"}}>*</Text></Text>
                  <TextInput
                    placeholder="Enter Quantity"
                    placeholderTextColor="#B3B3B3"
                    value = {this.state.Quantity}
                    onChangeText={(Quantity) => {this.setState({ Quantity });}}
                    style={styles.inputs}
                    
                  />

                  <Text style={styles.dropDownTextLabel}>Variant </Text>
                  <TextInput
                    placeholder="Select Variant"
                    placeholderTextColor="#B3B3B3"
                    value = {this.state.Variant}
                    onChangeText={(Variant) => {this.setState({ Variant });}}
                    style={styles.inputs}

                  />

                  <Text style={styles.dropDownTextLabel}>Color </Text>
                  <TextInput
                    placeholder="select Color"
                    placeholderTextColor="#B3B3B3"
                    value = {this.state.Color}
                    onChangeText={(Color) => {this.setState({ Color });}}
                    style={styles.inputs}
                    
                  />

                  <Text style={styles.dropDownTextLabel}>Seating Capacity </Text>
                  <TextInput
                    placeholder="Select Seating Capacity"
                    placeholderTextColor="#B3B3B3"
                    value = {this.state.SeatCapacity}
                    onChangeText={(SeatCapacity) => {this.setState({ SeatCapacity });}}
                    style={styles.inputs}
                    
                  />

                  <Text style={styles.dropDownTextLabel}>Fuel Type </Text>
                  <TextInput
                    placeholder="Select Fuel Type"
                    placeholderTextColor="#B3B3B3"
                    value = {this.state.FuelType}
                    onChangeText={(FuelType) => {this.setState({ FuelType });}}
                    style={styles.inputs}
                    
                  />
                </View>    
              </View>
            </View>
          </ProgressStep>

          <ProgressStep
            label="Follow Up"
            onNext={this.validateFollowUpStep}
            errors={this.state.followUpStepHasError}
          >
             <View>
                <View style={styles.bigcard}> 
                <Text style={styles.title}>Follow Up details</Text>
                <View style={{ border: 20, margin: 20 }}>
                  <Text style={styles.dropDownTextLabel}>Type <Text style={{color:"#E92D46"}}>*</Text></Text>
                  <RadioChip options={this.state.TaskType} onValueChange={this.DropdownType.bind(this)}/>
                  
                  <Text style={styles.dropDownTextLabel}>Date and Time <Text style={{color:"#E92D46"}}>*</Text></Text>
                  <Row style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
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
                      }
                      textStyle={{ color: "black" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={this.setDate}
                      disabled={false}
                    />
                    <Picker
                      mode="dropdown"
                      placeholder="Select Time"
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
              </View>  
          </ProgressStep>
        </ProgressSteps>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  EnquiryOverallView: {
    flex: 1,
  },
  ProgressSteps:{
    marginBottom:"3%"
  },
  dropDownTextLabel: {
    color: "#000000",
    fontSize: 14,
    textTransform: 'uppercase'
  },
  inputs: {
    flex: 1,
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor:"#000000",
    height:"50%",
    marginBottom:"2%",
    marginTop:"2%"
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
    color: "#000000",
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
  collapse: {
    marginLeft: 20,
  },
  title : {
    marginTop:"3%",
    fontFamily : 'Poppins-Regular',
    fontWeight:"400",
    fontSize: 16,
    textAlign:"center",
    textTransform: 'uppercase'
  }, 

  bigcard:{
    borderWidth: 1,
    margin: "3%",
    marginTop:"5%",
    borderColor: "#F2F3F4",
    borderRadius: 10,
    elevation: 1,
    backgroundColor: "#FFFFFF",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  }
});

function Product(model, qty, interest, Variant, Color, SeatCapacity, FuelType) {
  return {
    model: model,
    qty: qty,
    interest: interest,
    Variant: Variant,
    Color: Color,
    SeatCapacity: SeatCapacity,
    FuelType: FuelType,
  };
}

export default QuickEnquiryOnSearch;
