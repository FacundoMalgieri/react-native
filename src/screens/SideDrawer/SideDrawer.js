import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';

class SideDrawer extends Component {
    render() {
        return (
            <View style={[styles.container, {width: Dimensions.get('window').width * 0.6}]}>
                <Text>SideDrawer</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 22,
        backgroundColor: 'white'
    }
});

export default SideDrawer;