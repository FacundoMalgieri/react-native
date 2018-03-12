import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

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
            <Image resizeMode='cover' source={props.placeImage} style={styles.placeImage}/>
            <Text>{props.placeName}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 10,
        backgroundColor: '#eee',
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    placeImage: {
        width: 30,
        height: 30,
        marginRight: 10
    }
});

export default ListItem;