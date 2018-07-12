import React, { Component } from 'react'
import { AsyncStorage, FlatList, Separator } from 'react-native'
import Separator from './components/Separator'
import Article from './components/Article'
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
      renderItem={({ item, index }) => {
        const bgColor = index % 2 == 0 ? 'white' : 'lightgray'
        const { width } = Dimensions.get('window')

        return <Article bgColor={bgColor} width={width} item={item} />
      }}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        {this._articleFlatList()}
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
