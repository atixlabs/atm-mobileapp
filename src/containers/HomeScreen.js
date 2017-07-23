import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage,
  TouchableNativeFeedback,
} from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import OneSignal from 'react-native-onesignal';
import API from '../services/API/API';
import SessionUser from '../state/SessionUser';
import WalletService from '../services/WalletService';
import MoneyRequestScreen from './MoneyRequestScreen';
import List from './List';

import Constants from '../components/Constants';

const applicationAsyncInit = async function(cb) {
  try {
    const user = await SessionUser.loadUser();
    let userData
    if(!user) {
      console.log("Creating user")
      const wallet = WalletService.generateNewWallet();
      await SessionUser.saveUser(wallet);
      userData = await API.user.register('username', 'password', wallet.address,  wallet.address)
    } else {
      await API.user.getUserData(user.address);
    }

    await API.oneSignal.sendDeviceId(userData);
    console.log("Loaded User", SessionUser.getUser())
    cb();
  } catch(error) {
    console.log("[App.onApplicationInit] cannot create a new user", error);
  }
};

export default class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      userLoaded: false
    }
  }

  static navigationOptions = {
    header: null,
  }

  componentWillMount() {
    applicationAsyncInit(() => this.setState({userLoaded: true}));
  }

  render() {
    if(this.state.userLoaded) {
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
    } else {
       return (
        <Container>
          <Content>
            <Spinner />
          </Content>
        </Container>
       )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});