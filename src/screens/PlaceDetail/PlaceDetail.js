import {Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {deletePlace} from '../../store/actions';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import MapView from 'react-native-maps';

class PlaceDetail extends Component {
    state = {
        viewMode: 'portrait'
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    };

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    };

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape',
        })
    };

    render() {
        return (
            <View style={[styles.container,
                this.state.viewMode === 'portrait'
                    ? styles.portraitContainer
                    : styles.landscapeContainer]}>
                <View style={styles.placeDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image source={this.props.selectedPlace.image} style={styles.previewImage}/>
                    </View>
                    <View style={styles.subContainer}>
                        <MapView style={styles.map}
                                 initialRegion={{
                                     ...this.props.selectedPlace.location,
                                     latitudeDelta: 0.0060,
                                     longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0060
                                 }}>
                            <MapView.Marker coordinate={this.props.selectedPlace.location}/>
                        </MapView>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={[styles.alignButton, styles.buttonContainerDelete]}>
                                <Icon size={30} color='red' name='md-trash'/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 22,
    },
    portraitContainer: {
        flexDirection: 'column'
    },
    landscapeContainer: {
        flexDirection: 'row'
    },
    alignButton: {
        alignItems: 'center'
    },
    previewImage: {
        width: '100%',
        height: '100%'
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    },
    buttonContainerClose: {
        borderRadius: 3,
    },
    buttonContainerDelete: {
        padding: 8,
        borderRadius: 3,
    },
    textStyle: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    subContainer: {
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    placeDetailContainer: {
        flex:2
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    }
};

export default connect(null, mapDispatchToProps)(PlaceDetail);