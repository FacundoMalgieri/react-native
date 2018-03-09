import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import ListContainer from './src/components/ListContainer/ListContainer';
import PlaceInput from './src/components/PlaceInput/PlaceInput';

export default class App extends Component {
    state = {
        places: []
    };

    /**
     * Adds a new place to the places array.
     *
     * @param placeName
     */
    placeAddedHandler = placeName => {
        this.setState(prevState => ({places: [...prevState.places, placeName]}));
    };

    /**
     * The entry point of the app where the magic happens.
     *
     * @returns {*}
     */
    render() {
        return (
            <View style={styles.container}>
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
                <ListContainer places={this.state.places}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});
