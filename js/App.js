// import React, { Component } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import Enquiry from "./screens/Enquiry";
// import Booking from "./screens/Booking";
// import QuickEnquiry from "./screens/QuickEnquiry";
// import AddProduct from "./screens/AddProduct";
// import Quotation from "./screens/Quotation";
// import ConvertToEnquiry from "./screens/ConvertToEnquiry";
// import TestDrive from "./screens/TestDrive";
// import CreateFollowup from "./screens/CreateFollowup";
// import Customer360 from "./screens/Customer360";
// import Timelinee from "./screens/Timelinee";
// import Home from "./screens/Home";
// // import Enquiry from './screens/Enquiry';
// // import Enquiry from './screens/Enquiry';
// // import Enquiry from './screens/Enquiry';
// // import Enquiry from './screens/Enquiry';

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// function Stackk() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Enquiry" component={Enquiry} />
//       <Stack.Screen name="Booking" component={Booking} />
//       <Stack.Screen name="QuickEnquiry" component={QuickEnquiry} />
//       <Stack.Screen name="ConvertToEnquiry" component={ConvertToEnquiry} />
//       <Stack.Screen name="Quotation" component={Quotation} />
//       <Stack.Screen name="TestDrive" component={TestDrive} />
//       <Stack.Screen name="CreateFollowup" component={CreateFollowup} />
//       <Stack.Screen name="AddProduct" component={AddProduct} />
//     </Stack.Navigator>
//   );
// }

// function Stack1() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home}/>
//       <Stack.Screen name="Customer360" component={Customer360} />
//       <Stack.Screen name="Enquiry" component={Enquiry} />
//       <Stack.Screen name="Booking" component={Booking} />
//       <Stack.Screen name="QuickEnquiry" component={QuickEnquiry} />
//       <Stack.Screen name="ConvertToEnquiry" component={ConvertToEnquiry} />
//       <Stack.Screen name="Quotation" component={Quotation} />
//       <Stack.Screen name="TestDrive" component={TestDrive} />
//       <Stack.Screen name="CreateFollowup" component={CreateFollowup} />
//       <Stack.Screen name="AddProduct" component={AddProduct} />
//     </Stack.Navigator>
//   );
// }

// export default class App extends Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <Drawer.Navigator>

//         <Drawer.Screen name="Home" component={Stack1} />
//           <Drawer.Screen name="Customer360" component={Stackk} />
//           <Drawer.Screen name="TimeLine" component={Timelinee} />
//         </Drawer.Navigator>
//       </NavigationContainer>
//     );
//   }
// }

import React, { Component } from "react";
import {
  BackHandler,
  Alert,
  ScrollView,
  TouchableOpacity,
  Icon,
} from "react-native";
import { Text } from "react-native-paper";
import Home from "./screens/Home";
import Customer360 from "./screens/Customer360";
import CalenderView from "./screens/CalenderView";
import Enquiry from "./screens/Enquiry";
import Booking from "./screens/Booking";
import DashboardGridLayout from "./screens/DashboardGridLayout";
import DashboardTestDriveGridLayout from "./screens/DashboardTestDriveGridLayout";
import Quotation from "./screens/Quotation";
import ConvertToEnquiry from "./screens/ConvertToEnquiry";
import AddProduct from "./screens/AddProduct";
import TestDrive from "./screens/TestDrive";
import QuickEnquiry from "./screens/QuickEnquiry";
import CreateFollowup from "./screens/CreateFollowup";
import QuickEnquiryOnSearch from "./screens/QuickEnquiryOnSearch";

// import { AppContainer, createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createDrawerNavigator } from 'react-navigation-drawer'
import { View, Container } from "native-base";
import { Image, AppState, Platform, StatusBar } from "react-native";
// import { createStackNavigator } from 'react-navigation-stack';
// import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchResultMoreThanOne from "./screens/SearchResultMoreThanOne";
import QECustomer360 from "./screens/QECustomer360";

import { smartstore, mobilesync, forceUtil } from "react-native-force";
import { querySoup } from "react-native-force/src/react.force.smartstore";

import initSoups from "../js/soups/init";

const soupExists = forceUtil.promiser(smartstore.soupExists);
const registerSoup = forceUtil.promiser(smartstore.registerSoup);
const upsertSoupEntries = forceUtil.promiser(smartstore.upsertSoupEntries);
import { syncUp, reSync } from "react-native-force/src/react.force.mobilesync";
import { SafeAreaView } from "react-native-safe-area-context";

// class Hidden extends React.Component {
//   render() {
//     return null;
//   }
// }

// const MyDrawer = createDrawerNavigator({
//   Home: { screen: Home, navigationOptions : {} },
//   Login: { screen: Login, navigationOptions: { drawerLockMode: 'locked-closed' } },
//   Registration: { screen: Registration, navigationOptions: { drawerLabel: <Hidden /> } },
//   Customer360: { screen: Customer360, navigationOptions: { drawerLockMode: 'locked-closed' } },
//   CalenderView: { screen: CalenderView, navigationOptions: { drawerLockMode: 'locked-closed' } },
//   //   Enquiry : { screen : Enquiry, navigationOptions : { drawerLabel : <Hidden/>}},
//   //   Booking : { screen : Booking, navigationOptions : { drawerLabel : <Hidden/>}}
// },
//   {
//     drawerBackgroundColor: '#E5E8E8',
//     contentOptions:
//     {
//       activeTintColor: 'white', activeBackgroundColor: '#5920CB',
//     }
//   })

// const StackNavigation1 = createStackNavigator({
//   Enquiry: { screen: Enquiry, navigationOptions: { header: null } },
//   Booking: { screen: Booking, navigationOptions: { header: null } },
//   ConvertToEnquiry : { screen : ConvertToEnquiry, navigationOptions: { header: null } },
//   AddProduct : { screen : AddProduct, navigationOptions: { header: null } },
//   TestDrive : { screen : TestDrive, navigationOptions: { header: null } },
//   CreateFollowup : { screen : CreateFollowup, navigationOptions: { header: null } },
//   Quotation : { screen : Quotation, navigationOptions: { header: null } },
// })

// const StackNavigation2 = createStackNavigator({
//   DashboardTestDriveGridLayout : { screen : DashboardTestDriveGridLayout }
// })

// const MySwitchNavigator = createSwitchNavigator({
//   Home: { screen: MyDrawer },
//   Customer360: { screen : StackNavigation1 },
//   // DashboardGridLayout : { screen : StackNavigation2 }
// })

// const Stack = createStackNavigator();

// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Notifications" component={Notifications} />
//       <Stack.Screen name="Profile" component={Profile} />
//       <Stack.Screen name="Settings" component={Settings} />
//     </Stack.Navigator>
//   );
// }

//   Registration : { screen : Registration },
// })

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// function customizedDrawer(props) {
//   return (
//     <SafeAreaView style={{margin: 10, backgroundColor: 'white'}}>

//         <View>
//           <TouchableOpacity>
//             <Image
//               source={require('../js/assets/user.png')}
//               style={{alignSelf: 'center'}}
//             />
//           </TouchableOpacity>
//           </View>
//           <Text
//             style={{
//               fontWeight: 'bold',
//               fontSize: 20,
//               marginTop: 10,
//               textAlign: 'center',
//             }}>
//             Pranav Honmode
//           </Text>
//           <View
//             style={{
//               borderWidth: 0.5,
//               borderColor: 'lightgrey',
//               marginTop: '5%',
//             }}
//           />

// <TouchableOpacity onPress = {() => {props.navigation.navigate('Home')}}>
//           <View style={{marginTop: 10, flexDirection: 'row'}}>
//             <Icon style={{alignSelf: 'center'}} name="home" />
//             <Text
//               style={{
//                 paddingVertical: '5%',
//                 marginLeft: 10,
//                 alignContent: 'center',
//               }}>
//               Home
//             </Text>
//           </View>
//         </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

function StackData() {
  return (
    <Stack.Navigator headerMode="float">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Customer360"
        component={Customer360}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Enquiry"
        component={Enquiry}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConvertToEnquiry"
        component={ConvertToEnquiry}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TestDrive"
        component={TestDrive}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateFollowup"
        component={CreateFollowup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quotation"
        component={Quotation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResultMoreThanOne"
        component={SearchResultMoreThanOne}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuickEnquiryOnSearch"
        component={QuickEnquiryOnSearch}
        options={{ headerShown: false }}
      />
            <Stack.Screen
        name="QuickEnquiryCustomer360"
        component={QECustomer360}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Stack1() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchResultMoreThanOne"
        component={SearchResultMoreThanOne}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Enquiry"
        component={Enquiry}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}

export default class App extends Component {

  componentDidMount() {
    // AppState.addEventListener("change", state => alert("opened"));
    initSoups();
    //this.createNewEnquiry();
  }

  render() {
    // const MyNavigator = createAppContainer(MySwitchNavigator);
    return (
      // <Container>
      //   <MyNavigator />
      // </Container>
      <NavigationContainer>
        <Drawer.Navigator drawerType="back" overlayColor="black">
          <Drawer.Screen name="Home" component={StackData} />
          <Drawer.Screen
            name="Calender View"
            component={CalenderView}
            options={{ gestureEnabled: false }}
          />
          <Drawer.Screen
            name="Quick Enquiry"
            component={QuickEnquiry}
            options={{ gestureEnabled: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

