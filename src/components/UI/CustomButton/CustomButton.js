import {Text, TouchableNativeFeedback, View, StyleSheet} from 'react-native';
import React from 'react';
import MainText from '../MainText/MainText';

const CustomButton = (props) => {
    const content = (
        <View style={[styles.button, props.style, props.disabled ? styles.disabled : null]}>
            <MainText style={{fontSize: 18}}>
                <Text style={props.disabled ? styles.disabledText : null}>{props.children}</Text>
            </MainText>
        </View>
    );
    if(props.disabled) {
        return content;
    }
    return <TouchableNativeFeedback onPress={props.onPress}>{content}</TouchableNativeFeedback>
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#F3D826'
    },
    disabled: {
        backgroundColor: '#eee',
        borderColor: '#aaa'
    },
    disabledText: {
        color: '#aaa'
    }
});

export default CustomButton;
