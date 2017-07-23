import configAPI, { handleErrors } from './config';

const userAPI = {};

const forTesting = {
  "_id":"8sNX6EXqkaWDHLPSH",
  "address":"n2eMqTT929pb1RDNuqEnxdaLau1rxy3efr",
  "email":"Korey34@hotmail.com",
  "personalInformation": {
    "name":"Isabella",
    "fullName":"Isabella Feest",
    "phone":"1-622-079-3232 x6693",
    "birthdate":"2016-09-13T01:04:21.592Z"
  },
  "appSettings": {},
  "appData": {
    "maxAllowedWithdrawal":10000
  },
  "createdAt":"2017-07-22T15:18:41.442Z"
}

userAPI.getUserData = (userId) => {
  console.log("[userAPI.getUserData]", userId);
  return fetch(`${configAPI.serverRoute}/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
};

userAPI.getUserRequests = (userId) => {
  console.log("[userAPI.getuserRequests]", userId);
  return fetch(`${configAPI.serverRoute}/user/${userId}/requests`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
};

userAPI.postNewRequest = (userId, amount) => {
  return fetch(`${configAPI.serverRoute}/request/emit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address: userId,
      amount: amount,
    }),
  }).then(response => response.json());

}

export default userAPI;