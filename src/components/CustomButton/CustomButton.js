import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CustomButton = (props) => (
    <TouchableOpacity onPress={props.onPress} >
        <View style={[props.buttonContainer]}>
            <Text style={props.textStyle}>{props.title}</Text>
        </View>
    </TouchableOpacity>
);
export default CustomButton;
