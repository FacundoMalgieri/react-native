import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {
    state = {
        focusedLocation: {
            latitude: -34.601546,
            longitude: -58.401883,
            latitudeDelta: 0.0060,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0100
        },
        locationChosen: false
    };

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        });
    };

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
                const coordsEvent = {
                    nativeEvent: {
                        coordinate: {
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude
                        }
                    }
                };
                this.pickLocationHandler(coordsEvent);
            },
            err => {
                console.log(err);
                alert('Error fetching the position.')
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}>
                    <MapView.Marker coordinate={this.state.focusedLocation}/>
                </MapView>
                <View style={styles.button}>
                    <Button title='Locate Me' onPress={this.getLocationHandler}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: 250
    },
    button: {
        margin: 8
    }
});

export default PickLocation;