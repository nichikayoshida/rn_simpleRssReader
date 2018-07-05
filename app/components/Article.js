import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';

export default class Article extends Component{

  render = () =>{

    const {bgColor, width, item} = this.props

    return(
      <View style = {{padding: 5, backgroundColor: bgColor, flex : 1, flexDirection : 'row', width: '100%'}}>
        <Image
          style = {{width: 50, height: 50, marginRight: 5}}
          source = {{uri: item.data.thumbnail}}/>
        <View>
          <Text style = {{width: width - 50}}>
            {item.data.title}
          </Text>
          <Text style = {{color: '#ababab', fontSize: 10}}>
            {item.data.domain}
          </Text>
        </View>

      </View>)

    }

  }
