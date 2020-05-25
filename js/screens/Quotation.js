import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  Container,
  Left,
  Header,
  Body,
  Right,
  Icon,
  Title,
  Row,
  DatePicker,
  Picker,
  Label,
  Item,
  Button
} from "native-base";
import { ProgressSteps, ProgressStep } from "../ProgressSteps/index";
import {
  Avatar,
  Card,
  Paragraph,
  TextInput,
  RadioButton,
  Appbar
} from "react-native-paper";
import { forceUtil, oauth, net } from "react-native-force";

import RSAShieldAccessoriesPickList from "../PicklistHelpers/RSAShieldAccessoriesPickList";
class Quotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      checked: "first",
      consultantEmail: "",
      CustomerMail: "",
      DealerEmails: "",
      RSA: "",
      Shield: "",
      Accessory: "",
      IncidentalCharges: "",
      RegistrationCharges: "",
      DealerDiscount: "",
      RoadSafetyTaxCharges: "",
      InsuranceCharges: "",
      ZeroDepreciationInsuranceCostCharges: "",
      Model: "",
      EnquiryName: "",
      EnquiryId: props.route.params.enquiryId,
      CustomerName: props.route.params.enquiryName,
      ModelData: [],
      UnitPrice : "",
      errors: false,
      IncidentalValidate: "",
      RegistrationValidate: "",
      DealerValidate: "",
      RoadSafetyValidate: "",
      InsuranceValidate: "",
      ZeroDepreciationInsuranceCostValidate: "",
      ModelQueryData: "",
      RSAPrice : "",
      ShieldPrice : "",
      AccessoryPrice : "",
      // ModelStepHasError : true,
      chargesStepHasError : true,
      AddOnsStepHasError : true,
      termsAndConditionsStepHasError : true,
      
    };

    this.setDate = this.setDate.bind(this);

    this.Customer = React.createRef();
    this.DealerEmails = React.createRef();
    this.IncidentalCharges = React.createRef();
    this.RegistrationCharges = React.createRef();
    this.DealerDiscount = React.createRef();
    this.RoadSafetyTaxCharges = React.createRef();
    this.InsuranceCharges = React.createRef();
    this.ZeroDepreciationInsuranceCostCharges = React.createRef();
    this.EnquiryName = React.createRef();
    this.CustomerName = React.createRef();
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  // validateModelStep = () => {
  //   if(!this.state.Model) {
  //     alert('Please select model'); return;
  //   } else {
  //     this.setState({
  //       ModelStepHasError : false
  //     })
  //   }
  // }

  validateChargesStep = () => {
    if(!this.state.IncidentalCharges) {
      alert('Fill the incidental charges'); return;
    } else if(!this.state.RegistrationCharges) {
      alert('Fill the registration charges'); return;
    } else if(!this.state.DealerDiscount) {
      alert('Enter the dealer discount'); return;
    } else if(!this.state.RoadSafetyTaxCharges) {
      alert('Enter road safty tax charges'); return;
    } else if(!this.state.InsuranceCharges) {
      alert('Enter insurance charges'); return;
    } else if(!this.state.ZeroDepreciationInsuranceCostCharges) {
      alert('Enter zero depreciation charges'); return;
    } else {
      this.setState({
        chargesStepHasError : false
      })
    }
  }

  validateAddOnsStep = () => {
    if(!this.state.RSA) {
      alert('Please select RSA'); return;
    } else if(!this.state.Shield) {
      alert('Please select Shield'); return;
    } else if(!this.state.Accessory) {
      alert('Please select Accessory'); return;
    } else {
      this.setState({
        chargesStepHasError : false
      })
    }
  }

  validateTermsAndConditionStep = () => {

    var expresionFormailValidation = /^(.+)@(.+)$/;

    if(!this.state.DealerEmails) {
      alert('Please provide dealer mail'); return;
    } else if(!expresionFormailValidation.test(this.state.DealerEmails)) {
      alert("invalid dealer mail id"); return;
    }
    else if(!this.state.consultantEmail) {
      alert('Please provide consultant mail'); return;
    } else if(!expresionFormailValidation.test(this.state.consultantEmail)) {
      alert("invalid consultant mail id"); return;
    }
    else if(!this.state.CustomerMail) {
      alert('Please provide customer mail'); return;
    } else if(!expresionFormailValidation.test(this.state.CustomerMail)) {
      alert("invalid customer mail id"); return;
    }
  }

  DropdownRSA(value) {
    this.setState({
      RSA: value
    });
  }

  DropdownShield(value) {
    alert(value);
    this.setState({
      Shield: value
    });
  }

  DropdownAccessory(value) {
    this.setState({
      Accessory: value
    });
  }
  DropDownModel(value) {
    this.setState({
      Model: value
    });
  }

  componentDidMount() {
    const enquiryIdd = this.state.EnquiryId;
    net.query(
      "SELECT ID,(SELECT ID, Name, Product2Id, Product2.Name, UnitPrice FROM OpportunityLineItems),(SELECT Id, Name, Product__c FROM Product_Interests__r) FROM Opportunity WHERE ID = '" +
        this.state.EnquiryId +
        "' LIMIT 1",
      Data => {
        this.setState({
          ModelData: [],//Data.records[0].OpportunityLineItems.records,
          UnitPrice : ''//Data.records[0].OpportunityLineItems
        });
      },
      err => {
        console.log("Error : " + JSON.stringify(err));
      }
    );
  }
  render() {
    const data = RSAShieldAccessoriesPickList();
    console.log(JSON.stringify(this.state.UnitPrice))
    return (
      <Container>
        <Header style={{ backgroundColor: "#E31837" }} androidStatusBarColor="#A31837">
          <Left>
            <Button transparent>
              <Icon 
                style={{ color: "white" }}
                name="md-arrow-back"
                onPress={() => {
                  this.props.navigation.goBack();
                }}
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
              Quotation
            </Text>
          </Body>
          <Right />
        </Header>
        <ProgressSteps
          disabledStepNumColor="black"
          style={styles.ProgressSteps}
        >
          <ProgressStep label="Model"
          // onNext={this.validateModelStep}
          // errors={this.state.ModelStepHasError}
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
                    label="Enquiry Name"
                    value={this.props.route.params.enquiryName.records[0].Name}
                    onChangeText={EnquiryName => this.setState({ EnquiryName })}
                    mode="outlined"
                    returnKeyType="next"
                    ref={this.EnquiryName}
                    onSubmitEditing={() => this.CustomerName.current.focus()}
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
                    label="Customer Name"
                    value={this.props.route.params.customerName}
                    onChangeText={CustomerName =>
                      this.setState({ CustomerName })
                    }
                    mode="outlined"
                    returnKeyType="next"
                    ref={this.CustomerName}
                    blurOnSubmit={false}
                    theme={{
                      colors: {
                        primary: "#272727",
                        underlineColor: "transparent"
                      }
                    }}
                  />
                  <Item picker style={{ flexDirection: "row" }}>
                    <Label style={{ flex: 1 }}>Model : </Label>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.Model}
                      onValueChange={this.DropDownModel.bind(this)}
                    >
                      {this.state.ModelData.map(model => {
                        return (
                          <Picker.Item label={model.Name} value={model.Name} />
                        );
                      })}
                    </Picker>
                  </Item>
                </View>
              </View>
            </View>
            {/* </Card> */}
          </ProgressStep>

          <ProgressStep
            label="Charges"
            // onNext={this.validateChargesStep}
            // errors={this.state.chargesStepHasError}
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
                    // value={this.state.IncidentalCharges}
                    // onChangeText={IncidentalCharges =>
                    //   this.setState({ IncidentalCharges })
                    // }
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="number-pad"
                    ref={this.GoToIncidentalCharges}
                    onSubmitEditing={() =>
                      this.GoToIncidentalCharges.current.focus()
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
                </View>
              </View>
            </View>
            {/* </Card> */}
          </ProgressStep>

          <ProgressStep label="Add Ons"
          // onNext={this.validateAddOnsStep}
          // errors={this.state.AddOnsStepHasError}
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
                  <Item picker style={{ flexDirection: "row" }}>
                    <Label style={{ flex: 1 }}>RSA : </Label>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      selectedValue={this.state.RSA}
                      onValueChange={this.DropdownRSA.bind(this)}
                    >
                      <Picker.Item label="-None-" value="" />
                      {data.records.map(RSA => {
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
                    value
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
                      <Picker.Item label="-None-" value="" />
                      {data.records.map(Shield => {
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
                    style={styles.inputs}
                    keyboardType="number-pad"
                    value
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
                      <Picker.Item label="-None-" value="" />
                      {data.records.map(Accessories => {
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
                    disabled
                    style={styles.inputs}
                    keyboardType="number-pad"
                    value
                    label="Accessories Price"
                    mode="outlined"
                    ref={this.AccessoryPrice}
                    onChangeText={AccessoryPrice => this.setState({ AccessoryPrice })}
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
            {/* </Card> */}
          </ProgressStep>

          <ProgressStep label="T & C"
          onSubmit = {this.validateTermsAndConditionStep}
          errors = {this.state.termsAndConditionsStepHasError}>
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
                <Button
                  style={{
                    backgroundColor: "#E31837",
                    marginVertical: "5%",
                    marginHorizontal: "10%",
                    alignSelf: "center"
                  }}
                >
                  <Text>Preview</Text>
                </Button>

                <View style={{ border: 20, margin: 20 }}>
                <TextInput
                    style={styles.inputs}
                    type="outlined"
                    label="Dealer's Email"
                    value={this.state.DealerEmails}
                    onChangeText={DealerEmails =>
                      this.setState({ DealerEmails })
                    }
                    mode="outlined"
                    returnKeyType="next"
                    keyboardType="email-address"
                    ref={this.DealerEmails}
                    onSubmitEditing={() => this.Email.current.focus()}
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
                    label="Consultant's Email"
                    value={this.state.consultantEmail}
                    onChangeText={consultantEmail => this.setState({ consultantEmail })}
                    mode="outlined"
                    returnKeyType="next"
                    ref={this.Email}
                    onSubmitEditing={() => this.Customer.current.focus()}
                    blurOnSubmit={false}
                    keyboardType="email-address"
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
                    label="Customer's Email"
                    value={this.state.CustomerMail}
                    onChangeText={CustomerMail => this.setState({ CustomerMail })}
                    mode="outlined"
                    returnKeyType="next"
                    ref={this.Customer}
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
        </ProgressSteps>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#34495E"
  },
  inputs: {
    flex: 1,
    alignSelf: "stretch"
  },
  OnErrorTextColor: {
    color: "red"
  }
});
export default Quotation;
