import React, { Component } from "react";
import { StyleSheet, Vibration, BackHandler } from "react-native";
import aceBookingPickList from "../PicklistHelpers/ACE_BookingPickList";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  DatePicker,
  View,
  Row,
  Label,
  Input,
  Picker,
  Item
} from "native-base";
import { Modal, ScrollView } from "react-native";
import { TextInput, Card } from "react-native-paper";
import { ProgressSteps, ProgressStep } from "../ProgressSteps/index";
import RSAShieldAccessoriesPickList from "../PicklistHelpers/RSAShieldAccessoriesPickList";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.Scheme_Name = React.createRef();
    this.Consumer_Scheme = React.createRef();
    this.Dealer_Discount_Special_Discount = React.createRef();
    this.Mode_Of_Payment = React.createRef();
    this.Expected_EMI = React.createRef();
    this.Exchange_Bonus = React.createRef();
    this.Drawn_On = React.createRef();
    this.Down_Payment = React.createRef();
    this.Cheque_DD_PO_Details = React.createRef();
    this.RSA = React.createRef();
    this.RSAPrice = React.createRef();
    this.Road_Safety_Tax = React.createRef();
    this.Remarks = React.createRef();
    this.Registration_Types = React.createRef();
    this.Registration_Place = React.createRef();
    this.Registration_By = React.createRef();
    this.Registration = React.createRef();
    this.Usage = React.createRef();
    this.Tenure = React.createRef();
    this.Status = React.createRef();
    this.Shield_Warrant = React.createRef();
    this.Shield = React.createRef();
    this.Sales_Type = React.createRef();
    this.Owner_Id = React.createRef();
    this.Otf_No = React.createRef();
    this.Order_ID = React.createRef();
    this.Enquiry_Id = React.createRef();
    this.Zero_Depreciation_Insurance_Cost = React.createRef();
    this.Interest_Rates = React.createRef();
    this.Insurance_Types = React.createRef();
    this.Insurance_Company = React.createRef();
    this.Insurance_By = React.createRef();
    this.Insurance = React.createRef();
    this.Loan_Amount = React.createRef();
    this.Finance_Company = React.createRef();
    this.Finance_Arranged_By = React.createRef();
    this.Mobile_App_Id = React.createRef();
    this.Booking_Name = React.createRef();
    this.Delivery_Location = React.createRef();
    this.Reasons_For_Cancellation = React.createRef();
    this.Price_Type = React.createRef();
    this.Customer_Id = React.createRef();
    this.Booking_Amount = React.createRef();
    this.Amount_Received = React.createRef();
    this.Amount = React.createRef();
    this.Corporate_Bonus = React.createRef();
    this.Tenure = React.createRef();
    this.IncidentalCharges = React.createRef();
    this.RegistrationCharges = React.createRef();
    this.DealerDiscount = React.createRef();
    this.RoadSafetyTaxCharges = React.createRef();
    this.InsuranceCharges = React.createRef();
    this.ZeroDepreciationInsuranceCostCharges = React.createRef();
    this.EnquiryName = React.createRef();
    this.CustomerName = React.createRef();

    this.state = {
      Scheme_Name_state_var: "",
      Consumer_Scheme_state_var: "",
      Dealer_Discount_Special_Discount_state_var_state_var: "",
      Mode_Of_Payment_state_var: "",
      Expected_EMI_state_var: "",
      Exchange_Bonus_state_var: "",
      Drawn_On_state_var: "",
      Down_Payment_state_var: "",
      Cheque_DD_PO_Details_state_var: "",
      RSA_state_var: "",
      Road_Safety_Tax_state_var: "",
      Remarks_state_var: "",
      Registration_Types_state_var: "",
      Registration_Place_state_var: "",
      Registration_By_state_var: "",
      Registration_state_var: "",
      Usage_state_var: "",
      Tenure_state_var: "",
      Status_state_var: "",
      Shield_Warrant_state_var: "",
      Shiel_state_var: "",
      Sales_Type_state_var: "",
      Owner_Id_state_var: "",
      Otf_No_state_var: "",
      Order_ID_state_var: "",
      Enquiry_Id_state_var: "",
      Zero_Depreciation_Insurance_Cost_state_var: "",
      Interest_Rates_state_var: "",
      Insurance_Types_state_var: "",
      Insurance_Company_state_var: "",
      Insurance_By_state_var: "",
      Insurance_state_var: "",
      Loan_Amount_state_var: "",
      Finance_Company_state_var: "",
      Finance_Arranged_By_state_var: "",
      Mobile_App_Id_state_var: "",
      Booking_Name_state_var: "",
      Delivery_Location_state_var: "",
      Reasons_For_Cancellation_state_var: "",
      Price_Type_state_var: "",
      Customer_Id_state_var: "",
      Booking_Amount_state_var: "",
      Amount_Received_state_var: "",
      Amount_state_var: "",
      Corporate_Bonus_state_var: "",
      Stage: "",
      ReasonForCancellation: "",
      RegistrationBy: "",
      RegistrationType: "",
      SelectModel: " ",
      isVisible: false,
      RSA: "",
      Shield: "",
      Accessory: "",
      ExchangeShowRoomPrice: "",
      TndCModal: "",
      RSAPrice: "",
      ShieldPrice: "",
      AccessoryPrice: "",
      rsa1: [],
      rsa2: [],
      shield1: [],
      shield2: [],
      accessory1: [],
      accessory2: [],
      priceErrs : false,

      
      IncidentalCharges : "",
      RegistrationCharges : "",
      DealerDiscount : "",
      RoadSafetyTaxCharges : "",
      IncidentalCharges : "",
      ZeroDepreciationInsuranceCostCharges : "",

      registration : "",
      registrationPlace : "",
      remark : "",
      shield : "",
      financeArrengedBy : "",
      financeCompany : "",
      loanAmount : "",
      tenure : "",
      interestRate : "",
      expectedEMI : "",
      ShieldWarranty : "",

      checkDDPODetails : "",
      bookingAmount : "",
      amountReceived : "",
      downPayment : "",
      orderDate : "",
      customerExpectedDeliveryDate : "",

      bookingStepHasError : true,
      PriceStepHasError : true,
      AddOnsStepHasError : true,
      InsuranceStepHasError : true,
      FinanceStepHasError : true,



    };
    // HANDELING HARDWARE BACK BUTTON CONTROL

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.setDateForOrderDate = this.setDateForOrderDate.bind(this);
    this.setDateForCustomerExpectedDeliveryDate = this.setDateForCustomerExpectedDeliveryDate.bind(this);
    // ................................................
  }

//   GetIncidentalValidate = () => {
//       if (this.state.IncidentalCharges == "") {
//         this.setState({
//           IncidentalValidate: "Name doesn't be empty"
//         });
//       } else {
//         this.setState({
//           IncidentalValidate: ""
//         });
//       }
//   }

//   GetRegistrationValidate = () => {
//     if (this.state.RegistrationCharges == "") {
//       this.setState({
//         RegistrationValidate: "Name doesn't be empty"
//       });
//     } else {
//       this.setState({
//         RegistrationValidate: ""
//       });
//     }
// }

// GetDealerValidate= () => {
//   if (this.state.DealerDiscount == "") {
//     this.setState({
//       DealerValidate: "Name doesn't be empty"
//     });
//   } else {
//     this.setState({
//       DealerValidate: ""
//     });
//   }
// }

// GetRoadSaftyValidate = () => {
//   if (this.state.RoadSafetyTaxCharges == "") {
//     this.setState({
//       RoadSafetyValidate: "Name doesn't be empty"
//     });
//   } else {
//     this.setState({
//       RoadSafetyValidate: ""
//     });
//   }
// }

// GetInsuranceValidate = () => {
//   if (this.state.InsuranceCharges == "") {
//     this.setState({
//       InsuranceValidate: "Name doesn't be empty"
//     });
//   } else {
//     this.setState({
//       InsuranceValidate: ""
//     });
//   }
// }

// GetZeroDepreciationValidate = () => {
//   if (this.state.ZeroDepreciationInsuranceCostCharges == "") {
//     this.setState({
//       ZeroDepreciationInsuranceCostValidate: "Name doesn't be empty"
//     });
//   } else {
//     this.setState({
//       ZeroDepreciationInsuranceCostValidate: ""
//     });
//   }
// }

// PriceValidation = () => {
//   this.setState({
//     priceErrs : false
//   })
//   if (
//     this.state.IncidentalCharges == "" ||
//     this.state.RegistrationCharges == "" ||
//     this.state.DealerDiscount == "" ||
//     this.state.RoadSafetyTaxCharges == "" ||
//     this.state.InsuranceCharges == "" ||
//     this.state.ZeroDepreciationInsuranceCostCharges == ""
//   ) {
//     this.setState({
//       priceErrs: true
//     });
//   } else {
//     priceErrs: false;
//   }
// };
setDateForOrderDate(newDate) {
  this.setState({ orderDate : newDate });
}

setDateForCustomerExpectedDeliveryDate(newDate) {
  this.setState({ customerExpectedDeliveryDate : newDate });
}

validateFinanceStep = () => {
  if(!this.state.registration) {
    alert('Please fill registration field'); return;
  } else if(!this.state.RegistrationBy) {
    alert('Please select Registration By'); return;
  } else if(!this.state.registrationPlace) {
    alert('Please select Registration Place'); return;
  } else if(!this.state.RegistrationType) {
    alert('Please select Registration Type'); return;
  } else if(!this.state.remark) {
    alert('Please fill Remark'); return;
  } else if(!this.state.shield) {
    alert('Please fill Shield'); return;
  } else if(!this.state.ShieldWarranty) {
    alert('Please select Shield Warranty'); return;
  } else if(!this.state.financeArrengedBy) {
    alert('Please fill Finance Arrenged By'); return;
  } else if(!this.state.financeCompany) {
    alert('Please fill finance company'); return;
  } else if(!this.state.loanAmount) {
    alert('Please enter loan Amount'); return;
  } else if(!this.state.tenure) {
    alert('Please enter Tenure'); return;
  } else if(!this.state.interestRate) {
    alert('Please enter Interest Rate'); return;
  } else if(!this.state.expectedEMI) {
    alert('Please enter Expected EMI'); return;
  } else {
    this.setState({
      FinanceStepHasError : false
    })
  }
}

validateInsuranceStep = () => {
  if(!this.state.IncidentalCharges) {
    alert("Enter Incidental charges"); return;
  } else if(!this.state.RegistrationCharges) {
    alert("Enter Registration charges"); return;
  } else if(!this.state.DealerDiscount) {
    alert("Enter Dealer Discount"); return;
  } else if(!this.state.RoadSafetyTaxCharges) {
    alert("Enter Road Safty Tax Charges"); return;
  } else if(!this.state.InsuranceCharges) {
    alert("Enter Insurance charges"); return;
  } else if(!this.state.ZeroDepreciationInsuranceCostCharges) {
    alert("Enter Zero Depreciation Insurance Cost charges"); return;
  } else{
    this.setState({
      InsuranceStepHasError : false
    })
  }
}

validateAddOnsStep = () => {
  if(!this.state.RSA) {
    alert('Please select RSA'); return;
  } else if(!this.state.shield) {
    alert('Please select Shield'); return;
  }
  else if(!this.state.Accessory) {
    alert('Please select Accessory'); return;
  } else {
    this.setState({
      AddOnsStepHasError : false
    })
  }
}

validatePriceStep = () => {
  if(!this.state.IncidentalCharges) {
    alert("Enter Incidental charges"); return;
  } else if(!this.state.RegistrationCharges) {
    alert("Enter Registration charges"); return;
  } else if(!this.state.DealerDiscount) {
    alert("Enter Dealer Discount"); return;
  } else if(!this.state.RoadSafetyTaxCharges) {
    alert("Enter Road Safty Tax Charges"); return;
  } else if(!this.state.InsuranceCharges) {
    alert("Enter Insurance charges"); return;
  } else if(!this.state.ZeroDepreciationInsuranceCostCharges) {
    alert("Enter Zero Depreciation Insurance Cost charges"); return;
  } else{
    this.setState({
      PriceStepHasError : false
    })
  }
}

validateBookingStep = () => {
  if(!this.state.orderDate) {
    alert('Please select Order Date'); return;
  } else if(!this.state.Stage) {
    alert('Please select stage'); return;
  } else if(this.state.ModeOfPayment) {
    alert('Please select Payment Mode'); return;
  } else if(!this.state.checkDDPODetails) {
    alert('Please enter check DD PO Details'); return;
  } else if(!this.state.bookingAmount) {
    alert('Please enter Booking Amount'); return;
  } else if(!this.state.amountReceived) {
    alert('Please enter Amount Received'); return;
  } else if(!this.state.downPayment) {
    alert('Please enter Down Payment'); return;
  } else if(!this.state.customerExpectedDeliveryDate) {
    alert('Please select Customer Expected Delivery Date'); return;
  } else if(!this.state.Delivery_Location_state_var) {
    alert('Please select Delivery Location'); return;
  } else {
    this.setState({
      bookingStepHasError : false
    })
  }
}

  // HANDELING HARDWARE BACK BUTTON CONTROL

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  DropdownStage(value) {
    this.setState({
      Stage: value
    });
  }

  DropdownReasonForCancellation(value) {
    this.setState({
      ReasonForCancellation: value
    });
  }
  handleBackButtonClick() {
    this.props.navigation.navigate("Home");
    return true;
  }
  // ----------------------------------------------------------

  DropdownDelivery_Location(value) {
    this.setState({
      Delivery_Location_state_var: value
    });
  }
  DropdownOrder_Id(value) {
    this.setState({
      Order_ID_state_var: value
    });
  }
  DropdownShieldWarranty(value) {
    this.setState({
      ShieldWarranty: value
    });
  }
  DropdownMode_Of_Payment(value) {
    this.setState({
      Mode_Of_Payment_state_var: value
    });
  }

  DropdownRegistrationBy(value) {
    this.setState({
      RegistrationBy: value
    });
  }

  DropdownRegistrationType(value) {
    this.setState({
      RegistrationType: value
    });
  }

  DropdownSelectModel(value) {
    this.setState({
      SelectModel: value
    });
  }

  DropdownRSA(value) {
    this.setState({
      RSA: value
    });
  }

  DropdownShield(value) {
    this.setState({
      Shield: value
    });
  }

  DropdownAccessory(value) {
    this.setState({
      Accessory: value
    });
  }


  render() {
    const data = aceBookingPickList();
    const dataa = RSAShieldAccessoriesPickList();

    for (var i = 0; i < dataa.records.length; i++) {
      if (dataa.records[i].Name == "Test RSA 2") {
        this.state.rsa1.push(dataa.records[i].UnitPrice);
      }
      if (dataa.records[i].Name == "Test RSA") {
        this.state.rsa2.push(dataa.records[i].UnitPrice);
      }
      if (dataa.records[i].Name == "Test Shield") {
        this.state.rsa1.push(dataa.records[i].UnitPrice);
      }
      if (dataa.records[i].Name == "Test Shield 2") {
        this.state.rsa2.push(dataa.records[i].UnitPrice);
      }
      if (dataa.records[i].Name == "Test Acc 1") {
        this.state.rsa1.push(dataa.records[i].UnitPrice);
      }
      if (dataa.records[i].Name == "Test Acc 2") {
        this.state.rsa2.push(dataa.records[i].UnitPrice);
      }
    }

    return (
      <Container>
        <Header style={{ backgroundColor: "#E31837" }} androidStatusBarColor="#A31837">
          <Left>
            <Button transparent>
              <Icon
                style={{ color: "white" }}
                name="md-arrow-back"
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body>
            <Text
              style={{
                color: "white",
                fontFamily: "barlow",
                fontWeight: "bold"
              }}
            >
              Booking
            </Text>
          </Body>
          <Right />
        </Header>
        <ProgressSteps
          disabledStepNumColor="black"
        >
          <ProgressStep label="Booking"
          onNext={this.validateBookingStep}
          errors={this.state.bookingStepHasError}>
            <View style={styles.EnquiryProgressStepForUser}>
              <View
                style={{
                  borderWidth: 1,
                  margin: "5%",
                  borderColor: "#00000000",
                  borderRadius: 10,
                  elevation: 1,
                  backgroundColor: "#E3DFCE"
                }}
              >
                <View style={{ border: 20, margin: 20 }}>
                  <Row
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Label style={{ color: "black" }}>Order Date :</Label>
                    <DatePicker
                      defaultDate={new Date()}
                      minimumDate={new Date()}
                      maximumDate={new Date(2020, 12, 31)}
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
                      onDateChange={this.setDateForOrderDate}
                      disabled={false}
                    />
                  </Row>

                  <Text style={styles.dropDownTextLabel}>Stage</Text>
                  <Picker
                    label="Stage"
                    onChangeText={text => this.setState({ text })}
                    ref={this.Delivery_Location}
                    returnKeyType="next"
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.Stage}
                    onValueChange={this.DropdownStage.bind(this)}
                  >
                    <Picker.Item label="-None-" value="" />
                    {data.Stage__c.map(Stage => {
                      return <Picker.Item label={Stage} value={Stage} />;
                    })}
                  </Picker>

                  <Row
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    {/* <Label style = {{color : 'black'}}>Booking Date :</Label>
                    <DatePicker
                      defaultDate={new Date(2020, 4, 4)}
                      minimumDate={new Date(2020, 1, 1)}
                      maximumDate={new Date(2020, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText={<Icon style = {{color : '#E31837'}} name = 'calendar' />} //"Booking Date"
                      textStyle={{ color: "black" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={this.setDate}
                      disabled={false}
                      onSubmitEditing={() => this.a.current.focus()}
                    /> */}
                  </Row>

                  <Text style={styles.dropDownTextLabel}>Mode Of Payment</Text>
                  <Picker //1
                    label="Mode Of Payment"
                    onChangeText={text => this.setState({ text })}
                    ref={this.Delivery_Location}
                    returnKeyType="next"
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.Mode_Of_Payment_state_var}
                    onSubmitEditing={() =>
                      this.Dealer_Discount_Special_Discount.current.focus()
                    }
                    onValueChange={this.DropdownMode_Of_Payment.bind(this)}
                  >
                    <Picker.Item label="-None-" value="" />
                    {data.Mode_OF_Payment__c.map(ModeOfPayment => {
                      return (
                        <Picker.Item
                          label={ModeOfPayment}
                          value={ModeOfPayment}
                        />
                      );
                    })}
                  </Picker>

                  <TextInput //1
                    style={styles.inputs}
                    label="Cheque DD PO Details"
                    mode="outlined"
                    value={this.state.checkDDPODetails}
                    onChangeText={checkDDPODetails => this.setState({ checkDDPODetails })}
                    ref={this.Booking_Amount}
                    onSubmitEditing={() => this.Booking_Amount.current.focus()}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    keyboardType="number-pad"
                    label="Booking Amount"
                    mode="outlined"
                    value={this.state.bookingAmount}
                    onChangeText={bookingAmount => this.setState({ bookingAmount })}
                    ref={this.Booking_Amount}
                    onSubmitEditing={() => this.Amount_Received.current.focus()}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    keyboardType="number-pad"
                    label="Amount Received"
                    mode="outlined"
                    value={this.state.amountReceived}
                    onChangeText={amountReceived => this.setState({ amountReceived })}
                    ref={this.Amount_Received}
                    onSubmitEditing={() => this.Down_Payment.current.focus()}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput //1
                    style={styles.inputs}
                    keyboardType="number-pad"
                    label="Down Payment"
                    mode="outlined"
                    value={this.state.downPayment}
                    onChangeText={downPayment => this.setState({ downPayment })}
                    ref={this.Down_Payment}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <Label style={{ color: "black" }}>
                    Customer Expected Delivery Date :
                  </Label>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    maximumDate={new Date(2020, 12, 31)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText={
                      <Icon style={{ color: "#E31837" }} name="calendar" />
                    } //"Customer Expected Delivery Date"
                    textStyle={{ color: "black" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this.setDateForCustomerExpectedDeliveryDate}
                    disabled={false}
                  />

                  {/* <Picker //2
                    label="Reason For Cancellation"
                    onChangeText={text => this.setState({ text })}
                    ref={this.Insurance_Types}
                    returnKeyType="next"
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    onSubmitEditing={() => this.Interest_Rates.current.focus()}
                    selectedValue={this.state.ReasonForCancellation}
                    onValueChange={this.DropdownReasonForCancellation.bind(
                      this
                    )}
                  >
                    <Picker.Item label="Reason for cancellation" />
                    {data.Reasons_For_Cancellation__c.map((ReasonForCancellation) => {
                    return (<Picker.Item label={ReasonForCancellation} value={ReasonForCancellation} />);
                    })}
                  </Picker> */}

                  <Text style={styles.dropDownTextLabel}>
                    Delivery Location
                  </Text>
                  <Picker
                    label="Delivery Location"
                    onChangeText={text => this.setState({ text })}
                    ref={this.Delivery_Location}
                    returnKeyType="next"
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.Delivery_Location_state_var}
                    onValueChange={this.DropdownDelivery_Location.bind(this)}
                  >
                    <Picker.Item label="-None-" value="" />
                    <Picker.Item label=" Delivery Location1" value="key1" />
                    <Picker.Item label="Delivery Location2" value="key2" />
                    <Picker.Item label="Delivery Location3" value="key3" />
                    <Picker.Item label="Delivery Location4" value="key4" />
                  </Picker>
                  <View style={{ alignSelf: "center" }}>
                    <Button transparent>
                      <Icon
                        style={{ color: "#E31837" }}
                        name="add"
                        title="Add new address"
                        onPress={() => {
                          this.setState({ isVisible: true });
                        }}
                      />
                    </Button>
                  </View>

                  <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                      console.log("Modal has been closed.");
                    }}
                  >
                    {/*All views of Modal*/}
                    <View style={styles.modal}>
                      <View style={{ flex: 1, padding: 10 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                          <Button
                            transparent
                            style={{ flexDirection: "row-reverse" }}
                            onPress={() => {
                              this.setState({
                                isVisible: !this.state.isVisible
                              });
                            }}
                          >
                            <Icon style={{ color: "black" }} name="close" />
                          </Button>
                          <TextInput
                            style={styles.inputs}
                            type="outlined"
                            label="Postal Code"
                            value={this.state.PostalCode}
                            onChangeText={PostalCode =>
                              this.setState({ PostalCode })
                            }
                            mode="outlined"
                            keyboardType="number-pad"
                            maxLength={6}
                            ref={this.PostalCode}
                            onSubmitEditing={() => this.State.current.focus()}
                            blurOnSubmit={false}
                            theme={{
                              colors: {
                                primary: "#272727",
                                underlineColor: "transparent"
                              }
                            }}
                          />

                          <TextInput
                            style={styles.inputs}
                            type="outlined"
                            label="State"
                            value={this.state.State}
                            onChangeText={State => this.setState({ State })}
                            mode="outlined"
                            returnKeyType="next"
                            ref={this.State}
                            onSubmitEditing={() => this.City.current.focus()}
                            blurOnSubmit={false}
                            theme={{
                              colors: {
                                primary: "#272727",
                                underlineColor: "transparent"
                              }
                            }}
                          />

                          <TextInput
                            style={styles.inputs}
                            type="outlined"
                            label="City"
                            value={this.state.City}
                            onChangeText={City => this.setState({ City })}
                            mode="outlined"
                            returnKeyType="next"
                            ref={this.City}
                            onSubmitEditing={() =>
                              this.GoToStreet.current.focus()
                            }
                            blurOnSubmit={false}
                            theme={{
                              colors: {
                                primary: "#272727",
                                underlineColor: "transparent"
                              }
                            }}
                          />

                          <TextInput
                            style={styles.inputs}
                            type="outlined"
                            label="Street"
                            value={this.state.Street}
                            onChangeText={Street => this.setState({ Street })}
                            ref={this.GoToStreet}
                            onSubmitEditing={() => this.City.current.focus()}
                            mode="outlined"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            theme={{
                              colors: {
                                primary: "#272727",
                                underlineColor: "transparent"
                              }
                            }}
                          />
                          <Button
                            style={{
                              alignContent: "center",
                              alignSelf: "center",
                              backgroundColor: "#E31837",
                              marginTop: 10
                            }}
                          >
                            <Text>Submit</Text>
                          </Button>
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>

                  {/* <Picker
                    label="Delivery Location"
                    onChangeText={text => this.setState({ text })}
                    ref={this.Delivery_Location}
                    returnKeyType="next"
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.SelectModel}
                    onValueChange={this.DropdownSelectModel.bind(this)}
                  >
                    <Picker.Item label="SElect Model" />
                    <Picker.Item label="Model 1" value="Model 1" />
                    <Picker.Item label="Model 2" value="Model 2" />
                    <Picker.Item label="Model 3" value="Model 3" />
                    <Picker.Item label="Model 4" value="Model 4" />
                  </Picker> */}
                </View>
              </View>
            </View>
            {/* </Card > */}
          </ProgressStep>

          <ProgressStep label="Price"
          onNext = {this.validatePriceStep}
          errors = {this.state.PriceStepHasError}>
            <View style={styles.EnquiryProgressStepForUser}>
              <View
                style={{
                  borderWidth: 1,
                  margin: 20,
                  borderColor: "#00000000",
                  borderRadius: 10,
                  elevation: 1,
                  backgroundColor: "#E3DFCE"
                }}
              >
                <View style={{ border: 20, margin: 20 }}>
                  <TextInput
                    disabled
                    style={styles.inputs}
                    type="outlined"
                    label="Model"
                    value={this.state.Model}
                    onChangeText={Model => this.setState({ Model })}
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="number-pad"
                    ref={this.GoToIncidentalCharges}
                    onSubmitEditing={() =>
                      this.RegistrationCharges.current.focus()
                    }
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                    onBlur={() => {
                      this.GetValidate();
                    }}
                  />

                  <TextInput
                  disabled
                    style={styles.inputs}
                    type="outlined"
                    label="Exchange Showroom Price"
                    value={this.state.ExchangeShowRoomPrice}
                    onChangeText={ExchangeShowRoomPrice =>
                      this.setState({ ExchangeShowRoomPrice })
                    }
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="number-pad"
                    ref={this.GoToExchangeShowRoomPrice}
                    onSubmitEditing={() =>
                      this.IncidentalCharges.current.focus()
                    }
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Incidental Charges *"
                    value={this.state.IncidentalCharges}
                    onChangeText={IncidentalCharges =>
                      this.setState({ IncidentalCharges })
                    }
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="number-pad"
                    ref={this.GoToIncidentalCharges}
                    onSubmitEditing={() =>
                      this.RegistrationCharges.current.focus()
                    }
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Registration Charges *"
                    value={this.state.RegistrationCharges}
                    onChangeText={RegistrationCharges =>
                      this.setState({ RegistrationCharges })
                    }
                    mode="outlined"
                    keyboardType="number-pad"
                    returnKeyType="next"
                    ref={this.RegistrationCharges}
                    onSubmitEditing={() => this.DealerDiscount.current.focus()}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Dealer Discount *"
                    value={this.state.DealerDiscount}
                    onChangeText={DealerDiscount =>
                      this.setState({ DealerDiscount })
                    }
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="number-pad"
                    ref={this.DealerDiscount}
                    blurOnSubmit={false}
                    onSubmitEditing={() =>
                      this.RoadSafetyTaxCharges.current.focus()
                    }
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Road Safety Tax Charges *"
                    value={this.state.RoadSafetyTaxCharges}
                    onChangeText={RoadSafetyTaxCharges =>
                      this.setState({ RoadSafetyTaxCharges })
                    }
                    mode="outlined"
                    keyboardType="number-pad"
                    maxLength={10}
                    returnKeyType="next"
                    ref={this.RoadSafetyTaxCharges}
                    onSubmitEditing={() =>
                      this.InsuranceCharges.current.focus()
                    }
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Insurance Charges *"
                    value={this.state.InsuranceCharges}
                    onChangeText={InsuranceCharges =>
                      this.setState({ InsuranceCharges })
                    }
                    mode="outlined"
                    keyboardType="number-pad"
                    maxLength={10}
                    returnKeyType="next"
                    ref={this.InsuranceCharges}
                    onSubmitEditing={() =>
                      this.ZeroDepreciationInsuranceCostCharges.current.focus()
                    }
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Zero Depreciation Insurance Cost Charges *"
                    value={this.state.ZeroDepreciationInsuranceCostCharges}
                    onChangeText={ZeroDepreciationInsuranceCostCharges =>
                      this.setState({ ZeroDepreciationInsuranceCostCharges })
                    }
                    mode="outlined"
                    keyboardType="number-pad"
                    maxLength={10}
                    returnKeyType="next"
                    ref={this.ZeroDepreciationInsuranceCostCharges}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  {/* <Row
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    <Label>Loyalty Bonus</Label>
                    <DatePicker //2  textinput
                      defaultDate={new Date(2020, 4, 4)}
                      minimumDate={new Date(2020, 1, 1)}
                      maximumDate={new Date(2020, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      keyboardType={<Icon style = {{color : '#E31837'}} name = 'calendar' />} //"number-pad"
                      label="Loyalty Bonus"
                      mode="outlined"
                      blurOnSubmit={false}
                      onChangeText={text => this.setState({ text })}
                    />
                  </Row> */}
                </View>
              </View>
            </View>
            {/* </Card> */}
          </ProgressStep>

          <ProgressStep label="Add Ons"
          onNext = {this.validateAddOnsStep}
          errors = {this.state.AddOnsStepHasError}>
            {/* <Card style={{ marginTop: 10, alignItems: 'center', marginRight: 10, marginLeft: 10, shadowColor: '#cccccc', shadowRadius: 10 }}> */}
            <View style={styles.EnquiryProgressStepForUser}>
              <View
                style={{
                  borderWidth: 1,
                  margin: 20,
                  borderColor: "#00000000",
                  borderRadius: 10,
                  elevation: 1,
                  backgroundColor: "#E3DFCE"
                }}
              >
                <View style={{ border: 20, margin: 20 }}>
                  <Item picker style={{ flexDirection: "row" }}>
                    <Label style={{ flex: 1 }}>RSA : </Label>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.RSA}
                      onValueChange={this.DropdownRSA.bind(this)}
                    >
                      {/* <Picker.Item label="RSA" /> */}
                      {dataa.records.map(RSA => {
                        
                        if (RSA.Product2.Type__c == "RSA")
                          return (
                            <Picker.Item
                              label={RSA.Product2.Name}
                              value={RSA.Product2.Name}
                            />
                          );
                      })}
                    </Picker>
                  </Item>

                  <TextInput //2
                  disabled
                    style={styles.inputs}
                    keyboardType="number-pad"
                    label="RSA Price"
                    mode="outlined"
                    ref={this.RSAPrice}
                    onChangeText={RSAPrice => this.setState({ RSAPrice })}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <Item picker style={{ flexDirection: "row" }}>
                    <Label style={{ flex: 1 }}>Shield : </Label>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.Shield}
                      onValueChange={this.DropdownShield.bind(this)}
                    >
                      {/* <Picker.Item label="Shield" /> */}
                      {dataa.records.map(Shield => {
                        if (Shield.Product2.Type__c == "Shield")
                          return (
                            <Picker.Item
                              label={Shield.Product2.Name}
                              value={Shield.Product2.Name}
                            />
                          );
                      })}
                    </Picker>
                  </Item>

                  <TextInput //2
                  disabled
                  disabled
                    style={styles.inputs}
                    keyboardType="number-pad"
                    label="Shield Price"
                    mode="outlined"
                    ref={this.ShieldPrice}
                    onChangeText={ShieldPrice => this.setState({ ShieldPrice })}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <Item picker style={{ flexDirection: "row" }}>
                    <Label style={{ flex: 1 }}>Accessories : </Label>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.Accessory}
                      onValueChange={this.DropdownAccessory.bind(this)}
                    >
                      {/* <Picker.Item label="Accessories" /> */}
                      {dataa.records.map(Accessories => {
                        if (Accessories.Product2.Type__c == "Accessories")
                          return (
                            <Picker.Item
                              label={Accessories.Product2.Name}
                              value={Accessories.Product2.Name}
                            />
                          );
                      })}
                    </Picker>
                  </Item>

                  <TextInput //2
                    style={styles.inputs}
                    keyboardType="number-pad"
                    label="Accessories Price"
                    mode="outlined"
                    ref={this.AccessoryPrice}
                    onChangeText={AccessoryPrice =>
                      this.setState({ AccessoryPrice })
                    }
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </ProgressStep>

          <ProgressStep
            label="Insurance"
            onNext={this.validateInsuranceStep}
            errors={this.state.InsuranceStepHasError}
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
                  backgroundColor: "#E3DFCE"
                }}
              >
                <View style={{ border: 20, margin: 20 }}>
                  <TextInput
                    disabled
                    style={styles.inputs}
                    type="outlined"
                    label="Model"
                    value={this.state.Model}
                    onChangeText={Model => this.setState({ Model })}
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="number-pad"
                    ref={this.GoToIncidentalCharges}
                    onSubmitEditing={() =>
                      this.RegistrationCharges.current.focus()
                    }
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    disabled
                    style={styles.inputs}
                    type="outlined"
                    label="Exchange Showroom Price"
                    value={this.state.ExchangeShowRoomPrice}
                    onChangeText={ExchangeShowRoomPrice =>
                      this.setState({ ExchangeShowRoomPrice })
                    }
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="number-pad"
                    ref={this.GoToIncidentalCharges}
                    onSubmitEditing={() =>
                      this.RegistrationCharges.current.focus()
                    }
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Incidental Charges *"
                    value={this.state.IncidentalCharges}
                    onChangeText={IncidentalCharges =>
                      this.setState({ IncidentalCharges })
                    }
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="number-pad"
                    ref={this.GoToIncidentalCharges}
                    onSubmitEditing={() =>
                      this.RegistrationCharges.current.focus()
                    }
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Registration Charges *"
                    value={this.state.RegistrationCharges}
                    onChangeText={RegistrationCharges =>
                      this.setState({ RegistrationCharges })
                    }
                    mode="outlined"
                    keyboardType="number-pad"
                    returnKeyType="next"
                    ref={this.RegistrationCharges}
                    onSubmitEditing={() => this.DealerDiscount.current.focus()}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Dealer Discount *"
                    value={this.state.DealerDiscount}
                    onChangeText={DealerDiscount =>
                      this.setState({ DealerDiscount })
                    }
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="number-pad"
                    ref={this.DealerDiscount}
                    onSubmitEditing={() =>
                      this.RoadSafetyTaxCharges.current.focus()
                    }
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Road Safety Tax Charges *"
                    value={this.state.RoadSafetyTaxCharges}
                    onChangeText={RoadSafetyTaxCharges =>
                      this.setState({ RoadSafetyTaxCharges })
                    }
                    mode="outlined"
                    keyboardType="number-pad"
                    returnKeyType="next"
                    ref={this.RoadSafetyTaxCharges}
                    onSubmitEditing={() =>
                      this.InsuranceCharges.current.focus()
                    }
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Insurance Charges *"
                    value={this.state.InsuranceCharges}
                    onChangeText={InsuranceCharges =>
                      this.setState({ InsuranceCharges })
                    }
                    mode="outlined"
                    keyboardType="number-pad"
                    maxLength={10}
                    returnKeyType="next"
                    ref={this.InsuranceCharges}
                    onSubmitEditing={() =>
                      this.ZeroDepreciationInsuranceCostCharges.current.focus()
                    }
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Zero Depreciation Insurance Cost Charges *"
                    value={this.state.ZeroDepreciationInsuranceCostCharges}
                    onChangeText={ZeroDepreciationInsuranceCostCharges =>
                      this.setState({ ZeroDepreciationInsuranceCostCharges })
                    }
                    mode="outlined"
                    keyboardType="number-pad"
                    returnKeyType="next"
                    ref={this.ZeroDepreciationInsuranceCostCharges}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />
                </View>
              </View>
            </View>
            {/* </Card> */}
          </ProgressStep>

          <ProgressStep label="Finance"
          onSubmit={this.validateFinanceStep}
          errors={this.state.FinanceStepHasError}>
            <View style={styles.EnquiryProgressStepForUser}>
              <View
                style={{
                  borderWidth: 1,
                  margin: 20,
                  borderColor: "#00000000",
                  borderRadius: 10,
                  elevation: 1,
                  backgroundColor: "#E3DFCE"
                }}
              >
                <View style={{ border: 20, margin: 20 }}>
                  <Text style={{ marginBottom: "5%", fontSize: 20 }}>
                    Registration
                  </Text>
                  <TextInput //3
                  returnKeyType="next"
                    style={styles.inputs}
                    keyboardType="number-pad"
                    label="Registration"
                    mode="outlined"
                    value={this.state.registration}
                    onChangeText={registration => this.setState({ registration })}
                    ref={this.Registration}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <Text style={styles.dropDownTextLabel}>Registration By</Text>
                  <Picker //2
                    label="Registration By"
                    onChangeText={text => this.setState({ text })}
                    ref={this.Insurance_Types}
                    returnKeyType="next"
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    onSubmitEditing={() =>
                      this.Registration_Place.current.focus()
                    }
                    selectedValue={this.state.RegistrationBy}
                    onValueChange={this.DropdownRegistrationBy.bind(this)}
                  >
                    {data.Registration_By__c.map(RegistrationBy => {
                      return (
                        <Picker.Item
                          label={RegistrationBy}
                          value={RegistrationBy}
                        />
                      );
                    })}
                  </Picker>

                  <TextInput //3
                  returnKeyType="next"
                    style={styles.inputs}
                    label="Registration Place"
                    mode="outlined"
                    value={this.state.registrationPlace}
                    onChangeText={registrationPlace => this.setState({ registrationPlace })}
                    ref={this.Registration_Place}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <Text style={styles.dropDownTextLabel}>
                    Registration Types
                  </Text>
                  <Picker //2
                    label="Registration Types"
                    onChangeText={text => this.setState({ text })}
                    ref={this.Insurance_Types}
                    returnKeyType="next"
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    onSubmitEditing={() => this.Interest_Rates.current.focus()}
                    selectedValue={this.state.RegistrationType}
                    onValueChange={this.DropdownRegistrationType.bind(this)}
                  >
                    {data.Registration_Types__c.map(RegistrationType => {
                      return (
                        <Picker.Item
                          label={RegistrationType}
                          value={RegistrationType}
                        />
                      );
                    })}
                  </Picker>
                  <TextInput //3
                    style={styles.inputs}
                    label="Remarks"
                    mode="outlined"
                    value={this.state.remark}
                    onChangeText={remark => this.setState({ remark })}
                    ref={this.Remarks}
                    onSubmitEditing={() => this.Shield.current.focus()}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput //3
                  returnKeyType="next"
                    style={styles.inputs}
                    keyboardType="number-pad"
                    label="Shield"
                    mode="outlined"
                    value={this.state.shield}
                    onChangeText={shield => this.setState({ shield })}
                    ref={this.Shield}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <Text style={styles.dropDownTextLabel}>Shield Warranty</Text>
                  <Picker //2
                    label="Shield Warranty"
                    onChangeText={text => this.setState({ text })}
                    ref={this.Insurance_Types}
                    returnKeyType="next"
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.ShieldWarranty}
                    onValueChange={this.DropdownShieldWarranty.bind(this)}
                  >
                    {data.Shield_Warranty__c.map(ShieldWarranty => {
                      return (
                        <Picker.Item
                          label={ShieldWarranty}
                          value={ShieldWarranty}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  margin: 20,
                  borderColor: "#00000000",
                  borderRadius: 10,
                  elevation: 1,
                  backgroundColor: "#E3DFCE"
                }}
              >
                <View style={{ border: 20, margin: 20 }}>
                  <Text style={{ marginBottom: "5%", fontSize: 20 }}>
                    Finance
                  </Text>
                  <TextInput //4
                  returnKeyType="next"
                    style={styles.inputs}
                    label="Finance Arranged By"
                    mode="outlined"
                    value={this.state.financeArrengedBy}
                    onChangeText={financeArrengedBy => this.setState({ financeArrengedBy })}
                    ref={this.Finance_Arranged_By}
                    onSubmitEditing={() => this.Finance_Company.current.focus()}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />
                  <TextInput //4
                  returnKeyType="next"
                    style={styles.inputs}
                    label="Finance Company"
                    mode="outlined"
                    value={this.state.financeCompany}
                    onChangeText={financeCompany => this.setState({ financeCompany })}
                    ref={this.Finance_Company}
                    onSubmitEditing={() => this.Loan_Amount.current.focus()}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  margin: 20,
                  borderColor: "#00000000",
                  borderRadius: 10,
                  elevation: 1,
                  backgroundColor: "#E3DFCE"
                }}
              >
                <View style={{ border: 20, margin: 20 }}>
                  <Text style={{ marginBottom: "5%", fontSize: 20 }}>Loan</Text>
                  <TextInput //4
                  returnKeyType="next"
                    style={styles.inputs}
                    keyboardType="number-pad"
                    label="Loan Amount"
                    mode="outlined"
                    value={this.state.loanAmount}
                    onChangeText={loanAmount => this.setState({ loanAmount })}
                    ref={this.Loan_Amount}
                    onSubmitEditing={() => this.Tenure.current.focus()}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput //4
                  returnKeyType="next"
                    style={styles.inputs}
                    keyboardType="number-pad"
                    label="Tenure"
                    mode="outlined"
                    value={this.state.tenure}
                    onChangeText={tenure => this.setState({ tenure })}
                    ref={this.Tenure}
                    onSubmitEditing={() => this.Interest_Rates.current.focus()}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />
                  <TextInput //4
                  returnKeyType="next"
                    style={styles.inputs}
                    keyboardType="number-pad"
                    label="Interest Rates"
                    mode="outlined"
                    value={this.state.interestRate}
                    onChangeText={interestRate => this.setState({ interestRate })}
                    ref={this.Interest_Rates}
                    onSubmitEditing={() => this.Expected_EMI.current.focus()}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <TextInput //4
                  returnKeyType="next"
                    style={styles.inputs}
                    keyboardType="number-pad"
                    label="Expected EMI"
                    mode="outlined"
                    value={this.state.expectedEMI}
                    onChangeText={expectedEMI => this.setState({ expectedEMI })}
                    ref={this.Expected_EMI}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />

                  <Button
                    transparent
                    style={{ justifyContent: "center" }}
                    onPress={() => {
                      this.setState({ TndCModal: true });
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      Terms and Conditions
                    </Text>
                  </Button>

                  <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={this.state.TndCModal}
                    onRequestClose={() => {
                      console.log("Modal has been closed.");
                    }}
                  >
                    {/*All views of Modal*/}
                    <View style={styles.TandCmodal}>
                      <View style={{ flex: 1, padding: 10 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                          <Text>
                            1. Price quoted is current and subject to change
                            without notice.
                          </Text>
                          <Text>
                            2. The price ruling at the time of delivery only
                            will be applicable irrespective of when payment was
                            made.
                          </Text>
                          <Text>
                            3. All specifications, Colours and features are
                            subject to change without prior notice.
                          </Text>
                          <Text>
                            4. TCS @ 1 % WILL BE COLLECTED ON FULL INVOICE VALUE
                            , IF VALUE EXCEEDS RS. 10 LAKHS.
                          </Text>
                          <Text>5. Delivery against full payment.</Text>
                          <Text>
                            6. This is not a firm order and no claim for
                            priority can be made on the basis of proforma
                            invoice.
                          </Text>
                          <Text>
                            7. All disputes shall be subject to dealership
                            location.
                          </Text>
                          <Text>
                            8. Standard terms and conditions as per dealership
                            Customer detail enquiry format will be applicable.
                          </Text>
                          <Button
                            style={{
                              flexDirection: "row-reverse",
                              backgroundColor: "red",
                              alignSelf: "center",
                              marginTop: 10
                            }}
                            onPress={() => {
                              this.setState({
                                TndCModal: !this.state.TndCModal
                              });
                            }}
                          >
                            <Text>Ok</Text>
                          </Button>
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    alignSelf: "stretch"
  },
  container: {
    margin: 5
  },
  text: {
    fontWeight: "bold",
    marginTop: 10
  },
  EnquiryOverallView: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  modal: {
    alignSelf: "center",
    backgroundColor: "lightgrey",
    height: "60%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    margin: "10%"
  },
  TandCmodal: {
    alignSelf: "center",
    backgroundColor: "lightgrey",
    height: "80%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    margin: "10%"
  },
  text: {
    color: "#3f2949",
    marginTop: 10
  },
  OnErrorTextColor: {
    color: "red"
  },
  dropDownTextLabel: {
    color: "gray",
    fontSize: 12
  }
});

export default Booking;

