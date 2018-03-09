import React from 'react';
import {StyleSheet, View} from 'react-native';
import ListItem from '../ListItem/ListItem';

/**
 * The container of the list. Receives via props and it passes it to the ListItem.
 * Then returns the complete list.
 *
 * @param props Contains the array of places.
 * @returns {*}
 * @constructor
 */
const ListContainer = (props) => {
    const placesOutput = props.places.map((place, i) => (
        <ListItem key={i} placeName={place}/>
    ));
    return (<View style={styles.listContainer}>{placesOutput}</View>);
};

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
    }
});

export default ListContainer;