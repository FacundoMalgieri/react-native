import React, {Component} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

/**
 * The component to display an input field where the user can add new places to the array.
 *
 * @param props Receives the handlers functions and the state from the parent.
 * @returns {*}
 * @constructor
 */
class PlaceInput extends Component {
    state = {
        placeName: '',
    };

    /**
     * Handler for the place input.
     * Sets the state to the value entered by the user.
     *
     * @param val The value
     */
    placeNameChangedHandler = val => {
        this.setState({placeName: val});
    };

    /**
     * Handler for the Add button.
     * Validates if the input isn't empty.
     * Sets the state keeping the previous one via immutability.
     */
    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === '') {
            return;
        }
        this.props.onPlaceAdded(this.state.placeName);
    };

    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder='An awesome place'
                    value={this.state.placeName}
                    onChangeText={this.placeNameChangedHandler}/>
                <Button
                    styles={styles.addButton}
                    title='Add'
                    onPress={this.placeSubmitHandler}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInput: {
        width: '70%',
        borderColor: "#ccc",
    },
    addButton: {
        width: '30%',
    }
});

export default PlaceInput;