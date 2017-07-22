
import contractAPI from './contract.js';
import oneSignalAPI from './oneSignal';
import userAPI from './user.js';

const API = {};

API.contract = contractAPI;
API.oneSignal = oneSignalAPI;
API.user = userAPI;

export default API;
