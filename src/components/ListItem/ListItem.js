import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

/**
 * An item of a list that receives via props the name to display.
 * Here you can add your customized styles.
 *
 * @param props Contains the name of the item.
 * @returns {*}
 * @constructor
 */
const ListItem = props => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>
            <Text>{props.placeName}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 10,
        backgroundColor: '#eee',
        marginBottom: 5
    }
});

export default ListItem;