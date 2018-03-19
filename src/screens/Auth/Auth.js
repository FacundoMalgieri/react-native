import React, {Component} from 'react';
import {Button, ImageBackground, StyleSheet, View} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import CustomButton from '../../components/UI/CustomButton/CustomButton';

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    };

    render() {
        return (
            <ImageBackground
                source={{uri: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'}}
                style={styles.backgroundImage}>
                <View style={styles.container}>
                    <MainText style={{marginBottom: 20}}>
                        <HeadingText>Please Log In</HeadingText>
                    </MainText>
                    <CustomButton>Switch to Login</CustomButton>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder={'E-Mail Address...'} style={styles.input}/>
                        <DefaultInput placeholder={'Password...'} style={styles.input}/>
                        <DefaultInput placeholder={'Confirm Password...'} style={styles.input}/>
                    </View>
                    <CustomButton color='#B4D455' onPress={this.loginHandler}>Submit</CustomButton>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        flex:1,
        width: '100%'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    }
});

export default AuthScreen;