import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {deletePlace} from '../../store/actions';
import {connect} from 'react-redux';

class PlaceDetail extends Component {
    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    };

    render() {
        return (
            <View>
                <View>
                    <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={this.placeDeletedHandler}>
                        <View style={[styles.alignButton, styles.buttonContainerDelete]}>
                            <Icon size={30} name='ios-trash'/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    alignButton: {
        alignItems: 'center'
    },
    placeImage: {
        width: '100%',
        height: 200
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    },
    buttonContainerClose: {
        padding: 8,
        borderRadius: 3,
        backgroundColor: '#F3D826',
    },
    buttonContainerDelete: {
        padding: 8,
        borderRadius: 3,
        backgroundColor: 'red',
    },
    textStyle: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    }
};

export default connect(null, mapDispatchToProps)(PlaceDetail);