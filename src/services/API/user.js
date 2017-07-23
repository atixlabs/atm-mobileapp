import configAPI, { handleErrors } from './config';

const userAPI = {};

userAPI.register = (username, password, address, oneSignalId) => {
  console.log("[userAPI.register]", username, password, address, oneSignalId);

  return fetch(`${configAPI.serverRoute}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      address,
      oneSignalId
    }),
  }).then(response => response.json());
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