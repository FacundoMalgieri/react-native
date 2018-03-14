import React from 'react';
import {Modal, View, Image, Text, Button, StyleSheet} from 'react-native';
import CustomButton from '../CustomButton/CustomButton';

const PlaceDetail = props => {
    let modalContent = null;
    if (props.selectedPlace) {
        modalContent = (
            <View>
                <Image source={props.selectedPlace.image} style={styles.placeImage}/>
                <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
            </View>
        );
    }
    return (
        <Modal onRequestClose={props.onModalClose} visible={props.selectedPlace !== null} animationType='slide'>
            <View>
                {modalContent}
                <View>
                    <CustomButton
                        buttonContainer={styles.buttonContainerDelete}
                        textStyle={styles.textStyle}
                        title='DELETE'
                        onPress={props.onItemDeleted}/>
                    <CustomButton
                        buttonContainer={styles.buttonContainerClose}
                        textStyle={styles.textStyle}
                        title='CLOSE'
                        onPress={props.onModalClose}/>
                </View>
            </View>
        </Modal>
    )
};
const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#691f75'
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
export default PlaceDetail;