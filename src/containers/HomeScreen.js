import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import Constants from '../components/Constants';

export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.firstRow}>
          <Text>Welcome to humanATM app</Text>
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
            <View style={{ flex: 1 }}/>
            <TouchableNativeFeedback>
              <View style={styles.buttonInput}>
                <Text>
                  Accept
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={styles.thirdRow} />
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
    height: Constants.realHeight / 3,
    backgroundColor: 'green',
  },
  secondRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Constants.realHeight / 3,
    backgroundColor: 'yellow',
  },
  thirdRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Constants.realHeight / 3,
    backgroundColor: 'pink',
  },
  input: {
    flexDirection: 'row',
    width: Constants.realWidth * (9 / 10),
    justifyContent: 'center',
    alignContent: 'space-between',
    backgroundColor: 'orange',
  },
  textInput: {
    width: Constants.realWidth * (5.5 / 10),
    backgroundColor: 'blue',
  },
  buttonInput: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Constants.realWidth * (3 / 10),
    backgroundColor: 'green',
  }
});