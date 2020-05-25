import React, { Component } from 'react';
import { View, Text, Content } from 'native-base';
import RNSchedule from 'rnschedule';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-dynamic-vector-icons';

export default class CalenderView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        const data = [
            {
                title: 'Nikhil',
                subtitle: 'Punit',
                start: new Date("2020-02-14"),
                end: new Date(2020, 1, 14, 14, 0),
                color: 'indigo',
            },
            {
                title: 'Ajit',
                subtitle: 'Aalap',
                start: new Date(2020, 1, 15, 13, 0),
                end: new Date(2020, 1, 15, 13, 0),
                color: 'green',
            },
            {
                title: 'Brock',
                subtitle: 'Venky',
                start: new Date("2020-02-15"),
                end: new Date(2020, 1, 18, 2, 10),
                color: 'blue',
            },
            {
                title: 'Roman',
                subtitle: 'Peterson',
                start: new Date("2020-02-15"),
                end: new Date(2020, 1, 18, 2, 10),
                color: 'orange',
            }
        ]
        return (
            <ScrollView>
               <TouchableHighlight>
               <RNSchedule
                    dataArray={data}
                    onEventPress={(appt) => alert(JSON.stringify(appt.title + " has an appointment with " + appt.subtitle))}
                    hourSize = {23}
                    leftIcon = {<Button><Icon name = 'arrow-back' onPress = { () => { this.props.navigation.navigate('Home') } }/></Button>}
                />
               </TouchableHighlight>
            </ScrollView>
        )
    }
}