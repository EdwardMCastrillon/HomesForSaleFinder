
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
} from 'react-native'
import HouseImage from './Resources/house.png'

export default class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: '',
      isLoading: false
    }
    this.API_ENDPOINT = 'http://api.nestoria.co.uk/api?'
    this.onSearchTextChanged = this.onSearchTextChanged.bind(this)
    this.onSearchPressed = this.onSearchPressed.bind(this)
  }

  render() {
    let Spinner = this.state.isLoading ?
                  ( <ActivityIndicatorIOS size='large' /> ) :
                  ( <View/> )
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Busca casas para comprar!
        </Text>
        <Text style={styles.description}>
          Busca por nombre, código postal o según tu locación
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeHolder='Buscar por nombre o código postal'
            value={this.state.searchString}
            onChange={this.onSearchTextChanged} />
          <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Ir</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.button}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Ubicación</Text>
        </TouchableHighlight>
        <Image source={HouseImage} style={styles.image} />
        {Spinner}
      </View>
    )
  }

  onSearchTextChanged (event) {
    console.log('Search Text has changed')
    this.setState({ searchString: event.nativeEvent.text })
  }

  urlForQueryAndPage(key, value, pageNumber) {
    let data = {
      country: 'uk',
      pretty: 1,
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
    }
    
    data[key] = value

    let queryString = Object.keys(data)
    .map(key => `${key}=${encodeURIComponent(data[key])}`)
    .join('&')

    return this.API_ENDPOINT + queryString
  }

  _executeQuery(query) {
    console.log(query)
    this.setState({ isLoading: true })
  }

  onSearchPressed() {
    let query = this.urlForQueryAndPage('place_name', this.state.searchString, 1)
    this._executeQuery(query)
  }
}

let styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FF3B33',
    borderColor: '#FF3B33',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#FF3B33',
    borderRadius: 8,
    color: '#48BBEC'
  }
})
