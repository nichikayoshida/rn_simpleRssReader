import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export default class Separator extends Component {
  render() {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B'
        }}
      />
    )
  }
}
