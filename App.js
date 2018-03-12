import React, {Component} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

export default class App extends Component {
    state = {
        places: [],
        selectedPlace: null
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
                    name: placeName,
                    image: {uri: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'}
                })
            };
        });
    };

    /**
     * Deletes a place from the places array.
     *
     * @param key
     */
    placeSelectedHandler = key => {
        this.setState(prevState => ({selectedPlace: prevState.places.find(place => place.key === key)}));
    };

    placeDeletedHandler = () => {
        this.setState(prevState => ({
            places: prevState.places.filter((place) => (place.key !== prevState.selectedPlace.key)),
            selectedPlace: null
        }));
    };

    modalClosedHandler = () => {
        this.setState({selectedPlace: null});
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
                    barStyle="dark-content"/>
                <PlaceDetail
                    selectedPlace={this.state.selectedPlace}
                    onItemDeleted={this.placeDeletedHandler}
                    onModalClose={this.modalClosedHandler}/>
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
                <PlaceList
                    places={this.state.places}
                    onItemSelected={this.placeSelectedHandler}/>
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
