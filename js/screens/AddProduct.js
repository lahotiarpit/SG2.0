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
  Title,
  Icon,
  Button
} from "native-base";
import { IconButton, TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
  };

  //function to add text from TextInputs into single array

  //function to console the output
  getValues = () => {
    console.log("Data", this.state.inputData);
  };

  render() {
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
            <Text style={{ color: "white" }}>Add Product</Text>
          </Body>
          <Right />
        </Header>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#34495E"
  }
});

export default AddProduct;
