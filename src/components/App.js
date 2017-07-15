
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
import hdkey from 'ethereumjs-wallet/hdkey';
import EthereumTx from 'ethereumjs-tx';


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

/*
  // Naranja usefull code ?)
  self.pushContractTransaction = function(_keys, transaction) {
    $log.info("[backend - pushContractTransaction] Starting", "transaction[" + angular.toJson(transaction) + ']');
    return self.signHash(transaction.info.to_sign, _keys.privkey)
    .then(function (signature) {
      $log.info("[backend - pushContractTransaction] Info", "Calling apiCall(/push_tx)");
      transaction.signature = signature.signature;
      return self.apiCall(_keys, ENVIRONMENT.apiurl('/push_tx'), angular.toJson(transaction));
    });
  }
  self.callContractFunction = function(_keys, token_id, fnc, payload) {
    $log.info("[backend - callContractFunction] Starting", "function[" + fnc + "]" , "payload[" + angular.toJson(payload) + ']');
    return self.apiCall(_keys, ENVIRONMENT.apiurl('/token/' + token_id + '/' + fnc), payload)
    .then(function(transaction) {
      return self.pushContractTransaction(_keys, transaction);
    });
  }
*/


const generateWallet = () => {
  console.log(hdkey);
  const randomBytes = crypto.randomBytes(16);
  const mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'));
  const seed = bip39.mnemonicToSeed(mnemonic);
  const ethKey = hdkey.fromMasterSeed(seed);
  const wallet = ethKey.getWallet();
  return {
    mnemonic: mnemonic,
    privateKey: wallet.getPrivateKey(),
    publicKey: wallet.getPublicKeyString().substr(2)
  }
};

App = () => {
  const wallet = generateWallet();
  console.log("mnemonic", wallet.mnemonic); 

  // dummy tx test:
  const txParams = {
    nonce: '0x00',
    gasPrice: '0x09184e72a000', 
    gasLimit: '0x2710',
    to: '0x0000000000000000000000000000000000000000', 
    value: '0x00', 
    data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: 3
  };

  const tx = new EthereumTx(txParams);
  tx.sign(wallet.privateKey);
  const serializedTx = tx.serialize();
  console.log("serializedTx", serializedTx);

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
