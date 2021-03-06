import React, { Component } from 'react';
import Timeline from 'react-native-timeline-flatlist';
import { Text, Icon } from 'native-base'

import CreateFollowup from '../screens/CreateFollowup';

 class Timelinee extends Component {
  constructor(props){
    console.log("))))))))))" + JSON.stringify(props));
    super(props);
    this.state = {
      tasks: props.tasks ? props.tasks : [],
      name : props.name,
      Product2Id : props.Product2Id,
      tasksToShow: []
    }
  }

  componentDidMount() {
    let tasksToShow = this.state.tasks.filter((task)=> {
      return (task.Product_Family__c === this.state.Product2Id);
    }).map((task, index)=>{
      let iconName = '';
      let iconColor = 'white';
      let circleColor = 'red';

      switch(task.Subject) {
        case 'Call':
          iconName = 'md-call';
          iconColor = 'white';
          circleColor = 'green';
          break;
        case 'Customer Location Visit':
          iconName = 'md-pin';
          iconColor = 'red';
          circleColor = 'gold';
          break;
        case 'Send Quote':
          iconName = 'md-document';
          iconColor = 'darkblue';
          circleColor = 'skyblue';
          break;
        case 'Send Letter':
          iconName = 'md-mail';
          iconColor = 'darkblue';
          circleColor = 'violet';
          break;
        case 'Other':
          iconName = 'md-options';
          iconColor = 'white';
          circleColor = 'purple';
          break;
        case 'Showroom Visit':
          iconName = 'md-business';
          iconColor = 'white';
          circleColor = 'orange';
          break;
          break;
        case 'Home Visit':
          iconName = 'md-home';
          iconColor = 'white';
          circleColor = 'magenta';
          break;
          break;
        case 'Test Drive':
          iconName = 'md-car';
          iconColor = 'darkblue';
          circleColor = 'turquoise';
          break;
      }

      return {
        task: task,
        index: index,
        time: getHumanReadableDate(task.Call_Start_Time__c != null ? new Date(Date.parse(task.Call_Start_Time__c.substr(0, task.Call_Start_Time__c.indexOf('+')))) : new Date()), 
        title: task.Subject, 
        description: task.Status__c, 
        icon: (<Icon style={{ color: iconColor , fontSize: 20}} name={iconName}  />), 
        circleColor: circleColor, 
        circleSize: 30,
      };
    }); 

    this.setState({tasksToShow: tasksToShow});
  }

  handleClick = (event) => {
    this.props.showFollowupDetails(event);
  }

  renderTime = (rowData, sectionId, rowId) => {
    console.log(rowData)
    console.log(sectionId)
    console.log(rowId)
    return (<Text>55</Text>)
  }
    
  render() {
    return(
      <Timeline
        onEventPress={this.handleClick}
        style={{marginTop : 10}}
        data={this.state.tasksToShow}
        innerCircle='element'
        circleColor='red'
        separator={false}
        seperatorColor='blue'
        lineColor='black'
        showTime={true}
        renderFullLine={true}
      />
    )
  }
}

function normalizeTo2digits(n) {
	return ((n < 10) ? '0' : '') + n;
}

function getHumanReadableDate(d) {
  return normalizeTo2digits(d.getDate()) + '/' + normalizeTo2digits(d.getMonth() + 1) + '/' + (d.getFullYear()-2000) + '\n' + normalizeTo2digits(d.getHours()) + ':' + normalizeTo2digits(d.getMinutes());
}

export default Timelinee;