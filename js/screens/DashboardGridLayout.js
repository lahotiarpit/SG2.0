import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";
import { View, Text, Container, Row } from "native-base";
import {
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native-gesture-handler";
import DashboardTestDriveGridLayout from "./DashboardTestDriveGridLayout";
import {
  TextInput,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph
} from "react-native-paper";
import Grid from "react-native-grid-component";
import SortableGridView from "react-native-sortable-gridview";

// class FlatlistItem extends Component {
//   render() {
//     let colors = ['#123456', '#654321', '#fdecba', '#abcdef'];
//     return (
//       <View style={styles.GridViewContainer}>
//       <View style={{
//         flex: 1, backgroundColor: this.props.index ? 'tomato' : 'yellow',
//         // flex: 1, backgroundColor: this.props.index / 2 == 0 ? 'tomato' : 'yellow'
//       }}>
//         <Text style={styles.GridViewTextLayout}>{this.props.item.name}</Text>
//       </View>
//       </View>
//     )
//   }
// }

class DashboardGridLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  _renderPlaceholder = i => (
    <TouchableOpacity>
      {" "}
      <View style={styles.item} key={i} />
    </TouchableOpacity>
  );

  GetGridViewItem(item) {
    alert(item);
  }
  render() {
    return (
      <Container>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginTop: "2%"
            }}
          >
            <TouchableOpacity
              style={{ margin: "2%", alignContent: "center" }}
              onPress={() => alert("Test Drive")}
            >
              <View
                style={{
                  backgroundColor: "black",
                  width: 100,
                  height: 100,
                  alignItems: "center"
                }}
              >
                <Text style={{ color: "white", fontSize: 40 }}>6</Text>
                <Text style={{ color: "white", fontSize: 18 }}>Test Drive</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: "2%", alignContent: "center" }}>
              <View
                style={{
                  backgroundColor: "orange",
                  width: 100,
                  height: 100,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 40 }}>10</Text>
                <Text style={{ color: "white", fontSize: 18 }}>FollowUp</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: "2%", alignContent: "center" }}>
              <View
                style={{
                  backgroundColor: "lightblue",
                  width: 100,
                  height: 100,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 40 }}>6</Text>
                <Text style={{ color: "white", fontSize: 18 }}>Enquiry</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <TouchableOpacity style={{ margin: "2%", alignContent: "center" }}>
              <View
                style={{
                  backgroundColor: "purple",
                  width: 100,
                  height: 100,
                  alignItems: "center"
                }}
              >
                <Text style={{ color: "white", fontSize: 40 }}>4</Text>
                <Text style={{ color: "white", fontSize: 18 }}>Quotation</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: "2%", alignContent: "center" }}>
              <View
                style={{
                  backgroundColor: "blue",
                  width: 100,
                  height: 100,
                  alignItems: "center"
                }}
              >
                <Text style={{ color: "white", fontSize: 40 }}>1</Text>
                <Text
                  style={{ color: "white", fontSize: 18, textAlign: "center" }}
                >
                  Quick Enquiry
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: "2%", alignContent: "center" }}>
              <View
                style={{
                  backgroundColor: "tomato",
                  width: 100,
                  height: 100,
                  alignItems: "center"
                }}
              >
                <Text style={{ color: "white", fontSize: 40 }}>0</Text>
                <Text style={{ color: "white", fontSize: 18 }}>Home Visit</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}></View>
          <View style={{ margin: 20 }}>
            <Card>
              <Card.Title title="Mahindra TUV300" />
              <Card.Cover
                source={{
                  uri:
                    "https://www.drivespark.com/images/2017-02/mahindra-tuv300-exterior-21.jpg"
                }}
              />
              <Card.Actions>
                <Card.Content>
                  <Title>Mahindra TUV300</Title>
                  <Paragraph>
                    The TUV is a the only seven-seater and also the only
                    body-on-frame SUV in its segment. It is powered by a refined
                    diesel motor, has a big spacious cabin and it also gives you
                    a proper SUV experience. The soft ride quality is a boon
                    which adds to its rugged appeal. But there’s no automatic
                    transmission available after the update.
                  </Paragraph>
                </Card.Content>
              </Card.Actions>
            </Card>
          </View>
        </ScrollView>
      </Container>
      // <View>
      //   <ScrollView>
      //     <FlatList
      //       data={this.state.GridListItems}
      //       renderItem={({ item, index }) => {
      //         // <View style={styles.GridViewContainer}>
      //         //   <Text style={styles.GridViewTextLayout} onPress={this.GetGridViewItem.bind(this, item.key)} > {item.key} </Text>
      //         // </View>

      //         return (<FlatlistItem style = { styles.GridViewContainer } item = {item} index = {index}></FlatlistItem>)
      //       }}
      //       numColumns={3}
      //     />
      //     <TextInput
      //       mode='outlined'
      //       label='Enter Something' />
      //     <TextInput
      //       mode='outlined'
      //       label='Enter Something' />
      //     <TextInput
      //       mode='outlined'
      //       label='Enter Something' />
      //     <TextInput
      //       mode='outlined'
      //       label='Enter Something' />
      //     <TextInput
      //       mode='outlined'
      //       label='Enter Something' />
      //     <TextInput
      //       mode='outlined'
      //       label='Enter Something' />
      //   </ScrollView>

      // // </View>
      // <Container style={styles.cont}>
      //   <ScrollView>
      //     <Row>
      //      <TouchableOpacity  onPress = {() => this.props.navigation.navigate(' DashboardTestDriveGridLayout')}>
      //      <View style={styles.A}>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 60 }}>6</Text>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>Test Drive</Text>
      //       </View>
      //      </TouchableOpacity>
      //      <TouchableOpacity>
      //      <View style={styles.B}>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 60 }}>4</Text>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>Booking</Text>
      //       </View>
      //      </TouchableOpacity>
      //     </Row>
      //     <Row>
      //     <TouchableOpacity>
      //     <View style={styles.C}>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 60 }}>2</Text>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>Enquiry</Text>
      //       </View>
      //     </TouchableOpacity>
      //       <TouchableOpacity>
      //       <View style={styles.D}>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 60 }}>10</Text>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>Booking</Text>
      //       </View>
      //       </TouchableOpacity>
      //     </Row>
      //     <Row>
      //      <TouchableOpacity>
      //      <View style={styles.E}>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 60 }}>1</Text>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>E To Q</Text>
      //       </View>
      //      </TouchableOpacity>
      //      <TouchableOpacity>
      //      <View style={styles.F}>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 60 }}>6</Text>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>Test Drive</Text>
      //       </View>
      //      </TouchableOpacity>
      //     </Row>
      //     <Row>
      //       <TouchableOpacity>
      //       <View style={styles.G}>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 60 }}>100</Text>
      //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>Dummy</Text>
      //       </View>
      //       </TouchableOpacity>
      //     </Row>
      //   </ScrollView>
      // </Container>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 120,
    margin: 1
  },
  list: {
    flex: 1
  },
  cont: {
    margin: 2,
    alignItems: "center"
  },
  A: {
    width: 170,
    height: 150,
    backgroundColor: "red",
    alignItems: "center",
    borderRadius: 10
  },
  B: {
    width: 170,
    height: 150,
    backgroundColor: "blue",
    alignItems: "center",
    borderRadius: 10
  },
  C: {
    width: 170,
    height: 150,
    backgroundColor: "green",
    alignItems: "center",
    borderRadius: 10
  },
  D: {
    width: 170,
    height: 150,
    backgroundColor: "orange",
    alignItems: "center",
    borderRadius: 10
  },
  E: {
    width: 170,
    height: 150,
    backgroundColor: "tomato",
    alignItems: "center",
    borderRadius: 10
  },
  F: {
    width: 170,
    height: 150,
    backgroundColor: "purple",
    alignItems: "center",
    borderRadius: 10
  },
  G: {
    width: 170,
    height: 150,
    backgroundColor: "black",
    alignItems: "center",
    borderRadius: 10
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5",
    alignItems: "center"
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
    height: 120,
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

export default DashboardGridLayout;
