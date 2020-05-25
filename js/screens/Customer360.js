import React, { Component } from "react";
import Modal, { ModalContent } from "react-native-modal";
import ViewMoreText from "react-native-view-more-text";
import {
  StyleSheet,
  ScrollView,
  Linking,
  Platform,
  AppState,
  PermissionsAndroid,
  Alert,
} from "react-native";
import {
  Label,
  Row,
  Picker,
  Container,
  Left,
  Right,
  Body,
  Header,
  Icon,
  View,
  Text,
  Button,
  Content,
  Item,
  Thumbnail,
  DatePicker,
} from "native-base";
import {
  ScrollableTabView,
  ScrollableTabBar,
} from "@valdio/react-native-scrollable-tabview";
import {
  FAB,
  IconButton,
  Paragraph,
  Dialog,
  Portal,
  TextInput,
  ActivityIndicator,
  RadioButton,
} from "react-native-paper";
import {
  forceUtil,
  mobilesync,
  oauth,
  net,
  smartstore,
} from "react-native-force";
import Timelinee from "./Timelinee";
import taskPickList from "../PicklistHelpers/TaskPickListHelper";

import Task from "../soups/Task";
import SoupHelper from "../soups/SoupHelper";

var SharedPreferences = require("react-native-shared-preferences");

// import { PermissionsAndroid } from "react-native";
import CallLogs from "react-native-call-log";
import { moveCursorToPreviousPage } from "react-native-force/src/react.force.smartstore";

// const stack = createStackNavigator({
//      Enquiry : {screen : Enquiry},
//      Booking : {screen : Booking}
// })

// export default createAppNavigator(stack);

export default class Customer360 extends Component {
  owner_id;

  constructor(props) {
    super(props);

    this.state = {
      checkCondition: true,
      subject: "",
      model_r: "",
      tasks: [],
      enquiryId: props.route.params.enquiryId,
      ownerId: undefined,
      AccessToken: undefined,

      callDuration: 0,
      enquiryData: undefined,

      subject: "",
      model: "",
      type: "",
      status: "",
      chosenDate: "",
      onModalSumittingShowLoading: false,

      remark: "",
      remarkType: "",
      remarkSubType: "",
      isDisabled: false,
      isRemarkLoading: false,
      isRemarkSubTypeLoading: false,
      newFollowErr: false,

      modalVisible: false,
      selectedTimeSlot: this.getNextTimeSlot(),

      RemarkOptions: [],
      RemarkTypeOptions: [],
      RemarkSubTypeOptions: [],

      RemarkTypeOptionsList: undefined,
      RemarkSubTypeOptionsList: undefined,

      SubjectOptions: [],
      ActivityTypeOptions: [],
      StatusOptions: [],

      currentActionedTask: {},

      createNewTask: false,
      showModalForOnlyCreatingNewFollowup: true,
    };

    console.log(
      "#### This is the Enquiry Id : " + JSON.stringify(this.state.enquiryId)
    );
  }

  async componentDidMount() {
    AppState.addEventListener("change", (state) => this.getCallDuration());

    SharedPreferences.getItem("OwnerId", (ownerId) => {
      this.setState({ ownerId: ownerId });
    });

    SharedPreferences.getItem("AccessToken", (accessToken) => {
      this.setState({ AccessToken: accessToken });
    });

    let taskData = taskPickList();
    this.setState({
      RemarkOptions: taskData.Dealer_Remarks__c,
      //RemarkTypeOptions: taskData.Dealer_Remarks_Type__c,
      //RemarkSubTypeOptions: taskData.Dealer_Remarks_Subtype__c,

      SubjectOptions: taskData.Subject,
      ActivityTypeOptions: taskData.Activity_Type__c,
      StatusOptions: taskData.Status,
      TaskStatus: taskData.Status__c,
    });

    this.getCallDuration();
  }

  componentDidUpdate() {
    if (
      this.state.enquiryId &&
      this.state.ownerId &&
      this.state.enquiryData == undefined
    ) {
      net.query(
        "SELECT Id, Name, Account.Name, Account.RecordTypeId, Dealer__r.Name, StageName, Enquiry_Date__c, Enquiry_Type__c, Likely_Purchase__c, Enquiry_Source__c, Usage_Area__c, Refer_By_Name__c, Next_Action__c, Enquiry_Number__c, Existing_Customer__c, DMS_Enquiry_Number__c, Contact__r.Name, Contact__r.MobilePhone, Contact__r.Email, Contact__r.Salutation, Contact__r.Phone, Contact__r.Customer_Type__c, Contact__r.Age__c, Contact__r.Communicate_To__c, Contact__r.Wedding_Anniversary_Date__c, Contact__r.MailingStreet, Contact__r.MailingPostalCode, Contact__r.Gender__c, Contact__r.Number_Of_Car_Owned__c, Contact__r.Family_Size__c, Contact__r.First_Time_User__c, (SELECT ID, Product2Id, Product2.name, Product2.color__c, Product2.Vehicle_Model__c, Product2.Variant__c, Product2.Fuel_Type__c, Quantity, UnitPrice, TotalPrice, PricebookEntry.Name, PricebookEntry.Product2.Family FROM OpportunityLineItems), (SELECT ID, Name, Booking_Amount__c, Amount_Received__c, Booking_Date__c, Delivery_Locations__c FROM Bookings__r), (SELECT ID, Name, Stage__c, Start_Date_Time__c,Product__r.Name,Place__c, Enquiry_Id__r.Name FROM Test_Drives__r), (SELECT ID, Name, ExpirationDate FROM Quotes),  (SELECT Id, Subject, Activity_Type__c, Model__c, Product_Family__c ,Status, Status__c,Dealer_Remarks__c,Dealer_Remarks_Type__c,Dealer_Remarks_Subtype__c,Call_Start_Time__c, Actual_CallTime__c, Call_End_Time__c, WhatId  FROM Tasks where IsClosed= false), ( Select Id, Product_Family_Text__c, Interest_Category__c, Quantity__c, Enquiry__c from Product_Interests__r) FROM Opportunity WHERE OwnerId = '" +
          this.state.ownerId +
          "' AND Id = '" +
          this.state.enquiryId +
          "'",
        (response) => {
          console.log("=== " + JSON.stringify(response));
          this.setState({
            enquiryData: response,
          });
        },
        (err) => {
          console.log("************1");
          console.log(err);
        }
      );
    }
  }

  getCallDuration = async () => {
    // To get call duration
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: "Call Log Example",
          message: "Access your call logs",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let countSeconds = 0;
        const a = [];

        let todayMidnight = new Date();
        todayMidnight.setHours(0);
        todayMidnight.setMinutes(0);
        todayMidnight.setSeconds(0);
        todayMidnight.setMilliseconds(0);

        CallLogs.loadAll().then((c) => {
          c.map((h) => {
            if (
              new Date(h.dateTime).getTime() >= todayMidnight.getTime() &&
              h.phoneNumber.indexOf(
                this.state.enquiryData.records[0].Contact__r.MobilePhone
              ) > -1
            ) {
              a.push(h.duration);
            }
          });

          if (a.length > 0)
            countSeconds = a.reduce((result, number) => result + number);

          console.log("=+=+=+=+=+=+=");
          this.setState({
            callDuration: countSeconds,
          });
        });
      } else {
        console.log("Call Log permission denied");
      }
    } catch (e) {
      console.log(e);
    }
  };

  fetchRemarkTypeOptionsList = (ownerId, accessToken) => {
    this.setState({
      isRemarkLoading: true,
    });

    let usable_access_token = accessToken;
    let salesConsultantIds = [];
    salesConsultantIds.push(ownerId);

    net.sendRequest(
      "/services/apexrest/getDependentPicklistValues",
      "getDependentPicklistValues",
      (res) => {
        let responseData = JSON.parse(res);
        this.setState({
          isRemarkLoading: false,
          RemarkTypeOptionsList: responseData,
          RemarkTypeOptions: responseData[this.state.remark]
            ? responseData[this.state.remark]
            : [],
        });
      },
      (err) => {
        console.log("error - " + JSON.stringify(err));
      },
      "POST",
      { dependentString: "Task.Dealer_Remarks_Type__c" },
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + usable_access_token,
      },
      null,
      null,
      false
    );
  };

  fetchRemarkSubTypeOptionsList = (ownerId, accessToken) => {
    this.setState({
      isRemarkSubTypeLoading: true,
    });

    let usable_access_token = accessToken;
    let salesConsultantIds = [];
    salesConsultantIds.push(ownerId);

    net.sendRequest(
      "/services/apexrest/getDependentPicklistValues",
      "getDependentPicklistValues",
      (res) => {
        let responseData = JSON.parse(res);
        this.setState({
          isRemarkSubTypeLoading: false,
          RemarkSubTypeOptionsList: responseData,
          RemarkSubTypeOptions: responseData[this.state.remarkType]
            ? responseData[this.state.remarkType]
            : [],
        });
      },
      (err) => {
        console.log("error - " + JSON.stringify(err));
      },
      "POST",
      { dependentString: "Task.Dealer_Remarks_Subtype__c" },
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + usable_access_token,
      },
      null,
      null,
      false
    );
  };

  DropdownRemarkOptions(value) {
    if (this.state.RemarkTypeOptionsList == undefined) {
      this.fetchRemarkTypeOptionsList(
        this.state.ownerId,
        this.state.AccessToken
      );
    } else {
      if (value) {
        this.setState({
          //isRemarkLoading: true,
          remark: value,
          RemarkTypeOptions: this.state.RemarkTypeOptionsList[value]
            ? this.state.RemarkTypeOptionsList[value]
            : [],
        });
      } else {
        this.setState({
          remark: value,
          RemarkTypeOptions: [],
          RemarkSubTypeOptions: [],
        });
      }
    }
  }

  DropdownRemarkTypeOptions(value) {
    if (this.state.RemarkSubTypeOptionsList == undefined) {
      this.setState({
        remarkType: value,
      });

      this.fetchRemarkSubTypeOptionsList(
        this.state.ownerId,
        this.state.AccessToken
      );
    } else {
      if (value) {
        this.setState({
          //isRemarkSubTypeLoading: true,
          remarkType: value,
          RemarkSubTypeOptions: this.state.RemarkSubTypeOptionsList[value]
            ? this.state.RemarkSubTypeOptionsList[value]
            : [],
        });
      } else {
        this.setState({
          remarkType: value,
          RemarkSubTypeOptions: [],
        });
      }
    }
  }

  DropdownRemarkSubTypeOptions(value) {
    this.setState({
      remarkSubType: value,
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

  DropdownTime(value) {
    this.setState({
      selectedTimeSlot: value,
    });
  }

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

  setDate = (newDate) => {
    this.setState({ chosenDate: newDate });
  };

  validateForm = () => {
    let valid = true;
    const { remark, remarkType, remarkSubType } = this.state;
    if (
      !remark ||
      (this.state.RemarkTypeOptions.length > 0 && !remarkType) ||
      (this.state.RemarkSubTypeOptions.length > 0 && !remarkSubType)
    ) {
      if (this.state.showModalForOnlyCreatingNewFollowup == true) {
        alert("Fields from Remarks are missing");
        return false;
      }
    } else {
      if (this.state.createNewTask) {
        if (
          !this.state.subject ||
          !this.state.model ||
          !this.state.type ||
          !this.state.status
        ) {
          alert("Please enter values for new followup");
          return false;
        }

        if (!this.state.chosenDate) {
          alert("Please Select Call Date & Time");
          return false;
        }
      }
    }

    return true;
  };

  saveTask = () => {

    if (this.validateForm()) {
      this.createSFTask();

      console.log(
        "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= CUSTOMER 360"
      );
      console.log(new Date());
      console.log(
        "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= CUSTOMER 360"
      );
    }
  };

  createSFTask = () => {
    {
      let followupData = [];

      let followupTask = {
        Id: this.state.currentActionedTask.Id,
        Subject: this.state.currentActionedTask.Subject,
        Activity_Type__c: this.state.currentActionedTask.Activity_Type__c,
        Status__c: this.state.currentActionedTask.Status__c,
        Product_Family__c: this.state.currentActionedTask.Product_Family__c,

        WhatId: this.state.currentActionedTask.WhatId,

        Dealer_Remarks__c: this.state.remark,
        Dealer_Remarks_Type__c: this.state.remarkType,
        Dealer_Remarks_Subtype__c: this.state.remarkSubType,

        Call_End_Time__c: new Date().toISOString(),
        Call_Start_Time__c: this.state.currentActionedTask.Call_Start_Time__c,
        Actual_CallTime__c: "" + this.state.callDuration,

        attributes: { type: Task.salesForceName },

        __local__: true,
        __locally_created__: false,
        __locally_updated__: true,
        __locally_deleted__: false,
      };

      followupData.push(followupTask);

      if (this.state.createNewTask) {
        let selectedTimeSlot = this.state.selectedTimeSlot.split(":");
        let chosenDate = new Date(this.state.chosenDate);
        chosenDate.setHours(selectedTimeSlot[0]);
        chosenDate.setMinutes(selectedTimeSlot[1]);

        let newFollowupTask = {
          Subject: this.state.subject,
          Activity_Type__c: this.state.type,
          Status__c: this.state.status,
          Product_Family__c: this.state.model,
          Call_Start_Time__c: chosenDate.toISOString(),

          WhatId: this.state.currentActionedTask.WhatId,

          attributes: { type: Task.salesForceName },

          __local__: true,
          __locally_created__: true,
          __locally_updated__: false,
          __locally_deleted__: false,
        };

        followupData.push(followupTask, newFollowupTask);
      }

      this.setState({
        onModalSumittingShowLoading: true,
      });

      //console.log(followupTask)
      //  Upsert into soup
      SoupHelper.addMultipleRecordsToSoupAndSync(
        Task,
        followupData,
        (response) => {
          this.setState({
            showModalForOnlyCreatingNewFollowup: true,
            createNewTask: false
          })
          console.log(response);
          if (response.error) {
            console.log("Error in adding TASK");
          } else {

            Alert.alert("Success", "Folloups updated ...");
            this.props.navigation.navigate("Customer360", {
              enquiryId: this.state.enquiryId,
            }); 

            // this.setState({
            //   remark: "",
            //   subject: "",
            //   model: "",
            //   type: "",
            //   status: "",
            // });
          }

          console.log(
            "=-=-=-=-=-=-=-=-=-= END -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= CUSTOMER 360"
          );
          console.log(new Date());
          console.log(
            "=-=-=-=-=-=-=-=-=-= END -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= CUSTOMER 360"
          );

          this.setState({
            onModalSumittingShowLoading: false,
            modalVisible: false,
            currentActionedTask: {},
            enquiryData: undefined,

            remark: "",
            remarkType: "",
            remarkSubType: "",
            RemarkTypeOptions: [],
            RemarkSubTypeOptions: [],

            subject: "",
            model: "",
            type: "",
            status: "",
            chosenDate: "",
          });
        }
      );
    }
  };

  // _onRefresh = (callback) => {
  //     networkRequest().then(response => callback(response))
  // }

  //......Callback function for the phone call......

  showFollowupDetails = (json) => {
    console.log(json);
    this.setState({
      modalVisible: true,
      currentActionedTask: json.task,
    });
  };

  makeCall = (phone) => {
    const phoneNumber = this.state.enquiryData.records[0].Contact__r
      .MobilePhone;
    let phonenumber = "";
    if (Platform.OS === "android") {
      phonenumber = "tel:${" + phoneNumber + "}";
    } else {
      phonenumber = "telprompt:${" + phoneNumber + "}";
    }
    Linking.openURL(phonenumber);
  };
  //................................................

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
    if (this.state.enquiryData) {
      //  Show complete view of the information that is contained in enquiry data

      let keys = Object.keys(this.state.enquiryData.records[0].Contact__r);
      return (
        <Container>
          <Header style={styles.header} androidStatusBarColor="#A31837">
            <Left>
              <Button transparent>
                <Icon
                  name="md-arrow-back"
                  onPress={() => this.props.navigation.navigate("Home")}
                />
              </Button>
            </Left>
            <Body>
              <Text style={{ color: "white" }}>
                {this.state.enquiryData.records[0].Contact__r.Name}
              </Text>
            </Body>
            <Right>
              {/* <IconButton
                icon="phone"
                color="white"
                onPress={this.makeCall}
              ></IconButton> */}
            </Right>
          </Header>
          <Content>
            <View style={styles.collapse}>
              <ViewMoreText
                style={{ flex: 1 }}
                numberOfLines={2}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
                // textStyle={{textAlign: 'center'}}
              >
                <Thumbnail source={require("../../assets/user.jpeg")} />

                <Text style={{ fontSize: 18 }}>
                  {"\t\t"}
                  {this.state.enquiryData.records[0].Contact__r.Name}
                  {"\n"}
                  {"\t\t\t\t\t\t\t"}

                  {"\n\n"}
                  <Text style={{ flex: 1, fontSize: 15, minWidth: "100%" }}>
                    {keys.map((information, index) => {
                      if (
                        typeof this.state.enquiryData.records[0].Contact__r[
                          information
                        ] == "string"
                      )
                        return (
                          information.replace("__c", "").replace("_", " ") +
                          " : " +
                          this.state.enquiryData.records[0].Contact__r[
                            information
                          ] +
                          "\n"
                        );
                    })}
                  </Text>
                </Text>

                {/* <Text>
                  {"\n"}Registered Name : {HeaderName} {"\n"}
                  Customer Id : 32483 {"\n"}
                  Age : 80 {"\n"}
                  Phone Number : 1234567890 {"\n"}
                  Address : Akola
                </Text> */}
              </ViewMoreText>
            </View>
            {this.state.enquiryData.records[0].Product_Interests__r != null && (
              <ScrollableTabView
                refreshControlStyle={{ backgroundColor: "red" }}
                prerenderingSiblingsNumber={5}
                tabBarInactiveTextColor="gray"
                locked={true}
                renderTabBar={() => <ScrollableTabBar />}
              >
                {this.state.enquiryData.records[0].Product_Interests__r.records.map(
                  (product, index) => {
                    return (
                      <ScrollView
                        tabLabel={product.Product_Family_Text__c}
                        key={product.Id}
                      >
                        <Timelinee
                          enquiryId={this.state.enquiryId}
                          tasks={
                            this.state.enquiryData.records[0].Tasks
                              ? this.state.enquiryData.records[0].Tasks.records
                              : []
                          }
                          Product2Id={product.Product_Family_Text__c}
                          showFollowupDetails={this.showFollowupDetails}
                        />
                      </ScrollView>
                    );
                  }
                )}
              </ScrollableTabView>
            )}
          </Content>
          <FAB.Group
            fabStyle={{ backgroundColor: "#e53144" }}
            open={this.state.open}
            actions={[
              {
                icon: "diving-flippers",
                label: "Create Enquiry",
                color: "#E31837",
                onPress: () => {
                  console.log("::::::::::::::::");
                  this.props.navigation.navigate("Enquiry");
                },
              },
              {
                icon: "diving-flippers",
                label: "Convert To Enquiry",
                color: "#E31837",
                onPress: () => {
                  this.props.navigation.navigate("ConvertToEnquiry");
                },
              },
              {
                icon: "diving-flippers",
                label: "Create Followup",
                color: "#E31837",
                onPress: () => {
                  this.setState({
                    modalVisible: true,
                    showModalForOnlyCreatingNewFollowup: false,
                    createNewTask: true,
                  });
                },
              },
              {
                icon: "car",
                label: "Test Drive",
                color: "#E31837",
                onPress: () => {
                  this.props.navigation.navigate("TestDrive");
                },
              },
              {
                icon: "notebook",
                label: "Booking",
                color: "#E31837",
                onPress: () => {
                  this.props.navigation.navigate("Booking");
                },
              },
              {
                icon: "check",
                label: "Quotation",
                color: "#E31837",
                onPress: () => {
                  this.props.navigation.navigate("Quotation", {
                    enquiryId: this.state.enquiryId,
                    customerName: this.state.enquiryData.records[0].Contact__r
                      .Name,
                    enquiryName: this.state.enquiryData,
                  });
                },
              },
              {
                icon: "plus-circle",
                label: "Add Product",
                color: "#E31837",
                onPress: () => {
                  this.props.navigation.navigate("AddProduct");
                },
              },
            ]}
            icon="plus"
            //  onPress={() => this.props.navigation.navigate('Registration')}
            onStateChange={({ open }) => this.setState({ open })}
            onPress={() => {
              if (this.state.open) {
                // do something if the speed dial is open
              }
            }}
          />
          <Modal
            animationType={"none"}
            transparent={false}
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
          >
            {/*All views of Modal*/}
            <View style={styles.Task} light>
              <ScrollView showsVerticalScrollIndicator={false}>
                {this.state.showModalForOnlyCreatingNewFollowup == true ? (
                  <View flexDirection="row">
                    <Text>
                      Call Duration :{" "}
                      {new Date(this.state.callDuration * 1000)
                        .toISOString()
                        .substr(11, 8)}
                    </Text>
                    <Right>
                      <Icon
                        style={{ color: "black", padding: 10 }}
                        name="close"
                        onPress={() => {
                          this.setState({
                            modalVisible: false,
                          });
                        }}
                      />
                    </Right>
                  </View>
                ) : null}
                {this.state.showModalForOnlyCreatingNewFollowup == true ? (
                  <Button rounded success onPress={this.makeCall}>
                    <Icon style={{ color: "white" }} name="call" />
                    <Text>
                      {this.state.enquiryData.records[0].Contact__r.Name.substring(
                        0,
                        22
                      )}
                    </Text>
                  </Button>
                ) : null}

                <View flexDirection="column">
                  {this.state.showModalForOnlyCreatingNewFollowup == true ? (
                    <View>
                      <Text style={styles.dropDownTextLabel}>Remark</Text>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        selectedValue={this.state.remark}
                        onValueChange={this.DropdownRemarkOptions.bind(this)}
                      >
                        <Picker.Item label="-None-" />
                        {this.state.RemarkOptions.map((remark) => {
                          return (
                            <Picker.Item
                              label={remark.label}
                              value={remark.value}
                              key={remark.value}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                  ) : null}
                  {/* <Text style={styles.dropDownTextLabel}>Remark Type</Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.remarkType}
                    onValueChange={this.DropdownRemarkTypeOptions.bind(this)}
                  >
                    <Picker.Item label="--None--" />
                    {this.state.RemarkTypeOptions.map(remarkType => {
                      return (
                        <Picker.Item
                          label={remarkType.label}
                          value={remarkType.value}
                          key={remarkType.value}
                        />
                      );
                    })}
                  </Picker> */}
                  {this.state.showModalForOnlyCreatingNewFollowup == true ? (
                    <View>
                      <Text style={styles.dropDownTextLabel}>Remark Type</Text>
                      <View>
                        {this.state.isRemarkLoading == true ? (
                          <ActivityIndicator
                            size="small"
                            color="#E31837"
                            animating
                          />
                        ) : (
                          <Picker
                            enabled={this.state.RemarkTypeOptions.length > 0}
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            selectedValue={this.state.remarkType}
                            onValueChange={this.DropdownRemarkTypeOptions.bind(
                              this
                            )}
                          >
                            <Picker.Item label="-None-" value="" />
                            {this.state.RemarkTypeOptions.map((remarkType) => {
                              return (
                                <Picker.Item
                                  label={remarkType.key}
                                  value={remarkType.value}
                                  key={remarkType.value}
                                />
                              );
                            })}
                          </Picker>
                        )}
                      </View>
                    </View>
                  ) : null}

                  {this.state.showModalForOnlyCreatingNewFollowup == true ? (
                    <View>
                      <Text style={styles.dropDownTextLabel}>
                        Remark SubType
                      </Text>
                      <View>
                        {this.state.isRemarkSubTypeLoading == true ? (
                          <ActivityIndicator
                            size="small"
                            color="#E31837"
                            animating
                          />
                        ) : (
                          <Picker
                            enabled={this.state.RemarkSubTypeOptions.length > 0}
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            selectedValue={this.state.remarkSubType}
                            onValueChange={this.DropdownRemarkSubTypeOptions.bind(
                              this
                            )}
                          >
                            <Picker.Item label="-None-" value="" />
                            {this.state.RemarkSubTypeOptions.map(
                              (remarkSubType) => {
                                return (
                                  <Picker.Item
                                    label={remarkSubType.key}
                                    value={remarkSubType.value}
                                    key={remarkSubType.value}
                                  />
                                );
                              }
                            )}
                          </Picker>
                        )}

                        <Row style={{ alignItems: "center" }}>
                          <Text>Create new followup :</Text>
                          <RadioButton
                            color="black"
                            value="no"
                            status={
                              this.state.createNewTask ? "checked" : "unchecked"
                            }
                            onPress={() => {
                              this.setState({ createNewTask: true });
                            }}
                          />
                          <Label>Yes</Label>

                          <RadioButton
                            color="black"
                            value="no"
                            status={
                              this.state.createNewTask ? "unchecked" : "checked"
                            }
                            onPress={() => {
                              this.setState({ createNewTask: false });
                            }}
                          />
                          <Label>No</Label>
                        </Row>
                      </View>
                    </View>
                  ) : null}

                  {this.state.createNewTask ? (
                    <View>
                      {this.state.showModalForOnlyCreatingNewFollowup ==
                      false ? (
                        <Button
                          transparent
                          style={{ flexDirection: "row-reverse" }}
                        >
                          <Icon
                            style={{ color: "black", padding: 10 }}
                            name="close"
                            onPress={() => {
                              this.setState({
                                modalVisible: false,
                                createNewTask: false,
                                showModalForOnlyCreatingNewFollowup: true,
                              });
                            }}
                          />
                        </Button>
                      ) : null}

                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: 20,
                          backgroundColor: "gold",
                        }}
                      >
                        Create New Followup
                      </Text>
                      <Text style={styles.dropDownTextLabel}>Subject</Text>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        selectedValue={this.state.subject}
                        onValueChange={this.DropdownSubject.bind(this)}
                      >
                        <Picker.Item label="-None-" />
                        {this.state.SubjectOptions.map((subject) => {
                          return (
                            <Picker.Item
                              label={subject.label}
                              value={subject.value}
                              key={subject.value}
                            />
                          );
                        })}
                      </Picker>
                      <Text style={styles.dropDownTextLabel}>Model</Text>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        selectedValue={this.state.model}
                        onValueChange={this.DropdownModel.bind(this)}
                      >
                        <Picker.Item label="-None-" />
                        {this.state.enquiryData.records[0]
                          .Product_Interests__r != null &&
                          this.state.enquiryData.records[0].Product_Interests__r.records.map(
                            (product, index) => {
                              return (
                                <Picker.Item
                                  label={product.Product_Family_Text__c}
                                  value={product.Product_Family_Text__c}
                                  key={product.Product_Family_Text__c}
                                />
                              );
                            }
                          )}
                      </Picker>
                      <Text style={styles.dropDownTextLabel}>
                        Activity Type
                      </Text>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        selectedValue={this.state.type}
                        onValueChange={this.DropdownType.bind(this)}
                      >
                        <Picker.Item label="-None-" />
                        {this.state.ActivityTypeOptions.map((type) => {
                          return (
                            <Picker.Item
                              label={type.label}
                              value={type.value}
                              key={type.value}
                            />
                          );
                        })}
                      </Picker>
                      <Text style={styles.dropDownTextLabel}>Status</Text>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        selectedValue={this.state.status}
                        onValueChange={this.DropdownStatus.bind(this)}
                      >
                        <Picker.Item label="-None-" />
                        {this.state.TaskStatus.map((status) => {
                          return (
                            <Picker.Item
                              label={status.label}
                              value={status.value}
                              key={status.value}
                            />
                          );
                        })}
                      </Picker>
                      <Row
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Label style={{ color: "black" }}>
                          Select Call Date
                        </Label>
                        <DatePicker
                          defaultDate={new Date()}
                          minimumDate={new Date()}
                          maximumDate={
                            new Date(
                              new Date().getTime() + 15 * 24 * 60 * 60 * 1000
                            )
                          }
                          locale={"en"}
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={false}
                          animationType={"fade"}
                          androidMode={"default"}
                          placeHolderText={
                            <Icon
                              style={{ color: "#E31837" }}
                              name="calendar"
                            />
                          } //"Order Date"
                          textStyle={{ color: "black" }}
                          placeHolderTextStyle={{ color: "#d3d3d3" }}
                          onDateChange={this.setDate}
                          disabled={false}
                        />
                      </Row>
                      <Text style={styles.dropDownTextLabel}>
                        Select Call Time
                      </Text>
                      <Picker
                        mode="dropdown"
                        placeholder="Select Time"
                        placeholderStyle={{ color: "#2874F0" }}
                        note={false}
                        selectedValue={this.state.selectedTimeSlot} // ? this.state.selectedTimeSlot : nextTimeSlot}
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
                        <Picker.Item
                          label="10:15 AM"
                          value="10:15"
                          key="10:15"
                        />
                        <Picker.Item
                          label="10:30 AM"
                          value="10:30"
                          key="10:30"
                        />
                        <Picker.Item
                          label="10:45 AM"
                          value="10:45"
                          key="10:45"
                        />
                        <Picker.Item label="11:00 AM" value="11:0" key="11:0" />
                        <Picker.Item
                          label="11:15 AM"
                          value="11:15"
                          key="11:15"
                        />
                        <Picker.Item
                          label="11:30 AM"
                          value="11:30"
                          key="11:30"
                        />
                        <Picker.Item
                          label="11:45 AM"
                          value="11:45"
                          key="11:45"
                        />

                        <Picker.Item label="12:00 PM" value="12:0" key="12:0" />
                        <Picker.Item
                          label="12:15 PM"
                          value="12:15"
                          key="12:15"
                        />
                        <Picker.Item
                          label="12:30 PM"
                          value="12:30"
                          key="12:30"
                        />
                        <Picker.Item
                          label="12:45 PM"
                          value="12:45"
                          key="12:45"
                        />
                        <Picker.Item label="1:00 PM" value="13:0" key="13:0" />
                        <Picker.Item
                          label="1:15 PM"
                          value="13:15"
                          key="13:15"
                        />
                        <Picker.Item
                          label="1:30 PM"
                          value="13:30"
                          key="13:30"
                        />
                        <Picker.Item
                          label="1:45 PM"
                          value="13:45"
                          key="13:45"
                        />
                        <Picker.Item label="2:00 PM" value="14:0" key="14:0" />
                        <Picker.Item
                          label="2:15 PM"
                          value="14:15"
                          key="14:15"
                        />
                        <Picker.Item
                          label="2:30 PM"
                          value="14:30"
                          key="14:30"
                        />
                        <Picker.Item
                          label="2:45 PM"
                          value="14:45"
                          key="14:45"
                        />
                        <Picker.Item label="3:00 PM" value="15:0" key="15:0" />
                        <Picker.Item
                          label="3:15 PM"
                          value="15:15"
                          key="15:15"
                        />
                        <Picker.Item
                          label="3:30 PM"
                          value="15:30"
                          key="15:30"
                        />
                        <Picker.Item
                          label="3:45 PM"
                          value="15:45"
                          key="15:45"
                        />
                        <Picker.Item label="4:00 PM" value="16:0" key="16:0" />
                        <Picker.Item
                          label="4:15 PM"
                          value="16:15"
                          key="16:15"
                        />
                        <Picker.Item
                          label="4:30 PM"
                          value="16:30"
                          key="16:30"
                        />
                        <Picker.Item
                          label="4:45 PM"
                          value="16:45"
                          key="16:45"
                        />
                        <Picker.Item label="5:00 PM" value="17:0" key="17:0" />
                        <Picker.Item
                          label="5:15 PM"
                          value="17:15"
                          key="17:15"
                        />
                        <Picker.Item
                          label="5:30 PM"
                          value="17:30"
                          key="17:30"
                        />
                        <Picker.Item
                          label="5:45 PM"
                          value="17:45"
                          key="17:45"
                        />
                        <Picker.Item label="6:00 PM" value="18:0" key="18:0" />
                        <Picker.Item
                          label="6:15 PM"
                          value="18:15"
                          key="18:15"
                        />
                        <Picker.Item
                          label="6:30 PM"
                          value="18:30"
                          key="18:30"
                        />
                        <Picker.Item
                          label="6:45 PM"
                          value="18:45"
                          key="18:45"
                        />
                        <Picker.Item label="7:00 PM" value="19:0" key="19:0" />
                        <Picker.Item
                          label="7:15 PM"
                          value="19:15"
                          key="19:15"
                        />
                        <Picker.Item
                          label="7:30 PM"
                          value="19:30"
                          key="19:30"
                        />
                        <Picker.Item
                          label="7:45 PM"
                          value="19:45"
                          key="19:45"
                        />
                        <Picker.Item label="8:00 PM" value="20:0" key="20:0" />
                        <Picker.Item
                          label="8:15 PM"
                          value="20:15"
                          key="20:15"
                        />
                        <Picker.Item
                          label="8:30 PM"
                          value="20:30"
                          key="20:30"
                        />
                        <Picker.Item
                          label="8:45 PM"
                          value="20:45"
                          key="20:45"
                        />
                        <Picker.Item label="9:00 PM" value="21:0" key="21:0" />
                        <Picker.Item
                          label="9:15 PM"
                          value="21:15"
                          key="21:15"
                        />
                        <Picker.Item
                          label="9:30 PM"
                          value="21:30"
                          key="21:30"
                        />
                        <Picker.Item
                          label="9:45 PM"
                          value="21:45"
                          key="21:45"
                        />
                        <Picker.Item label="10:00 PM" value="22:0" key="22:0" />
                        <Picker.Item
                          label="10:15 PM"
                          value="22:15"
                          key="22:15"
                        />
                        <Picker.Item
                          label="10:30 PM"
                          value="22:30"
                          key="22:30"
                        />
                        <Picker.Item
                          label="10:45 PM"
                          value="22:45"
                          key="22:45"
                        />
                        <Picker.Item label="11:00 PM" value="23:0" key="23:0" />
                        <Picker.Item
                          label="11:15 PM"
                          value="23:15"
                          key="23:15"
                        />
                        <Picker.Item
                          label="11:30 PM"
                          value="23:30"
                          key="23:30"
                        />
                        <Picker.Item
                          label="11:45 PM"
                          value="23:45"
                          key="23:45"
                        />
                      </Picker>
                    </View>
                  ) : null}

                  {this.state.onModalSumittingShowLoading == true ? (
                    <ActivityIndicator size="large" color="#E31837" animating />
                  ) : (
                    <Button
                      style={{
                        flexDirection: "row-reverse",
                        backgroundColor: "red",
                        alignSelf: "center",
                        marginTop: 10,
                      }}
                      onPress={() => {
                        this.saveTask();
                      }}
                    >
                      <Text>Ok</Text>
                    </Button>
                  )}
                </View>
              </ScrollView>
            </View>
          </Modal>
        </Container>
      );
    } else {
      //  Show loading... please wait.
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#E31837" size="large" animating />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#E31837",
  },
  dropDownTextLabel: {
    color: "gray",
    fontSize: 12,
  },
  collapse: {
    marginLeft: 20,
  },
  showMoreButton: {
    width: 140,
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 5,
    backgroundColor: "#e53144",
  },
  showLessButton: {
    width: 140,
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 5,
    backgroundColor: "#e53144",
  },
  CustomerName: {
    fontSize: 20,
    fontFamily: "sance-serif",
    fontWeight: "bold",
  },

  inputs: {
    marginBottom: 20,
  },
  modal: {
    alignSelf: "center",
    backgroundColor: "lightgrey",
    height: "60%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: "10%",
  },
  Task: {
    alignSelf: "center",
    backgroundColor: "#fafafa",
    shadowColor: "gray",
    height: "auto",
    width: "99%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "lightgray",
    padding: 10,
  },
  text: {
    color: "#333333",
    marginTop: 10,
  },
});

//  else if(this.state.subject == "") {
//     this.setState({
//       err: true
//     })
//   }
//   else if(this.state.model == "") {
//     this.setState({
//       err: true
//     })
//   }
//   else if(this.state.type == "") {
//     this.setState({
//       err: true
//     })
//   }

//   else if(this.state.status = "") {
//     this.setState({
//       err: true
//     })
//   }
