
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import WalletService from '../services/WalletService';
import SessionUser from '../state/SessionUser';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const applicationAsyncInit = async function() {
  try {
    if (!SessionUser.userIsLoggedIn()){
      const wallet = WalletService.generateNewWallet();
      await SessionUser.saveUser(wallet);
    }
  } catch(error) {
    console.log("[App.onApplicationInit] cannot create a new user", error);
  }
};

App = () => {
  applicationAsyncInit();
  /* const toAddress = "0x00c376412f3a8063fc6bceb1d874730ea88eb531";
  const amount = 11;
  WalletService.send({privateKey: wallet.privateKey, fromAddress: wallet.address}, toAddress, amount);
  */
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to HumanAtm
      </Text>
      <Text style={styles.instructions}>
        To get started, edit index.android.js
      </Text>
      <Text style={styles.instructions}>
        Double tap R on your keyboard to reload,{'\n'}
        Shake or press menu button for dev menu
      </Text>
    </View>
  );
};

export default App;
