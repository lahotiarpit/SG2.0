import React, { Component, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  StatusBar,
  PermissionsAndroid,
  Alert,
  Modal
} from "react-native";
import {
  Container,
  Header,
  Footer,
  Left,
  Icon,
  Body,
  Title,
  Right,
  Content,
  Input,
  Button,
  Tabs,
  View,
  Tab,
  TabHeading,
  Segment
} from "native-base";

import {
  forceUtil,
  mobilesync,
  oauth,
  net,
  smartstore
} from "react-native-force";

import SearchBar from "react-native-dynamic-search-bar";
import { FAB, ActivityIndicator } from "react-native-paper";
import CallLogs from "react-native-call-log";
import { FlatList } from "react-native-gesture-handler";
import DashboardGridLayout from "./DashboardGridLayout";
import SearchResultMoreThanOne from './SearchResultMoreThanOne';
import SearchingSpinner from "./SearchingSpinner";

// import {Notifications} from 'react-native-notifications';
// import { CallDetector } from 'react-native-call-detector';

const syncUp = forceUtil.promiserNoRejection(mobilesync.syncUp);

oauth.getAuthCredentials(
  success_response => {
    let usable_access_token = success_response.accessToken; //.replace('!', '\\!');
    //alert(JSON.stringify(success_response));
    let salesConsultantIds = [];
    salesConsultantIds.push(success_response.userId);
  },
  failure => alert("oauth failure = " + failure)
);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      phoneNumber: 0,
      isLoading: false
    };

    BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Exit',
        "Do you want to close the app ?",
        [
          {text: 'Cancel', onPress: () => null},
          {text: 'OK', onPress: () => {BackHandler.removeEventListener();BackHandler.exitApp()}}
        ]
      );

      return true;
    });
  }

  // goToCallHistory = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
  //       {
  //         title: "Call Log Example",
  //         message: "Access your call logs",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log(CallLogs);
  //       CallLogs.load(10).then(callLogs => alert(JSON.stringify(callLogs)));
  //     } else {
  //       console.log("Call Log permission denied");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // componentWillUnmount() {
  //     this.callDetector && this.callDetector.dispose();
  // }

  SearchContactNumberOrName = () => {
    let namee = this.state.name;
    if (namee) {
      this.setState({
        isLoading: true
      });
      net.query(
        "SELECT ID, Name, Phone, MobilePhone, (SELECT Id, Dealer__c, StageName FROM Enquiries__r WHERE(StageName !='Delivered' AND StageName !='Lost')) FROM Contact WHERE Name like '%" +
          namee +
          "%' OR MobilePhone like '%" +
          namee +
          "%' OR Phone like '" +
          namee +
          "'",
        resp => {
          this.setState({
            isLoading: false
          });
          console.log("  response : " + JSON.stringify(resp));
          if (resp.totalSize == 0) {
            this.props.navigation.navigate("Enquiry");
          } else if (resp.totalSize == 1) {
            if (resp.records[0].Enquiries__r) {
              // console.log('!!!!!!')
              // console.log(resp.records[0].Enquiries__r);
              if (resp.records[0].Enquiries__r.totalSize > 0) {
                this.props.navigation.navigate("Customer360", {
                  enquiryId: resp.records[0].Enquiries__r.records[0].Id
                });
              } else {
                this.props.navigation.navigate("Enquiry");
              }
            } else {
              this.props.navigation.navigate("Enquiry");
            }
          } else if (resp.totalSize > 1) {
            this.props.navigation.navigate("SearchResultMoreThanOne", {
              response: resp.records
            });
            console.log(resp.records);
          }
        },
        err => {
          console.log("this is my error = = " + JSON.stringify(err));
          oauth.logout();
        }
      );
    } else {
      /*this.props.navigation.navigate("Customer360", {
        enquiryId: undefined
      });*/
      Alert.alert('Search Error', 'Please enter Name/Number to search.')
    }
  };

  render() {
    return (
      <Container>
        <Header style={styles.header} androidStatusBarColor="#A31837">
          <Left>
            <Button transparent>
              <Icon
                name="menu"
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontFamily: "barlow", fontWeight: "bold" }}>
              Home
            </Title>
          </Body>
          <Right />
        </Header>

        <View style={{ flexDirection: "row", margin: "2%" }}>
          <TextInput
            style={{
              borderColor: "grey",
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              height: 40,
              backgroundColor: "#E3DFCE",
              paddingLeft: 20,
              width: "85%",
              color: "black"
            }}
            placeholder="Search Name / Number"
            placeholderTextColor="grey"
            onChangeText={(name, phoneNumber) => {
              this.setState({ name, phoneNumber });
            }}
          />

          <Button
            style={{
              backgroundColor: "#E3DFCE",
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              height: 40
            }}
            onPress={this.SearchContactNumberOrName}
          >
            {this.state.isLoading == true ? (
              <ActivityIndicator
                style={{ margin: "3%" }}
                color = "#E31837"
                size="small"
                animating
              />
            ) : (
              <Icon name="search" style={{ color: "black" }}></Icon>
            )}
          </Button>
        </View>

        {/* Top Tab bars for home screen  */}

        <Tabs>
          <Tab
            heading="Pending"
            tabStyle={{ backgroundColor: "#E31837" }}
            activeTabStyle={{ backgroundColor: "#C31837" }}
            activeTextStyle={{ fontWeight: "bold", color: "white" }}
            textStyle={{ color: "white" }}
          >
            <DashboardGridLayout />
          </Tab>
          <Tab
            heading="Today"
            tabStyle={{ backgroundColor: "#E31837" }}
            activeTabStyle={{ backgroundColor: "#C31837" }}
            activeTextStyle={{ fontWeight: "bold", color: "white" }}
            textStyle={{ color: "white" }}
          >
            <DashboardGridLayout />
          </Tab>
          <Tab
            heading="Upcoming"
            tabStyle={{ backgroundColor: "#E31837" }}
            activeTabStyle={{ backgroundColor: "#C31837" }}
            activeTextStyle={{ fontWeight: "bold", color: "white" }}
            textStyle={{ color: "white" }}
          >
            <DashboardGridLayout />
          </Tab>
        </Tabs>

        {/* ...................................... */}

        {/* <Button
          style={styles.getBtnCallLogs}
          onPress={this.goToCallHistory}>
          <Text style={{ color: 'white', alignItems: 'center', }}>Get Call Logs</Text>
        </Button> */}
        <FAB.Group
          fabStyle={{ backgroundColor: "#E31837" }}
          open={this.state.open}
          actions={[
            {
              icon: "diving-flippers",
              label: "Create Enquiry",
              color: "#E31837",
              onPress: () => {
                this.props.navigation.navigate("Enquiry");
              }
            },
            {
              icon: "car",
              label: "Test Drive",
              color: "#E31837",
              onPress: () => console.log("Pressed test drive")
            },
            {
              icon: "notebook",
              label: "Create Booking",
              color: "#E31837",
              onPress: () => {
                this.props.navigation.navigate("Booking");
              }
            },
            {
              icon: "check",
              label: "Make Quotation",
              color: "#E31837",
              onPress: () => {
                this.props.navigation.navigate("Quotation");
              }
            },
            {
              icon: "plus-circle",
              label: "New Product",
              color: "#E31837",
              onPress: () => console.log("Pressed new product")
            }
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
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  WholeContainer: {
    backgroundColor: "#34495E"
  },
  header: {
    backgroundColor: "#E31837"
  },
  inputstyle: {
    borderColor: "white",
    height: 50,
    borderWidth: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    // borderRadius : 20,
    textAlign: "center",
    color: "white",
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  loginButton: {
    marginTop: 20,
    width: 200,
    height: 50,
    borderRadius: 60,
    textAlign: "center",
    color: "white",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "green"
  },
  forgetpassword: {
    textAlign: "center",
    marginTop: 10,
    color: "lightblue"
  },
  goToRegistration: {
    marginTop: 10,
    color: "lightblue",
    textAlign: "center"
  },
  getBtnCallLogs: {
    right: 0,
    bottom: 0,
    width: 200,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5"
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    margin: 5,
    backgroundColor: "#748191"
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    color: "#fff",
    padding: 10
  }
});

export default Home;
