import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  Button
} from 'react-native';
import PropTypes from 'prop-types';

export default class Article extends Component {
  _save({ data }) {
    AsyncStorage.setItem(data['title'], JSON.stringify(data), err => {
      if (err) {
        console.error(err);
        return false;
      } else {
        return true;
      }
    });
  }

  render = () => {
    const { bgColor, width, item } = this.props;

    return (
      <View style={[styles.base, { backgroundColor: bgColor }]}>
        <Image
          style={styles.image}
          source={
            item.data.thumbnail.includes('https')
              ? { uri: item.data.thumbnail }
              : null
          }
        />
        <View>
          <Text style={{ width: width - 50 }}>{item.data.title}</Text>
          <Text style={{ color: '#ababab', fontSize: 10 }}>
            {item.data.domain}
          </Text>
          <Button onPress={() => this._save(item)} title={'ストック'} />
        </View>
      </View>
    );
  };
}

Article.propTypes = {
  bgColor: PropTypes.string,
  width: PropTypes.number,
  item: PropTypes.object
};

const styles = StyleSheet.create({
  base: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 5
  }
});
