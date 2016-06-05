
import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

import SearchPage from './SearchPage.js'

class PropertyFinder extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Buscador de Propiedades',
          component: SearchPage
        }}
      />
    )
  }
}

let styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
})


AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
