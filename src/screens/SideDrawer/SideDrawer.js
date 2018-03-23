import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {authLogout} from '../../store/actions';

class SideDrawer extends Component {
    logoutHandler = () => {
        this.props.onLogout();
    };

    render() {
        return (
            <View style={[styles.container, {width: Dimensions.get('window').width * 0.6}]}>
                <TouchableOpacity onPress={this.logoutHandler}>
                    <View style={styles.drawerItem}>
                        <Icon style={styles.drawerItemIcon} name='md-log-out' size={30} color='#000'/>
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: 'white'
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee'
    },
    drawerItemIcon: {
        marginRight: 10
    }
});

mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    }
};

export default connect(null, mapDispatchToProps)(SideDrawer);