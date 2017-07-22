
import crypto from 'crypto';
import bip39 from 'bip39';
import util from 'ethereumjs-util';
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
    publicKey: publicKey,
    address: address
  }
  // Wallet hardcoded 
  /*const address = util.bufferToHex(util.publicToAddress('0x9fc28d4cf6dcfd9221b291129689ab75edba1a92819de74521a9af8a92c4f952206797c1a9444fec636bc43384804a768f8e50a060b9cae5195bacdba0ef500b'));
  return {
    mnemonic: "corn buzz endorse wagon pitch seek shield tongue kind measure fun use",
    privateKey: "0x424525f3f6def569df3d97b0d06238e776f2670c853f32c5c029c1622403b8f2",
    publicKey: "0x9fc28d4cf6dcfd9221b291129689ab75edba1a92819de74521a9af8a92c4f952206797c1a9444fec636bc43384804a768f8e50a060b9cae5195bacdba0ef500b",
    address: address
  }*/
};

WalletService.send = ({privateKey, fromAddress}, toAddress, amount) => {
  API.contract.buildTransferTx({from: fromAddress, to: toAddress, amount: amount})
  .then((response) => response.json())
  .then(({raw_tx}) => {
    console.log("[WalletService.send] raw_tx", raw_tx);
    const tx = new EthereumTx(Buffer.from(util.stripHexPrefix(raw_tx), 'hex'));
    tx.sign(Buffer.from(util.stripHexPrefix(privateKey), 'hex'));
    let signedTx = tx.serialize();
    signedTx = util.bufferToHex(signedTx);
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