import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';

import Constants from '../components/Constants';

export default class MoneyRequestScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.firstRow}>
          <Text style={{ fontSize: Constants.realHeight / 25 }}>Welcome to</Text>
          <Text style={{ fontSize: Constants.realHeight / 20 }}>humanATM app</Text>
        </View>
        <View style={styles.secondRow}>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              placeholder="Input the amount"
              keyboardType="numeric"
              autoCorrect={false}
              value={this.props.inputText}
              onChangeText={(inputText) => this.setState({inputText})}
            />
          </View>
        </View>
        <View style={styles.thirdRow}>
          <View style={styles.input}>
            <TouchableNativeFeedback>
              <View style={styles.buttonInput}>
                <Text>
                  Request
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  firstRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: (Constants.realHeight - Constants.tabviewHeight) / 3,
    backgroundColor: 'green',
  },
  secondRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: (Constants.realHeight - Constants.tabviewHeight) / 3,
    backgroundColor: 'yellow',
  },
  thirdRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: (Constants.realHeight - Constants.tabviewHeight) / 3,
    backgroundColor: 'pink',
  },
  input: {
    width: Constants.realWidth * (9 / 10),
    justifyContent: 'center',
    alignContent: 'space-between',
    backgroundColor: 'orange',
  },
  textInput: {
    height: Constants.realHeight / 12,
    backgroundColor: 'blue',
    textAlign: 'center',
  },
  buttonInput: {
    height: Constants.realHeight / 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  }
});