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
import List from './List';

import Constants from '../components/Constants';

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