import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import NewFeed from './components/NewFeed'
import Archive from './components/Archive'

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <AppNavigation />
      </View>
    )
  }
}

const AppNavigation = StackNavigator({
  NewFeed: { screen: NewFeed },
  Archive: { screen: Archive }
})
