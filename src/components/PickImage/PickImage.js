import React, {Component} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';

class PickImage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image style={styles.previewImage}
                           source={{uri: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'}}/>
                </View>
                <View style={styles.button}>
                    <Button title='Pick Image' onPress={()=> alert('')}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    previewImage: {
        width: '100%',
        height: '100%'
    },
    button: {
        margin: 8
    }
});

export default PickImage;