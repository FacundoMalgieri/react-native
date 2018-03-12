import React, {Component} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
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
        this.setState(prevState => {
            return {
                places: prevState.places.concat({
                    key: Math.random(),
                    value: placeName
                })
            };
        });
    };

    /**
     * Deletes a place from the places array.
     *
     * @param key
     */
    placeDeletedHandler = key => {
        this.setState(prevState => ({
            places: prevState.places.filter((place, i) => (place.key !== key))
        }));
    };

    /**
     * The entry point of the app where the magic happens.
     *
     * @returns {*}
     */
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='#F3D826' color='black'
                    barStyle="dark-content"
                />
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
                <ListContainer places={this.state.places} onItemDeleted={this.placeDeletedHandler}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#691f75',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});
