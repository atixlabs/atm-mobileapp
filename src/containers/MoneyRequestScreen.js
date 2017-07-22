import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import {
  Button,
} from 'native-base';
import Loading from '../components/Loading';
import API from '../services/API/API';

import Constants from '../components/Constants';

let mounted;

export default class MoneyRequestScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loadedUser: false,
      user: {},
      inputText: '',
    };
  }

  componentDidMount() {
    mounted = true;
    console.log('Loading');
    API.user.getUserData('n2eMqTT929pb1RDNuqEnxdaLau1rxy3efr')
    .then((user) => {
      console.log('Loaded');
      if(mounted) {
        this.setState({ user, loadedUser: true });
      }
    })
    .catch((error) => {
      console.error('login error', error);
    });
  }

  componentWillUnmount() {
    mounted = false;
  }

  verifyAmount(amount) {
    let inputText = amount;
    if(amount > this.state.user.appData.maxAllowedWithdrawal) {
      inputText = this.state.user.appData.maxAllowedWithdrawal;
    }
    inputText = inputText.toString();
    this.setState({ inputText });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loadedUser ? (
          <View>
            <View style={styles.firstRow}>
              <Image
                style={{
                  flex: 1,
                  resizeMode: 'contain',
                }}
                source={require('../images/humanATM_png.png')}
              />
            </View>
            <View style={styles.secondRow}>
              <View style={styles.input}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Input the amount"
                  keyboardType="numeric"
                  autoCorrect={false}
                  value={this.state.inputText}
                  onChangeText={(input) => this.verifyAmount(input)}
                />
              </View>
            </View>
            <View style={styles.thirdRow}>
              <View style={styles.input}>
                <Button success={true} style={styles.buttonInput}>
                  <Text>
                    Request
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        ) : (
          <Loading />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: (Constants.realHeight - Constants.tabviewHeight) / 3
  },
  secondRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: (Constants.realHeight - Constants.tabviewHeight) / 3
  },
  thirdRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: (Constants.realHeight - Constants.tabviewHeight) / 3
  },
  input: {
    width: Constants.realWidth * (9 / 10),
    justifyContent: 'center',
    alignContent: 'space-between'
  },
  textInput: {
    height: Constants.realHeight / 12,
    textAlign: 'center'
  },
  buttonInput: {
    width: Constants.realWidth * (9 / 10),
    height: Constants.realHeight / 12,
    justifyContent: 'center',
    alignItems: 'center'
  }
});