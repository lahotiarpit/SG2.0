import React, { Component } from "react";
import { StyleSheet, BackHandler, Modal, ScrollView, StatusBar } from "react-native";
import {
  View,
  Text,
  Container,
  Left,
  Header,
  Body,
  Right,
  Title,
  Icon,
  Item,
  Picker,
  Label,
  Button
} from "native-base";
import { FAB, IconButton, TextInput } from "react-native-paper";
import taskPickList from "../PicklistHelpers/TaskPickListHelper";
// import createFollowup from "../screens/CreateFollowup";

class CreateFollowup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      model: "",
      type: "",
      status: "",
      task: false,
      remark: "",
      Remark: "",
      RemarkType: "",
      RemarkSubType: ""
    };
  }

  DropdownSubject(value) {
    this.setState({
      subject: value
    });
  }

  DropdownModel(value) {
    this.setState({
      model: value
    });
  }

  DropdownType(value) {
    this.setState({
      type: value
    });
  }

  DropdownStatus(value) {
    this.setState({
      status: value
    });
  }

  DropdownRemark(value) {
    this.setState({
      Remark: value
    });
  }

  DropdownRemarkType(value) {
    this.setState({
      RemarkType: value
    });
  }

  DropdownRemarkSubType(value) {
    this.setState({
      RemarkSubType: value
    });
  }
  // HANDELING HARDWARE BACK BUTTON CONTROL

  // componentWillMount() {
  //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  // componentWillUnmount() {
  //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  // handleBackButtonClick() {
  //     this.props.navigation.navigate('Customer360');
  //     return true;
  // }

  // ----------------------------------------------------------

  render() {
    const taskData = taskPickList();
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
            <Text style={{ color: "white" }}>Create Followup</Text>
          </Body>
          <Right />
        </Header>
        <ScrollView>
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
                <Label style={{ flex: 1 }}> Subject</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  selectedValue={this.state.subject}
                  onValueChange={this.DropdownSubject.bind(this)}
                >
                  {taskData.Subject.map(subject => {
                    return (
                      <Picker.Item
                        label={subject.label}
                        value={subject.value}
                      />
                    );
                  })}
                </Picker>
              </Item>

              <Item picker style={{ flexDirection: "row" }}>
                <Label style={{ flex: 1 }}> Model</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  selectedValue={this.state.model}
                  onValueChange={this.DropdownModel.bind(this)}
                >
                  <Picker.Item label="--None--" />
                  <Picker.Item label="Call" value="Call" />
                  <Picker.Item label="Home Visit" value="Home Visit" />
                  <Picker.Item label="ShowRoom Visit" value="ShowRoom Visit" />
                </Picker>
              </Item>

              <Item picker style={{ flexDirection: "row" }}>
                <Label style={{ flex: 1 }}> Type</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  selectedValue={this.state.type}
                  onValueChange={this.DropdownType.bind(this)}
                >
                  {taskData.Type.map(type => {
                    return (
                      <Picker.Item label={type.label} value={type.value} />
                    );
                  })}
                </Picker>
              </Item>

              <Item picker style={{ flexDirection: "row" }}>
                <Label style={{ flex: 1 }}> Status</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  selectedValue={this.state.status}
                  onValueChange={this.DropdownStatus.bind(this)}
                >
                  {taskData.Status.map(status => {
                    return <Picker.Item label={status.label} value={status.value} />;
                  })}
                </Picker>
              </Item>

              <Item picker style={{ flexDirection: "row" }}>
                <Label style={{ flex: 1 }}> Remark</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  selectedValue={this.state.Remark}
                  onValueChange={this.DropdownRemark.bind(this)}
                >
                  <Picker.Item label="--None--" />
                  <Picker.Item label="Call" value="Call" />
                  <Picker.Item label="Home Visit" value="Home Visit" />
                  <Picker.Item label="ShowRoom Visit" value="ShowRoom Visit" />
                </Picker>
              </Item>

              <Item picker style={{ flexDirection: "row" }}>
                <Label style={{ flex: 1 }}> Remark Type</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  selectedValue={this.state.RemarkType}
                  onValueChange={this.DropdownRemarkType.bind(this)}
                >
                  <Picker.Item label="--None--" />
                  <Picker.Item label="Call" value="Call" />
                  <Picker.Item label="Home Visit" value="Home Visit" />
                  <Picker.Item label="ShowRoom Visit" value="ShowRoom Visit" />
                </Picker>
              </Item>

              <Item picker style={{ flexDirection: "row" }}>
                <Label style={{ flex: 1 }}> Remark SubType</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  selectedValue={this.state.RemarkSubType}
                  onValueChange={this.DropdownRemarkSubType.bind(this)}
                >
                  <Picker.Item label="--None--" />
                  <Picker.Item label="Call" value="Call" />
                  <Picker.Item label="Home Visit" value="Home Visit" />
                  <Picker.Item label="ShowRoom Visit" value="ShowRoom Visit" />
                </Picker>
              </Item>

              {/* <View style = {{flexDirection : 'row-reverse', marginHorizontal : '5%', marginBottom : '5%'}}>
             
            </View> */}

              <Modal
                animationType={"fade"}
                transparent={false}
                visible={this.state.task}
                onRequestClose={() => {
                  console.log("Modal has been closed.");
                }}
              >
                {/*All views of Modal*/}
                <View style={styles.Task}>
                  <View style={{ flex: 1, padding: 10 }}>
                    <Button
                      transparent
                      style={{ flexDirection: "row-reverse" }}
                      onPress={() => {
                        this.setState({
                          task: !this.state.task
                        });
                      }}
                    >
                      <Icon style={{ color: "black" }} name="close" />
                    </Button>

                    <ScrollView showsVerticalScrollIndicator={false}>
                      <TextInput //2
                        style={styles.inputs}
                        value={this.state.remark}
                        label="Remark"
                        mode="outlined"
                        ref={this.remark}
                        onChangeText={remark => this.setState({ remark })}
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
                          backgroundColor: "#E31837",
                          alignSelf: "center"
                        }}
                      >
                        <Text>Mark As Complete</Text>
                      </Button>

                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: 20,
                          paddingBottom: "10%",
                          marginTop: "5%"
                        }}
                      >
                        Create New Followup
                      </Text>

                      <Item picker style={{ flexDirection: "row" }}>
                        <Label style={{ flex: 1 }}> Subject</Label>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: undefined }}
                          selectedValue={this.state.subject}
                          onValueChange={this.DropdownSubject.bind(this)}
                        >
                          <Picker.Item label="--None--" />
                          <Picker.Item label="Call" value="Call" />
                          <Picker.Item label="Home Visit" value="Home Visit" />
                          <Picker.Item
                            label="ShowRoom Visit"
                            value="ShowRoom Visit"
                          />
                        </Picker>
                      </Item>

                      <Item picker style={{ flexDirection: "row" }}>
                        <Label style={{ flex: 1 }}> Model</Label>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: undefined }}
                          selectedValue={this.state.model}
                          onValueChange={this.DropdownModel.bind(this)}
                        >
                          <Picker.Item label="--None--" />
                          <Picker.Item label="Call" value="Call" />
                          <Picker.Item label="Home Visit" value="Home Visit" />
                          <Picker.Item
                            label="ShowRoom Visit"
                            value="ShowRoom Visit"
                          />
                        </Picker>
                      </Item>

                      <Item picker style={{ flexDirection: "row" }}>
                        <Label style={{ flex: 1 }}> Type</Label>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: undefined }}
                          selectedValue={this.state.type}
                          onValueChange={this.DropdownType.bind(this)}
                        >
                          <Picker.Item label="--None--" />
                          <Picker.Item label="Call" value="Call" />
                          <Picker.Item label="Home Visit" value="Home Visit" />
                          <Picker.Item
                            label="ShowRoom Visit"
                            value="ShowRoom Visit"
                          />
                        </Picker>
                      </Item>

                      <Item picker style={{ flexDirection: "row" }}>
                        <Label style={{ flex: 1 }}> Status</Label>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: undefined }}
                          selectedValue={this.state.status}
                          onValueChange={this.DropdownStatus.bind(this)}
                        >
                          <Picker.Item label="--None--" />
                          <Picker.Item label="Call" value="Call" />
                          <Picker.Item label="Home Visit" value="Home Visit" />
                          <Picker.Item
                            label="ShowRoom Visit"
                            value="ShowRoom Visit"
                          />
                        </Picker>
                      </Item>

                      <Button
                        style={{
                          flexDirection: "row-reverse",
                          backgroundColor: "red",
                          alignSelf: "center",
                          marginTop: 10
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
              <View style={{ marginVertical: "2%" }}>
                <Text style={{ fontSize: 18 }}>Call Start Time</Text>
              </View>
              <TextInput //2
                style={styles.inputs}
                // value={this.state.remark}
                label="Date"
                mode="outlined"
                ref={this.remark}
                // onChangeText={remark => this.setState({ remark })}
                returnKeyType="next"
                blurOnSubmit={false}
                theme={{
                  colors: {
                    primary: "#272727",
                    underlineColor: "transparent"
                  }
                }}
              />

              <TextInput //2
                // style={styles.inputs}
                // value={this.state.remark}
                label="Time"
                mode="outlined"
                ref={this.remark}
                // onChangeText={remark => this.setState({ remark })}
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
            <View
              style={{
                alignSelf: "center",
                margin: 10,
                alignContent: "center"
              }}
            >
              {/* <IconButton
                icon="plus"
                size={30}
                color="white"
                style={{ backgroundColor: "#E31837" }}
                onPress={() => {
                  this.setState({ task: true });
                }}
              /> */}
              <Button style={{ backgroundColor: "#E31837" }}>
                <Text>Submit</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#34495E"
  },
  inputs: {
    marginBottom: 20
  },
  modal: {
    alignSelf: "center",
    backgroundColor: "lightgrey",
    height: "60%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: "10%"
  },
  Task: {
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
  }
});
export default CreateFollowup;
