
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
};

WalletService.send = ({privateKey, fromAddress}, toAddress, amount) => {
  const buildTxPayload = {from: fromAddress, to: toAddress, amount: amount};
  return API.contract.buildTransferTx(buildTxPayload)
  .then((response) => response.json())
  .then(({raw_tx}) => {
    console.log("[WalletService.send] raw_tx", raw_tx);
    const tx = new EthereumTx(Buffer.from(util.stripHexPrefix(raw_tx), 'hex'));
    tx.sign(Buffer.from(util.stripHexPrefix(privateKey), 'hex'));
    let signedTx = tx.serialize();
    signedTx = util.bufferToHex(signedTx);
    console.log("[WalletService.send] signedTx", signedTx);
    return API.contract.pushTx(signedTx, buildTxPayload);
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