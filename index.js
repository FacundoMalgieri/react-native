import React from 'react';
import App from './App';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import configureStore from './src/store/configureStore';

const store = configureStore();

const reactRedux = () => (
    <Provider store={store}>
        <App/>
    </Provider>
);
AppRegistry.registerComponent('udemyreactnative', () => reactRedux);
