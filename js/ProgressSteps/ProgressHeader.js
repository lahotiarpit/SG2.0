import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

const ProgressHeader = ({
    totalSteps,
    activeStep,
    circleRadius,
    circleBorderWidth,
    circleProgressColor,
    circleShadowColor,
    circleBgColor,
    stepLabel,
    nextStepLabel
}) => {
  const getAPercentOfB = (a, b) => {
    return (a/b)*100;
  }

  return(
    <View style={styles.progressHeader}>
        <View>
            <ProgressCircle
                percent={
                  getAPercentOfB(
                    activeStep + 1,
                    totalSteps
                  )
                }
                radius={circleRadius}
                borderWidth={circleBorderWidth}
                color={circleProgressColor}
                shadowColor={circleShadowColor}
                bgColor={circleBgColor}
            >
                <Text style={styles.percentText}>
                  {activeStep + 1} of {totalSteps}
                </Text>
            </ProgressCircle>
        </View>
        <View style={styles.progressHeaderCont}>
          <Text style={styles.progressSection}>
            {stepLabel}
          </Text>
          <Text style={styles.progressSectionNext}>
            Next: {nextStepLabel}
          </Text>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    progressHeader:{
      paddingLeft:10,
      paddingRight:10,
      flex: 1,
      height:76,
      backgroundColor: '#ffffff',
      borderBottomRightRadius: 80,
      flexDirection: 'row',
      alignItems: 'center'
    },
    percentText: {
      fontSize: 11,
      color: '#E62C36'
    },
    progressHeaderCont: {
      paddingLeft: 15
    },
    progressSection: {
      color: '#E62C36',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Poppins-Italic'
    },
    progressSectionNext: {
      color: '#E62C36',
      fontSize: 11
    }
});

export default ProgressHeader;