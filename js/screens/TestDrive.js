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
class TestDrive extends Component {
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#E31837" }}>
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
            <Text style={{ color: "white" }}>Test Drive</Text>
          </Body>
          <Right />
        </Header>
        <View>
          <Text>Test Drive</Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#34495E"
  }
});

export default TestDrive;
