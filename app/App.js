import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, ActivityIndicator, Image, Dimensions} from 'react-native';
import Separator from './components/Separator';
import Article from './components/Article';
import LoadingIndicator from './components/LoadingIndicator';
import ArticleProvider from './dataProvider/ArticleProvider';

export default class App extends Component{

  state = {
    threads: []
  }

  componentDidMount() {
    this._getThreads()
  }

  _getThreads = async () => {
    try {
      let threads = await ArticleProvider.getThreads()
      this.setState({threads: threads})
    } catch (e) {
      console.error(e);
    }
  }

  _articleFlatList = () => (
    <FlatList
    data={this.state.threads}
    ItemSeparatorComponent={Separator}
    renderItem={
      ({item, index}) => {

        const bgColor = index%2 == 0? 'white' : 'rgba(0,0,0,0.1)'
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
