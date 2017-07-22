import configAPI, { handleErrors } from './config';

const oneSignalAPI = {};

oneSignalAPI.sendDeviceId = (userData) => {
  console.log("[oneSignalAPI.sendDeviceId]", userData);
  return fetch(`${configAPI.serverRoute}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address: userData.address,
      oneSignalId: userData.deviceId,
      username: userData.username,
      password: userData.password
    })
  })
  .then(handleErrors)
  .catch((error) => {
    console.log("[oneSignalAPI.sendDeviceId] error", error);
  });
};

export default oneSignalAPI;
