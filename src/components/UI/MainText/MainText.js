import React from 'react';
import {Text, StyleSheet} from 'react-native';

const MainText = props => (
    <Text style={[styles.mainText, props.style]}>{props.children}</Text>
);

const styles = StyleSheet.create({
    mainText: {
        color: '#434343',
        fontFamily: 'Roboto'
    }
});

export default MainText;