import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

export default class LoadingIndicator extends Component{

  render(){
    return(
      <View>
        <ActivityIndicator/>
        <Text>Loading</Text>
      </View>
    )
  }

}
