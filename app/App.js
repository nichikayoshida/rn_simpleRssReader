import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  RefreshControl,
  StatusBar
} from 'react-native'
import Separator from './components/Separator'
import Article from './components/Article'
import LoadingIndicator from './components/LoadingIndicator'
import ArticleProvider from './dataProvider/ArticleProvider'
import { CenteredTextModal } from './components/Modal'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import NewFeed from './components/NewFeed'

export default class App extends Component {
  render() {
    return <NewFeed />
  }
}
