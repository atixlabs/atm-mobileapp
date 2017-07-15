
import crypto from 'crypto';
import bip39 from 'bip39';
import buffer from 'buffer';
import util from 'ethereumjs-util';
// import lightwallet from 'eth-lightwallet'; // doesn't work =(
import hdkey from 'ethereumjs-wallet/hdkey';
import EthereumTx from 'ethereumjs-tx';

import API from './API/API';

const WalletService = {};

WalletService.generateNewWallet = () => {
  console.log("[WalletService.generateNewWallet]");
  const randomBytes = crypto.randomBytes(16);
  const mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'));
  const seed = bip39.mnemonicToSeed(mnemonic);
  const ethKey = hdkey.fromMasterSeed(seed);
  const wallet = ethKey.getWallet();
  const publicKey = wallet.getPublicKeyString();
  const address = util.bufferToHex(util.publicToAddress(publicKey));
  return {
    mnemonic: mnemonic,
    privateKey: wallet.getPrivateKey(),
    publicKey: publicKey.substr(2), // is necessary?
    address: address
  }
};

WalletService.send = ({privateKey, fromAddress}, toAddress, amount) => {
  API.contract.buildTransferTx({from: fromAddress, to: toAddress, amount: amount})
  .then((response) => response.json())
  .then(({raw_tx}) => {
    console.log("[WalletService.send] raw_tx", raw_tx);
    const tx = new EthereumTx(Buffer.from(util.stripHexPrefix(raw_tx), 'hex'));
    tx.sign(Buffer.from(util.stripHexPrefix(privateKey), 'hex'));
    const signedTx = tx.serialize();
    console.log("[WalletService.send] signedTx", signedTx);
    return API.contract.pushTx(signedTx);
  })
  .then((response) => response.json())
  .then((result) => {
    console.log("[WalletService.send] ok", result);
  })
  .catch((error) => {
    console.log("[WalletService.send] error", error);
  })
};

export default WalletService;

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