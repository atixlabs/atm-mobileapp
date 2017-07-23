import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage,
  TouchableNativeFeedback,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import OneSignal from 'react-native-onesignal';
import API from '../services/API/API';
import SessionUser from '../state/SessionUser';
import WalletService from '../services/WalletService';
import MoneyRequestScreen from './MoneyRequestScreen';
import List from './List';

import Constants from '../components/Constants';

const sendDeviceId = function(userData) {
  console.log('sendDeviceIdkdljaskldjaskldjasklajdkl');
  API.oneSignal.sendDeviceId(userData)
  .then((response) => {
    console.log('Device id saved', response);
  })
  .catch((error) => {
    console.log('Device id error', error);
  });
};

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarActiveTextColor='#ffc211'
          tabBarUnderlineStyle={{ backgroundColor: '#ffc211'}}
          renderTabBar={() => <DefaultTabBar />}
          tabBarPosition='bottom'
        >
          <MoneyRequestScreen tabLabel="Request" />
          <List navigation={this.props.navigation} tabLabel="List"/>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});