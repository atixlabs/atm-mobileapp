import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';
import PropTypes from 'prop-types';

export default class List extends React.Component {
    
    keyExtractor = (item, index) => item._id;

    constructor(props) {
        super(props);
        this.data = props.data;
    }

    render() {
        return (
            <FlatList data={this.data} keyExtractor={this.keyExtractor}
                renderItem={({item}) =>
                    <View style={styles.list}>
                        <Text style={styles.listItem}>$ {item.requestedAmount} - {item.transactionData.state}</Text>
                        <Button title="Info" style={styles.listButton} color="#a5cf35"/>
                        <Button title="Cancel" style={styles.listButton} color="#c44b4b"/>
                    </View>}/>
        );
    }
}

List.propTypes = {
    data: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    listItem: {
        marginRight: 15,
        marginLeft: 15
    },
    listButton: {
        marginRight: 20,
        marginLeft: 20
    }
});