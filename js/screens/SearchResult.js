import React, { Component } from "react";
import { View, Text } from "native-base";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import {
  forceUtil,
  mobilesync,
  oauth,
  net,
  smartstore
} from "react-native-force";




export default class SearchResult extends Component {
  render() {
    const phone = 7857859096;
    return (
        <View style={{ margin: "2%" }}>
          <View style={{ borderWidth: 0.5, padding: "2%", marginTop: "2%" }}>
            <Text>{this.props.name}</Text>
            <Text>{this.props.phone} </Text>
          </View>
        </View>
    );
  }
}
