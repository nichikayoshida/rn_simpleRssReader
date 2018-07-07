import Modal from 'react-native-modal'
import React, { Component } from 'react'
import { StyleSheet, Text, View, StyleSheet } from 'react-native'

export class CenteredTextModal extends Component {
  render() {
    const { isVisible, onBackdropPress, text } = this.props

    return (
      <Modal
        isVisible={isVisible}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onBackdropPress={onBackdropPress}>
        <View style={styles.base}>
          <Text>{text}</Text>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  base: {
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
})
