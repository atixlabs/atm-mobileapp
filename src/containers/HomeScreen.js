import React from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Human ATM',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Welcome to humanATM app</Text>
      </View>
    );
  }
}