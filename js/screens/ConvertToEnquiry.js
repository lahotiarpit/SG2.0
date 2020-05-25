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
  Title
} from "native-base";
import { TextInput } from 'react-native-paper';
class ConvertToEnquiry extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }


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
            <Text style={{ color: "white" }}>Convert To Enquiry</Text>
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

export default ConvertToEnquiry;
