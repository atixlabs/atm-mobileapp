import React from 'react';

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
  Icon
} from 'native-base';

import WalletService from '../services/WalletService';

const SendScreen = (props) => {
  const toUser = props.navigation.state.params.toUser;
  const fromWallet = props.navigation.state.params.fromWallet;
  const amount = props.navigation.state.params.amount;

  const onConfirm = () => {
    // TODO: call a popup confirmation
    WalletService.send({privateKey: fromWallet.privateKey, fromAddress: fromWallet.address}, toUser.address, amount)
    .then(function(result) {
      props.navigation.navigate('HomeScreen');
    })
    .catch(function(error){
      console.log('[SendScreen.onConfirm] error', error);
      // TODO: show notification
    }) 
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
                <Text>{amount}</Text>
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
            <Button onPress={onConfirm}>
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

export default SendScreen;