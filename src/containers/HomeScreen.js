import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import MoneyRequestScreen from './MoneyRequestScreen';
import List from '../components/List'

import Constants from '../components/Constants';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          renderTabBar={() => <DefaultTabBar />}
          tabBarPosition='bottom'
        >
          <MoneyRequestScreen tabLabel="Request" />
          <List tabLabel="List" data={[{_id: "1", requestedAmount: 1000, "transactionData": {"state": "Pending"}},
              {_id: "2", requestedAmount: 500, "transactionData": {"state": "Canceled"}},
              {_id: "3", requestedAmount: 250, "transactionData": {"state": "Confirmed"}}]}/>
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