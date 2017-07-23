import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  AsyncStorage,
  Image,
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

const applicationAsyncInit = async function() {
  try {
    const user = await SessionUser.loadUser();
    let userData
    if(!user) {
      console.log("Creating user")
      const wallet = WalletService.generateNewWallet();
      await SessionUser.saveUser(wallet);
      userData = await API.user.register('username', 'password', wallet.address,  wallet.address)
    } else {
      userData = await API.user.getUserData(user.address);
    }
    console.log("Loaded User", SessionUser.getUser())
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
    applicationAsyncInit().then(() => this.setState({userLoaded: true}));
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
        <View style={styles.container}>
          <View style={styles.firstRow} />
          <View style={styles.secondRow}>
            <Image
              style={{
                resizeMode: 'contain',
                width: Constants.realWidth * (9 / 10)
              }}
              source={require('../images/humanATM_png.png')}
            />
          </View>
          <View style={styles.thirdRow}>
            <Spinner />
          </View>
        </View>
       )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Constants.realWidth,
    height: Constants.realHeight,
    alignContent: 'center',
  },
  firstRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: (Constants.realHeight - Constants.tabviewHeight) / 3
  },
  secondRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: (Constants.realHeight - Constants.tabviewHeight) / 3
  },
  thirdRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: (Constants.realHeight - Constants.tabviewHeight) / 3
  },
});