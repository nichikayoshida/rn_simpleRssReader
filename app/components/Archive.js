import React, { Component } from 'react'
import {
  AsyncStorage,
  FlatList,
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native'
import Separator from './Separator'
import Article from './Article'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default class Archive extends Component {
  static navigationOptions = {
    title: 'ストックした記事',
    headerTintColor: 'white',
    headerBackTintStyle: { color: 'white' },
    headerStyle: { backgroundColor: '#00aced' }
  }

  state = {
    threads: []
  }

  componentDidMount() {
    this._getData()
  }

  _getData() {
    AsyncStorage.getAllKeys((err, keys) => {
      if (err) {
        console.error(err)
        return false
      } else {
        AsyncStorage.multiGet(keys, (err, data) => {
          threads = data.map(i => {
            return JSON.parse(i[1])
          })
          this.setState({ threads })
          return true
        })
      }
    })
  }

  _articleFlatList = () => (
    <FlatList
      data={this.state.threads}
      ItemSeparatorComponent={Separator}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        const bgColor = index % 2 == 0 ? 'white' : 'lightgray'
        const { width } = Dimensions.get('window')

        return <Text>{item.title}</Text>
      }}
    />
  )

  render() {
    return this.state.threads.length != 0 ? (
      <View style={styles.container}>{this._articleFlatList()}</View>
    ) : (
      <View style={styles.container}>
        <Text>Empty</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  statusBar: {
    height: getStatusBarHeight(),
    width: '100%',
    backgroundColor: 'black'
  }
})
