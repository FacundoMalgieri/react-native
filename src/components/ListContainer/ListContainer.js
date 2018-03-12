import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListItem from '../ListItem/ListItem';

/**
 * The container of the list. Receives via props and it passes it to the ListItem.
 * Then returns the complete list.
 *
 * @param props Contains the array of places.
 * @returns {*}
 * @constructor
 */
const ListContainer = props => {
    return (
        <FlatList
            style={styles.listContainer}
            data={props.places}
            renderItem={(info) => (
                <ListItem
                    placeName={info.item.value}
                    onItemPressed={() => props.onItemDeleted(info.item.key)}/>
            )}/>
    )
};

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
    }
});

export default ListContainer;