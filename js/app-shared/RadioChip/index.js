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
    const { options } = this.props;
    return(
        <View style={styles.container}>
            {
                options.map((option, index) => 
                <Chip 
                    selected={selectedOption === option.text}
                    onChange={() => {
                        this.setState({
                            selectedOption: option.text
                        });
                    }}
                    optionText={option.text}
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
      marginTop: 10,
      marginBottom:10
    },
    chip: {
        backgroundColor: '#E31837'
    }
});

export default RadioChip;