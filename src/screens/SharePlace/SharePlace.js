import React, {Component} from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: '#F3D826',
        navBarBackgroundColor: '#691f75',
        navBarTextColor: 'white'
    };

    state = {
        controls: {
            placeName: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        }
    };

    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            }
        });
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle')
                this.props.navigator.toggleDrawer({
                    side: 'left'
                });
        }
    };

    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value,
            this.state.controls.location.value,
            this.state.controls.image.value);
    };

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        });
    };

    imagePickHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        });
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage onImagePicked={this.imagePickHandler}/>
                    <PickLocation onLocationPick={this.locationPickedHandler}/>
                    <PlaceInput
                        placeData={this.state.controls.placeName}
                        onChangeText={this.placeNameChangedHandler}/>
                    <View style={styles.button}>
                        <Button
                            title='Share the Place!'
                            onPress={this.placeAddedHandler}
                            disabled={
                                !this.state.controls.placeName.valid ||
                                !this.state.controls.location.valid ||
                                !this.state.controls.image.valid}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    }
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);