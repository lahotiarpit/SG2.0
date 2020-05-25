import React, { Component } from "react";
import {
  Avatar,
  Card,
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
  Accordion,
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
import enquiryProduct2PickListHelper from "../PicklistHelpers/EnquiryProduct2PickListHelper";
import taskPickList from "../PicklistHelpers/TaskPickListHelper";
import quickEnqsEnquiryTypeAndSourcePickList from "../PicklistHelpers/QuickEnqsEnquiryTypeAndSourcePickList";

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
      checked: "first",
      checkedLikelyPurchase: "LT15",
      FirstName: "",
      LastName: "",
      Age: "",
      Email: "",
      //ReferByName: "",
      MobileNumber: "",
      //ReferralMobileNumber: "",
      Enquirytype: "",
      EnquirySource: "",
      SubSource: "",
      LikelyPurchase: "",
      enquiryTab3Err: false,
      //Quantity: "",
      //next: false,
      UsageArea: "",
      ProductName: "",
      dealerC: "",
      Variant: "",
      Color: "",
      FuelType: "",
      SeatCapacity: "",
      showAddDetails: false,
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
      age: "",
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

      ownerId: undefined,
      AccessToken: undefined,

      quickEnquiryTypeData: [],
      quickEnquirySourceData: [],
      quickEnquirySubSourceData: [],
      quickEnquiryLikelyPurchase: [],

      QEInformationStepHasError: true,
      personalDetailsStepHasError: true,
      productStepHasError: true,
      //   enquiryStepHasError: true,
      //   followUpStepHasError: true
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
    } else if (!this.state.SubSource) {
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
    if (!this.state.type) {
      alert("Please provide Type");
      return;
    } else if (!this.state.model) {
      alert("Please provide Model");
      return;
    } else if (!this.state.chosenDate) {
      alert("Please provide a Call date");
      return;
    } else {
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
      quickEnquirySourceData: quickEnquiryTypeAndSource.Enquiry_Source__c,
      quickEnquirySubSourceData: quickEnquiryTypeAndSource.Sub_Source__c,
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

  DropdownQuickEnquiryType(value) {
    if (this.state.enquirySourceList == undefined) {
      this.fetchQuickEnquirySourceList(
        this.state.ownerId,
        this.state.accessToken
      );
    } else {
      if (value) {
        this.setState({
          EnquiryType: value,
          EnquirySource: "",
          Enquiry_Source__c: this.state.enquirySourceList[value]
            ? this.state.enquirySourceList[value]
            : [],
        });
      } else {
        this.setState({
          EnquiryType: value,
          EnquirySource: "",
          Enquiry_Source__c: [],
        });
      }
    }
  }

  fetchQuickEnquirySourceList = (ownerId, accessToken) => {
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
          //  Enquiry_Source__c: value ? responseData[value] : [] //NAVAL OPEN IT WHEN THE TEAM COMPLETES ITS JOB
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
    this.setState({
      EnquirySource: value,
    });
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
      MobilePhone: this.state.MobileNumber,
      Segment__c: this.state.Segment,
      Enquiry_Type__c: this.state.EnquiryType,
      Enquiry_Source__c: this.state.EnquirySource,
      Sub_Source__c: this.state.SubSource,
      Likely_Purchase__c: this.state.checkedLikelyPurchase,

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
            Product_Family_Text__c: this.state.addListOfModel[model].model,
            Interest_Category__c:
              this.state.primaryInterestModel ==
              this.state.addListOfModel[model].model
                ? "Primary_Interest"
                : "Other_Interest",
            Quantity__c: this.state.addListOfModel[model].qty,
            Lead__c: QuickEnquiryId,
            Product_Family_Variant__c: this.state.addListOfModel[model].Variant,
            Vehicle_Colors__c: this.state.addListOfModel[model].Color,
            Seating_Capacity_Text__c: this.state.addListOfModel[model].SeatCapacity,
            Fuel_Type_Text__c: this.state.addListOfModel[model].FuelType,

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
        Product_Family__c: this.state.model,

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
          <Body style={{textAlign:Left,}}>
            <Title
              style={{
                color: "white",
                fontFamily: "barlow",
                fontWeight: "bold",
              }}
            >
              Create Quick Enquiry
            </Title>
          </Body>
          
        </Header>
        <ProgressSteps
          //activeStep='4'
          disabledStepNumColor="black"
          style={styles.ProgressSteps}
        >
          <ProgressStep
            label="QE Info"
            onNext={this.validateQEInformationStep}
            errors={this.state.QEInformationStepHasError}
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
                  <Text style={styles.dropDownTextLabel}>Enquiry Type</Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.EnquiryType}
                    onValueChange={this.DropdownQuickEnquiryType.bind(this)}
                  >
                    <Picker.Item label="-None-" value="" />
                    {this.state.quickEnquiryTypeData.map((EnquiryType) => {
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
                  {this.state.isEnquirySourceLoading == true ? (
                    <ActivityIndicator size="small" color="#E31837" animating />
                  ) : (
                    <Picker
                      enabled={this.state.Enquiry_Source__c.length > 0}
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.EnquirySource}
                      onValueChange={this.DropdownEnquirySource.bind(this)}
                    >
                      <Picker.Item label="-None-" value="" />
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
                  )}

                  <Text style={styles.dropDownTextLabel}>
                    Enquiry Sub Source
                  </Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.SubSource}
                    onValueChange={this.DropdownSubSource.bind(this)}
                  >
                    <Picker.Item label="-None-" value="" />
                    {this.state.quickEnquirySubSourceData.map((UsageArea) => {
                      return (
                        <Picker.Item
                          label={UsageArea.label}
                          value={UsageArea.value}
                          key={UsageArea.value}
                        />
                      );
                    })}
                  </Picker>

                  <Text style={styles.dropDownTextLabel}>Likely Purchase</Text>
                  <View
                    style={{ border: 20, margin: 20, flexDirection: "row" }}
                  >
                    <Row style={{ alignItems: "center", flex: 1 }}>
                      <RadioButton
                        color="black"
                        value="second"
                        status={
                          checkedLikelyPurchase === "LT15"
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => {
                          this.setState({ checkedLikelyPurchase: "LT15" });
                        }}
                      />
                      <Label>Hot</Label>

                      <RadioButton
                        color="black"
                        value="second"
                        status={
                          checkedLikelyPurchase === "GT15"
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => {
                          this.setState({ checkedLikelyPurchase: "GT15" });
                        }}
                      />
                      <Label>Warm</Label>

                      <RadioButton
                        color="black"
                        value="second"
                        status={
                          checkedLikelyPurchase === "GT45"
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => {
                          this.setState({ checkedLikelyPurchase: "GT45" });
                        }}
                      />
                      <Label>Cold</Label>
                    </Row>
                    {/* {this.state.quickEnquiryLikelyPurchase.map((lp) => {
                    <Row style={{ alignItems: "center", flex: 1 }}>
                    
                      <RadioButton
                        color="black"
                        value="second"
                        status={
                          checkedLikelyPurchase === lp.label
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() => {
                          this.setState({ checkedLikelyPurchase: lp.value,});
                        }}
                      />
                      <Label>{lp.label}</Label>
                     
                      </Row>
                    })} */}

                  </View>

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

          <ProgressStep
            label="Personal Details"
            onNext={this.validatePersonalDetailsStep}
            errors={this.state.personalDetailsStepHasError}
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
                  <Row style={{ alignItems: "center" }}>
                    <RadioButton
                      color="black"
                      value="second"
                      status={checked === "first" ? "checked" : "unchecked"}
                      onPress={() => {
                        this.setState({ checked: "first" });
                      }}
                    />
                    <Label>Mr</Label>

                    <RadioButton
                      color="black"
                      value="second"
                      status={checked === "second" ? "checked" : "unchecked"}
                      onPress={() => {
                        this.setState({ checked: "second" });
                      }}
                    />
                    <Label>Mrs</Label>

                    <RadioButton
                      color="black"
                      value="second"
                      status={checked === "third" ? "checked" : "unchecked"}
                      onPress={() => {
                        this.setState({ checked: "third" });
                      }}
                    />
                    <Label>Ms</Label>

                    <RadioButton
                      color="black"
                      value="second"
                      status={checked === "fourth" ? "checked" : "unchecked"}
                      onPress={() => {
                        this.setState({ checked: "fourth" });
                      }}
                    />
                    <Label>Dr</Label>
                  </Row>
                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Name"
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
            label="Product"
            onNext={this.validateProductStep}
            errors={this.state.productStepHasError}
          >
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
                  const dataArray = [
                    {
                      title: "View Details",
                      content: "Variant : '"+this.state.addListOfModel[key].Variant+"', Color : '"+this.state.addListOfModel[key].Color+"', Seat Capacity : '"+this.state.addListOfModel[key].SeatCapacity+"', Fuel Type : '"+this.state.addListOfModel[key].FuelType+"'",
                    }
                  ];
                  return (
                  <View>
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
                      {/* <Accordion dataArray={dataArray} expanded={0}/> */}
                    </Row>
                    <Row>
                    <Accordion dataArray={dataArray} headerStyle = {{backgroundColor : 'transparent'}}/>
                    </Row>
                  </View>
                  );
                })}
                <Button
                  dark
                  rounded
                  style={{
                    marginTop: 10,
                    alignSelf: "center",
                    alignContent: "center",
                  }}
                  onPress={() => this.openModal()}
                >
                  <Icon name="add" style={{ color: "#E31837" }} />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      paddingRight: "10%",
                    }}
                  >
                    Vehicle
                  </Text>
                </Button>
              </View>
            </View>
          </ProgressStep>

          <ProgressStep label="Followup" onSubmit={this.validateFollowUpStep}>
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
                    <Label style={{ flex: 1 }}>Type</Label>
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

                  <Row
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Label style={{ color: "black" }}>Call Date :</Label>
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
                Add Product
              </Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: "column", marginVertical: "5%" }}>
                  <Text style={styles.dropDownTextLabel}>
                    Select Product Family{" "}
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
                  <Text style={styles.dropDownTextLabel}>
                    Select Product Interest{" "}
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

                  <Button
                    transparent
                    disabled={!this.state.chooseModel}
                    // onPress={this.showDetails = true}
                  >
                    <Text>Add Details</Text>
                  </Button>

                  {this.state.chooseModel ? (
                    <View style={{ marginBottom: "5%" }}>
                      <TextInput
                        style={styles.inputs}
                        type="outlined"
                        label="Variant"
                        value={this.state.Variant}
                        onChangeText={(Variant) => this.setState({ Variant })}
                        mode="outlined"
                        returnKeyType="next"
                        ref={this.Variant}
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
                      />

                      <TextInput
                        style={styles.inputs}
                        type="outlined"
                        label="Color"
                        value={this.state.Color}
                        onChangeText={(Color) => this.setState({ Color })}
                        mode="outlined"
                        returnKeyType="next"
                        ref={this.Color}
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
                      />

                      <TextInput
                        style={styles.inputs}
                        type="outlined"
                        label="Seating Capacity"
                        value={this.state.SeatCapacity}
                        onChangeText={(SeatCapacity) =>
                          this.setState({ SeatCapacity })
                        }
                        mode="outlined"
                        returnKeyType="next"
                        ref={this.SeatCapacity}
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
                      />

                      <TextInput
                        style={styles.inputs}
                        type="outlined"
                        label="Fule Type"
                        value={this.state.FuelType}
                        onChangeText={(FuelType) => this.setState({ FuelType })}
                        mode="outlined"
                        returnKeyType="next"
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
                      />
                    </View>
                  ) : null}

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
                    <Text style={{ color: "white", padding: "5%" }}>Save</Text>
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
  collapse: {
    marginLeft: 20,
  },
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
