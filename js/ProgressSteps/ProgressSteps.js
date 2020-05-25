import React, { Component } from 'react';
import { View } from 'react-native';
import { times } from 'lodash';

import StepIcon from './StepIcon';
import ProgressHeader from './ProgressHeader';

class ProgressSteps extends Component {
  state = {
    stepCount: 0,
    activeStep: this.props.activeStep || 0
  };

  componentDidMount() {
    this.setState({ stepCount: React.Children.count(this.props.children) });
  }

  getChildProps() {
    return { ...this.props, ...this.state };
  }

  renderStepIcons = () => {
    /*
    stepNum={i + 1}
    label={this.props.children[i].props.label}
    isFirstStep={i === 0}
    isLastStep={i === this.state.stepCount - 1}
    isCompletedStep={i < this.state.activeStep}
    isActiveStep={i === this.state.activeStep}
    */  
   return (
    <ProgressHeader 
      totalSteps={this.state.stepCount}
      activeStep={this.state.activeStep}
      circleRadius={28}
      circleBorderWidth={6}
      circleProgressColor={'green'}
      circleShadowColor={'#E62C36'}
      circleBgColor={'#fff'}
      stepLabel={this.props.children[this.state.activeStep].props.label}
      nextStepLabel={this.props.children[this.state.activeStep + 1].props.label}
    />
   ) 
  };

  // Callback function from ProgressStep that passes current step.
  setActiveStep = step => {
    if (step > -1) {
      this.setState({ activeStep: step });
    }
  };

  render() {
    const styles = {
      stepIcons: {
        position: 'relative',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        flexDirection: 'row',
        top: 10,
        marginBottom: 0
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.stepIcons}>{this.renderStepIcons()}</View>
        <View style={{ flex: 1 }}>
          {React.cloneElement(this.props.children[this.state.activeStep], {
            setActiveStep: this.setActiveStep,
            activeStep: this.state.activeStep,
            stepCount: this.state.stepCount
          })}
        </View>
      </View>
    );
  }
}

export default ProgressSteps;
