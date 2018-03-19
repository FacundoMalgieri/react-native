import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React from 'react';
import MainText from '../MainText/MainText';

const CustomButton = (props) => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.button, props.style]}>
            <MainText style={{fontSize:18}}>
                <Text>{props.children}</Text>
            </MainText>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#d4ae13'
    },
});

export default CustomButton;
