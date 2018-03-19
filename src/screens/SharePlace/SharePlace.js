import React, {Component} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions';

class SharePlaceScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle')
                this.props.navigator.toggleDrawer({
                    side: 'left'
                });
        }
    };

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    };

    render() {
        return (
            <View>
                <Text>Share a Place with us!</Text>
                <View><Text>Image Preview!</Text></View>
                <Button title='Pick Image'/>
                <View><Text>Map</Text></View>
                <Button title='Locate Me'/>
                <TextInput placeholder='Place Name'/>
                <Button title='Share the Place!'/>
            </View>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    }
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);