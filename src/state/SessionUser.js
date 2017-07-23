import { AsyncStorage } from 'react-native';

const User = {};
User.prototype = {
  getAddress: function() {
    return this.address;
  },
  getPrivateKey: function() {
    return this.privateKey;
  }
}

const USER_LOGGED_IN = 'USER_LOGGED_IN';

const SessionUser = {
  user: undefined,
  userIsLoggedIn() {
    return !! this.user;
  },
  saveUser: async function(userInfo) {
    const userSerialized = JSON.stringify(userInfo);
    console.log("[SessionUser.saveUser] user serialized", userSerialized);
    try {
      await AsyncStorage.setItem(USER_LOGGED_IN, userSerialized)
      return this.user = Object.create(User.prototype, {
        mnemonic: { value: userInfo.mnemonic },
        privateKey: { value: userInfo.privateKey },
        publicKey: { value: userInfo.publicKey },
        address: { value: userInfo.address }
      });
    } catch(error) {
      console.log('[SessionUser.saveUser] User cannot be saved:', error);
      throw error;
    };
  },
  loadUser: async function() {
    try {
      const userInfoSerialized = await AsyncStorage.getItem(USER_LOGGED_IN);
      const userInfo = JSON.parse(userInfoSerialized);
      if(!userInfo) return;
      this.user = Object.create(User.prototype, {
        mnemonic: { value: userInfo.mnemonic },
        privateKey: { value: userInfo.privateKey },
        publicKey: { value: userInfo.publicKey },
        address: { value: userInfo.address }
      });
      return this.user;
    } catch (error) {
      console.log('[SessionUser.loadUser] User in session cannot be loaded:', error);
      throw error;
    }
  },
  // Allways use it after SessionUser.saveUser or SessionUser.loadUserSession
  getUser() {
    return this.user;
  }
};

export default SessionUser;
