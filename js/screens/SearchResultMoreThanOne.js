import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
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
  Segment,
  Text,
} from "native-base";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import SearchResult from "./SearchResult";

import {
  forceUtil,
  mobilesync,
  oauth,
  net,
  smartstore,
} from "react-native-force";

const syncUp = forceUtil.promiserNoRejection(mobilesync.syncUp);

export default class SearchResultMoreThanOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search_results: props.route.params.response,
    };
  }

  render() {
    //alert(JSON.stringify(this.state));
    const data = [];
    data.push(this.state.search_results);
    for (let i = 0; i < this.state.search_results.length; i++) {
      console.log(this.state.search_results[i]);
    }

    return (
      <View>
        <Header style={styles.header} androidStatusBarColor="#A31837">
          <Left>
            <Button transparent>
              <Icon
                name="md-arrow-back"
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title>Search Result</Title>
          </Body>
          <Right />
        </Header>

        <View style={{ marginVertical: "6%" }}>
          <ScrollView>
            {this.state.search_results.map((each_result) => (
              <TouchableOpacity
                onPress={() => {
                  if (each_result.Enquiries__r) {
                    this.props.navigation.navigate("Customer360", {
                      enquiryId: each_result.Enquiries__r.records[0].Id
                    });
                  }
                  else { this.props.navigation.navigate("Enquiry"); }
                }}
              >
                <SearchResult
                  name={each_result.Name}
                  phone={each_result.MobilePhone}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  WholeContainer: {
    backgroundColor: "#34495E",
  },
  header: {
    backgroundColor: "#E31837",
  },
});
