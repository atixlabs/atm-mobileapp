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

keyExtractor = (item, index) => item._id;

renderSeparator = () => {
    return <View style={{height: 1, backgroundColor: "#CED0CE"}}/>;
}

goToContactInfo = () => {
    // TODO go to contact info
}

cancelTransaction = () => {
    // TODO cancel transaction
}

List = (props) => {
    return (
        <FlatList data={props.data} keyExtractor={this.keyExtractor} ItemSeparatorComponent={this.renderSeparator}
            renderItem={({item}) =>
                <View style={styles.list}>
                    <Text style={styles.listItem}>$ {item.requestedAmount} - {item.transactionData.state}</Text>
                    <View style={{flex: 1}}/>
                    <View style={{flexDirection: 'row'}}>
                        <Button style={styles.listButton} small backgroundColor="#a5cf35" onPress={this.goToContactInfo}>
                            <Icon name='list'/>
                        </Button>
                        <Button style={styles.listButton} small backgroundColor="#c44b4b" onPress={this.cancelTransaction}>
                            <Icon name='close'/>
                        </Button>
                    </View>
                </View>}/>
    );    
}

List.propTypes = {
    data: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
    listItem: {
        marginRight: 15,
        marginLeft: 15
    },
    listButton: {
        alignContent: 'space-around',
        marginRight: 5,
        marginLeft: 5
    }
});

export default List;