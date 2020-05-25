import React from 'react';
import { View } from 'react-native';

const ProgressButtons = props => (
  <View style={{ flexDirection: 'row', marginTop: 60 }}>
    <View style={{ position: 'absolute', left: 0, bottom: 5 }}>{props.renderPreviousButton()}</View>
    <View style={{ position: 'absolute', right: 0, bottom: 5 }}>{props.renderNextButton()}</View>
  </View>
);

export default ProgressButtons;
