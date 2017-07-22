
import configAPI, { handleErrors } from './config.js';

const contractAPI = {};

contractAPI.buildTransferTx = (payload) => {
  console.log("[contractAPI.buildTransferTx]", payload);
  return fetch(`${configAPI.serverRoute}/tx/build`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      amount: payload.amount
    })
  }).then(handleErrors);
};

contractAPI.pushTx = (signedTx, buildTxPayload) => {
  console.log("[contractAPI.pushTx]", 
   JSON.stringify({
      signed_tx: signedTx.toString()
   })
  );
  return fetch(`${configAPI.serverRoute}/tx/push`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      signed_tx: signedTx.toString(),
      from: buildTxPayload.from,
      to: buildTxPayload.to,
      amount: buildTxPayload.amount
    })
  }).then(handleErrors);
};

export default contractAPI;
