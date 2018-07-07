import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions, RefreshControl, StatusBar} from 'react-native';
import Separator from './components/Separator';
import Article from './components/Article';
import LoadingIndicator from './components/LoadingIndicator';
import ArticleProvider from './dataProvider/ArticleProvider';
import {CenteredTextModal} from './components/Modal'
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class App extends Component{

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
      this.setState({threads: threads, refreshing: false})
    } catch (e) {
      console.error(e);
    }
  }

  _refreshList(){
    this.setState({refreshing: true})
    this._getThreads()
  }

  _articleFlatList = () => (
    <FlatList
    data={this.state.threads}
    ItemSeparatorComponent={Separator}
    refreshControl = {
      <RefreshControl
      refreshing = {this.state.refreshing}
      onRefresh = {this._refreshList.bind(this)}
      />
    }
    renderItem={
      ({item, index}) => {

        const bgColor = index%2 == 0? 'white' : 'lightgray'
        const {width} = Dimensions.get('window')

        return (
          <Article bgColor = {bgColor} width = {width} item = {item} />
        )}
      }
      />)

  render() {
    return (
      this.state.threads.length == 0 ?
      <View style={styles.container}>
      <LoadingIndicator/>
      </View>
      :
      <View style={styles.container}>
      {this._articleFlatList()}
      <CenteredTextModal
      isVisible = {this.state.isModalVisible}
      onBackdropPress = {() => this.setState({isModalVisible: false})}
      text = 'Welcome!! Enjoy React Native!!'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: getStatusBarHeight()
  },
});
