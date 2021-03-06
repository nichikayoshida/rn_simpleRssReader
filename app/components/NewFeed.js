import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import Separator from './Separator'
import Article from './Article'
import LoadingIndicator from './LoadingIndicator'
import ArticleProvider from '../dataProvider/ArticleProvider'
import { CenteredTextModal } from './Modal'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default class NewFeed extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '新着記事',
    headerTintColor: 'white',
    headerBackTintStyle: { color: 'white' },
    headerStyle: { backgroundColor: '#00aced' },
    headerRight: (
      <TouchableOpacity
        style={{ paddingRight: 8 }}
        onPress={() => {
          navigation.navigate('Archive')
        }}>
        <Text>ストック一覧</Text>
      </TouchableOpacity>
    )
  })

  state = {
    threads: [],
    isModalVisible: true,
    refreshing: false
  }

  componentDidMount() {
    this._getThreads()
  }

  _getThreads = async () => {
    try {
      let threads = await ArticleProvider.getThreads()
      this.setState({ threads: threads, refreshing: false })
    } catch (e) {
      console.error(e)
    }
  }

  _refreshList() {
    this.setState({ refreshing: true })
    this._getThreads()
  }

  _articleFlatList = () => (
    <FlatList
      data={this.state.threads}
      ItemSeparatorComponent={Separator}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._refreshList.bind(this)}
        />
      }
      renderItem={({ item, index }) => {
        const bgColor = index % 2 == 0 ? 'white' : 'lightgray'
        const { width } = Dimensions.get('window')

        return <Article bgColor={bgColor} width={width} item={item} />
      }}
    />
  )

  _onBackdropPress() {
    this.setState({ isModalVisible: false })
  }

  render() {
    return this.state.threads.length == 0 ? (
      <View style={styles.container}>
        <View style={styles.container}>
          <LoadingIndicator />
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        {this._articleFlatList()}
        <CenteredTextModal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          text="Welcome!! Enjoy React Native!!"
        />
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
