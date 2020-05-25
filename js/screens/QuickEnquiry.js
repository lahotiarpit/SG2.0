import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
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
  Label,
  Button,
} from "native-base";

import {
  forceUtil,
  mobilesync,
  oauth,
  net,
  smartstore,
} from "react-native-force";

import { RadioButton } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

import QuickEnquiryOnSearch from "../screens/QuickEnquiryOnSearch";
import QECustomer360 from "../screens/QECustomer360";
class QuickEnquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "Personal",
      listOfRecentLead: [],
      nameOrMobilNumber: "",
      isLoading: false,
      recentQELoading: false,
      customerId: undefined,
    };
  }

  componentDidMount() {
    net.query("Select Id, Name, MobilePhone, Email, Status from Lead order by createdDate desc limit 10",
    (data) => {
      this.setState({
        listOfRecentLead: data.records,
      });
    })
  }

  SearchMobilePhoneOrName = () => {
    let namee = this.state.nameOrMobilNumber;
    if (namee) {
      this.setState({
        isLoading: true,
      });
      net.query(
        "SELECT ID, Name, Phone, MobilePhone, ACE_Dealer__c, Email, Status, Segment__c, (SELECT ID, Product__c FROM Product_Interests__r) FROM Lead WHERE (Phone like '%" +
          namee +
          "%' OR MobilePhone like '%" +
          namee +
          "%' OR Name like '%" +
          namee +
          "%' OR FirstName like '%" +
          namee +
          "%' OR LastName like '%" +
          namee +
          "%')",
        (resp) => {
          this.setState({
            nameOrMobilNumber: '',
            isLoading: false,
          });
          console.log("  response : " + JSON.stringify(resp));
          if (resp.totalSize == 0) {
            this.props.navigation.navigate(
              "QuickEnquiryOnSearch",
              <QuickEnquiryOnSearch segment={this.state.checked} />
            );
          } else if (resp.totalSize == 1) {
            // console.log('!!!!!!')
            // console.log(resp.records[0].Enquiries__r);
            if (resp.totalSize > 0) {
              this.props.navigation.navigate(
                "QuickEnquiryCustomer360",
                <QECustomer360 enquiryId={resp.records[0].Id} />
              );
            } else {
              this.props.navigation.navigate("Enquiry");
            }
          } else if (resp.totalSize > 1) {
            this.setState({
              recentQELoading: true,
            });
            net.query(
              // "Select Id, Name, MobilePhone, Email, Status from Lead order by createdDate desc limit 10",
              "Select Id, Name, MobilePhone, Email, Status from Lead WHERE FirstName like '%" +
                namee +
                "%' ",
              (data) => {
                this.setState({
                  listOfRecentLead: data.records,
                  recentQELoading: false,
                });
                console.log("%%%%%%%%%%%%%%%" + JSON.stringify(data.records));
              }
            );
          }
        },
        (err) => {
          oauth.logout();
        }
      );
    } else {
      /*this.props.navigation.navigate("Customer360", {
          enquiryId: undefined
        });*/
      Alert.alert("Search Error", "Please enter Name/Number to search.");
    }
  };

  render() {
    const { checked, listOfRecentLead } = this.state;
    return (
      <Container>
        <Header
          style={{ backgroundColor: "#999999" }}
          androidStatusBarColor="#A31837"
        >
          <Left>
            <Button
              transparent
              style={{ backgroundColor: "#999999" }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="md-arrow-back" style={{ color: "white" }} />
            </Button>
          </Left>
          <Body>
            <Title
              style={{
                color: "white",
                fontFamily: "Poppins-Bold",
                fontWeight: "bold",
              }}
            >
              Quick Enquiry
            </Title>
          </Body>
          <Right />
        </Header>
        <View
          style={{
            borderWidth: 1,
            margin: "5%",
            borderColor: "#00000000",
            borderRadius: 10,
            elevation: 1,
            backgroundColor: "#F2F3F4",
          }}
        >
          <View style={{ marginHorizontal: "10%", paddingTop: "5%" }}>
            <Label>Segment : </Label>
          </View>
          <View style={{ border: 20, margin: 20, flexDirection: "row" }}>
            <Row style={{ alignItems: "center", flex: 1 }}>
              <RadioButton
                color="black"
                value="second"
                status={checked === "Personal" ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ checked: "Personal" });
                }}
              />
              <Label>Personal</Label>

              <RadioButton
                color="black"
                value="second"
                status={checked === "Commercial" ? "checked" : "unchecked"}
                onPress={() => {
                  this.setState({ checked: "Commercial" });
                }}
              />
              <Label>Commercial</Label>
            </Row>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginHorizontal: "5%" }}>
          <TextInput
            style={{
              borderColor: "grey",
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              height: 40,
              backgroundColor: "#F2F3F4",
              paddingLeft: 20,
              width: "85%",
              color: "black",
              borderWidth: 0,
            }}
            placeholder="Search Name / Number"
            placeholderTextColor="grey"
            value = {this.state.nameOrMobilNumber}
            onChangeText={(nameOrMobilNumber) => {
              this.setState({ nameOrMobilNumber });
            }}
          />

          <Button
            style={{
              backgroundColor: "#E3DFCE",
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              height: 40,
            }}
            onPress={this.SearchMobilePhoneOrName}
          >
            {this.state.isLoading == true ? (
              <ActivityIndicator
                style={{ margin: "3%" }}
                color="#E31837"
                size="small"
                animating
              />
            ) : (
              <Icon name="search" style={{ color: "black" }} />
            )}
          </Button>
        </View>

        <View
          style={{
            borderWidth: 1,
            margin: "5%",
            borderColor: "#00000000",
            borderRadius: 10,
            elevation: 1,
            backgroundColor: "#F2F3F4",
            paddingBottom: "10%",
          }}
        >

          <View style={{ marginHorizontal: "5%", paddingTop: "5%" }}>
            <Label style={styles.header}>RECENT QUICK ENQUIRY</Label>
            <View style={{ marginVertical: "5%" }}>
              {this.state.recentQELoading == true ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator color="#E31837" size="large" animating />
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {listOfRecentLead.map((recentLead) => {
                    return (
                      <View style={styles.record}>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate(
                              "QuickEnquiryCustomer360",
                              <QECustomer360
                                enquiryIdFromSearch={recentLead.Id}
                              />
                            );
                          }}
                        >
                          <View style={{ flexDirection: "row"  }}>  
                            <View style={styles.rectangle}></View> 
                            <View style={{ marginTop:"4%"}}>
                              <Text style={styles.heading}>{recentLead.Name}</Text>
                              <Text style={styles.subheading}>{recentLead.MobilePhone}</Text>
                            </View>
                            <Left>
                            <View>
                              <Text style={styles.followup}>NEXT FOLLOW UP</Text>
                              <Text>26 May 2020</Text>
                            </View>
                            </Left>
                          </View>
                          
                        
                        
                        </TouchableOpacity>
                        
                      </View>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  EnquiryOverallView: {
    flex: 1,
  },
  header: { textAlign:"center", alignItems:"center", fontSize: 18, fontFamily: "Poppins-Medium" , color : "#333333" },
  rectangle :{
    backgroundColor:'#FF9933',
    borderColor: 'white',
    width:25,	height:80,
  }, 
  followup:{
    textAlign:"right", marginTop: "3%", fontSize: 12, color:"#ED1C24" , fontFamily: "Poppins-Semibold"
  },
  record:{ 
    marginTop: "3%", height : 80, zIndex:99, width:"100%", backgroundColor: "#FFFFFF",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  heading:{ 
    marginLeft: "10%", fontWeight: "600", width:110, fontSize: 20, color:"#000000" , fontFamily: "Poppins-Semibold"
  },
  subheading:{ 
    marginLeft: "10%", fontWeight: "600", fontSize: 16, color:"#999999", fontFamily: "Poppins-Medium" 
  }
});
export default QuickEnquiry;
