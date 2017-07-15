
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import crypto from 'crypto';
import bip39 from 'bip39';
import buffer from 'buffer';
import util from 'ethereumjs-util';
// import lightwallet from 'eth-lightwallet'; // doesn't work =(
import ethereumWallet from 'ethereumjs-wallet';
import ethereumTx from 'ethereumjs-tx';


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

const randomBytes = crypto.randomBytes(16);
const mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))

App = () => {
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
