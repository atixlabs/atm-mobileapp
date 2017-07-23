import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import {
	Button,
	Icon
} from 'native-base';
import API from '../services/API/API';
import Constants from '../components/Constants';
import SessionUser from '../state/SessionUser';

let mounted;
let user;

export default class List extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			requests: [],
		};
	}

	componentDidMount() {
    mounted = true;

		user = SessionUser.getUser();
    API.user.getUserRequests(user.address)
		.then((requests) => {
			console.log('LIST');
      console.log('Loaded', requests);
      if(mounted) {
        this.setState({ requests, loadedUser: true });
      }
    })
    .catch((error) => {
      console.error('login error', error);
    });
  }

  componentWillUnmount() {
    mounted = false;
  }

	keyExtractor(item, index) {
		item._id;
	}

	renderSeparator() {
		return <View style={{height: 1, backgroundColor: "#CED0CE"}}/>;
	}

	goToContactInfo(item) {
		this.props.navigation.navigate('SendScreen', {
			toUser: {
				name: item.retailUser.personalInformation.fullName, 
				address: item.retailUser.address,
			},
			fromWallet: {
				privateKey: user.privateKey,
				address: user.address,
			},
			amount: item.requestedAmount,
		});
	}

	cancelTransaction() {
		// TODO cancel transaction
	}

	render () {
		return (
			<FlatList data={this.state.requests} keyExtractor={this.keyExtractor} ItemSeparatorComponent={this.renderSeparator}
				renderItem={({item}) =>
					<View style={styles.list} key={item._id}>
						<Text style={styles.listItem}>$ {item.requestedAmount} - {item.state}</Text>
						<View style={{flex: 1}}/>
						<View key={item._id} style={{flexDirection: 'row'}}>
							<Button style={styles.listButton} small success={true} onPress={() => this.goToContactInfo(item)}>
								<Icon name='list'/>
							</Button>
							<Button key={item._id} style={styles.listButton} small backgroundColor="#c44b4b" onPress={this.cancelTransaction}>
								<Icon name='close'/>
							</Button>
						</View>
					</View>
				}
			/>
		);
	}
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
				margin: 5,
				height: Constants.realHeight / 12,
    },
    listItem: {
        fontWeight: 'bold',
        color: 'black',
        marginRight: 15,
        marginLeft: 15
    },
    listButton: {
        alignContent: 'space-around',
        marginRight: 5,
        marginLeft: 5
    }
});