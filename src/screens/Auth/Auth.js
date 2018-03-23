import React, {Component} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import validate from '../../utility/validation';
import {connect} from 'react-redux';
import {tryAuth} from '../../store/actions/index';

class AuthScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    };

    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        authMode: 'login',
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6,
                    isPass: true
                },
                touched: false
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            },
        }
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }

    componentDidMount() {

    }
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            };
        });
    };

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape',
        })
    };

    updateInputState = (key, val) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: val
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === 'password'
                                ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue)
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: val,
                        valid: validate(val, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            }
        })
    };

    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        };
        this.props.onTryAuth(authData, this.state.authMode);
    };

    render() {
        let headingText = null;
        let confirmPasswordControl = null;
        if (this.state.viewMode === 'portrait') {
            headingText = (
                <MainText style={{marginBottom: 20, color: 'white'}}>
                    <HeadingText>Places Application</HeadingText>
                </MainText>
            );
        }
        let submitButton = (
            <CustomButton onPress={this.authHandler}
                          disabled={
                              !this.state.controls.email.valid ||
                              !this.state.controls.password.valid ||
                              !this.state.controls.confirmPassword.valid &&
                              this.state.authMode === 'signup'}>
                Submit
            </CustomButton>
        );

        if (this.state.authMode === 'signup') {
            confirmPasswordControl = (
                <View style={this.state.viewMode === 'portrait'
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper}>
                    <DefaultInput
                        placeholder={'Confirm Password...'}
                        style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry/>
                </View>
            );
        }
        if (this.props.isLoading) {
            submitButton = <ActivityIndicator/>
        }
        return (
            <ImageBackground
                source={{uri: 'https://c1.staticflickr.com/7/6087/6104370625_02921f1af7_z.jpg'}}
                style={styles.backgroundImage}>
                <KeyboardAvoidingView style={styles.container} behavior='padding'>
                    {headingText}
                    <CustomButton onPress={this.switchAuthModeHandler}>Switch
                        to {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}</CustomButton>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inputContainer}>
                            <DefaultInput
                                placeholder={'E-Mail Address...'}
                                style={styles.input}
                                value={this.state.controls.email.value}
                                onChangeText={(val) => this.updateInputState('email', val)}
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='email-address'/>

                            <View style={this.state.viewMode === 'portrait'
                                ? styles.portraitPasswordContainer
                                : styles.landscapePasswordContainer}>

                                <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                                    ? styles.portraitPasswordWrapper
                                    : styles.landscapePasswordWrapper}>

                                    <DefaultInput
                                        placeholder={'Password...'}
                                        style={styles.input}
                                        value={this.state.controls.password.value}
                                        onChangeText={(val) => this.updateInputState('password', val)}
                                        valid={this.state.controls.password.valid}
                                        touched={this.state.controls.password.touched}
                                        secureTextEntry/>
                                </View>
                                {confirmPasswordControl}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {submitButton}
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    portraitPasswordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    landscapePasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitPasswordWrapper: {
        width: '100%'
    },
    landscapePasswordWrapper: {
        width: '49%'
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);