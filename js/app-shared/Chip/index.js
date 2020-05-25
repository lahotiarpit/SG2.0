import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class Chip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: ''
        }
    }

    onPressHandler = () => {
        this.props.onChange();
    }

    render(){
        const { optionText, selected } = this.props;
        return(
            <TouchableOpacity onPress={this.onPressHandler}>
                <View style={[styles.chip, selected && styles.selected]}>
                    <Text>{optionText}</Text>
                </View>
            </TouchableOpacity>            
        );
    }
  
}
const styles = StyleSheet.create({
    chip: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 8,
        paddingBottom: 8,
        borderColor: '#999999',
        borderWidth: 1,
        marginRight: 15,
        borderRadius: 20,
        color: '#B3B3B3'
    },
    selected: {
        borderColor: '#CC1D3A'
    }
});

export default Chip;