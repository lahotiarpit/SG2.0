import React, { Component } from "react";
import {View, Text, StyleSheet} from 'react-native';
import Chip from '../Chip/index';

class RadioChip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: ''
        }
    }

  render(){
    const { selectedOption } = this.state;
    const { options, onValueChange } = this.props;

    return(
        <View style={styles.container}>
            {
                options.map((option, index) => 
                <Chip 
                    selected={selectedOption === option.label}
                    onChange={() => {
                        this.setState({
                            selectedOption: option.label
                        });
                        onValueChange(option.value);
                    }}
                    optionText={option.label}
                />   
                )
            }
        </View>
      );
  }
  
}
const styles = StyleSheet.create({
    container:{
      flexDirection: "row",
      flexWrap:"wrap",
      marginTop: 10,
      marginBottom:10
    },
    chip: {
        backgroundColor: '#E31837'
    }
});

export default RadioChip;