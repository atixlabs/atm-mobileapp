import React from 'react';
import {
  StyleSheet,
  Alert,
} from 'react-native';
import { 
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Item,
  ListItem,
  Icon,
} from 'native-base';
import Constants from './Constants';

import WalletService from '../services/WalletService';

const SendScreen = (props) => {
  const toUser = props.navigation.state.params.toUser;
  const fromWallet = props.navigation.state.params.fromWallet;
  const amount = props.navigation.state.params.amount;

  const onConfirm = () => {
    Alert.alert(
      'Transaction confirmation',
      'Do you want to confirm the transaction?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          console.log('toUser: ', toUser);
          console.log('fromWallet: ', fromWallet);
          console.log('amount: ', amount);
          WalletService.send({privateKey: fromWallet.privateKey, fromAddress: fromWallet.address}, toUser.address, amount)
          .then(function(result) {
            props.navigation.navigate('HomeScreen');
          })
          .catch(function(error){
            console.log('[SendScreen.onConfirm] error', error);
            // TODO: show notification
          });
        }},
      ],
      { cancelable: false }
    )
  };

  return (
    <Container>
      <Content>
        <Card>
          <CardItem header>
            <Text>About to exchange your tokkens for cash</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Item>
                <ListItem>
                  <Icon name='person' />
                </ListItem>
                <Text>{toUser.name}</Text>
              </Item>
              <Item>
                <ListItem>
                  <Icon name='md-cash' />
                </ListItem>
                <Text>$ {amount}</Text>
              </Item>
              <Item>
                <ListItem>
                  <Icon name='md-send' />
                </ListItem>
                <Text>{toUser.address}</Text>
              </Item>
            </Body>
          </CardItem>
          <CardItem footer>
            <Button onPress={onConfirm} style={styles.button}>
              <Text>Confirm</Text>
            </Button>
          </CardItem>
       </Card>
      </Content>
    </Container>
  );
}

SendScreen.navigationOptions = {
  title: 'Exchange',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: Constants.realWidth * (9 / 10),
    height: Constants.realHeight / 12,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SendScreen;