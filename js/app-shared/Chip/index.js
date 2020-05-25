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
                    <Text style = {styles.text, selected && styles.selected}>{optionText}</Text>
                </View>
            </TouchableOpacity>            
        );
    }
  
}
const styles = StyleSheet.create({
    text:{
        textTransform: 'uppercase',
        fontFamily : 'Poppins-Regular',
        fontWeight:"400",
        fontSize: 12,
        },
    chip: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderColor: '#333333',
        borderWidth: 1,
        marginRight: 15,
        marginTop: 5,
        marginBottom:5,
        borderRadius: 20,
        color: '#333333',
    },
    selected: {
        borderColor: '#E92D46',
        color: '#E92D46',
    }
});

export default Chip;