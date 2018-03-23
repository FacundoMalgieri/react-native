import {uiStopLoading, uiStartLoading} from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import {AUTH_REMOVE_TOKEN, AUTH_SET_TOKEN} from './actionTypes';
import {AsyncStorage} from 'react-native';
import App from '../../../App';

const API_KEY = 'AIzaSyAR-vBSzBYtySiumRCweNJZ5EfbV9x1oeM';

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY;
        if (authMode === 'signup') {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY;
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(err => {
                console.log(err);
                alert('Authentication failed, please try again.');
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(uiStopLoading());
                if (parsedRes.error) {
                    alert('Authentication failed. Please try again.');
                } else {
                    dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
                    startMainTabs();
                }
            });
    };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        const now = new Date();
        const expireDate = now.getTime() + expiresIn * 1000;
        dispatch(authSetToken(token, expireDate));
        AsyncStorage.setItem('auth:token', token);
        AsyncStorage.setItem('auth:expire', expireDate.toString());
        AsyncStorage.setItem('auth:refreshToken', refreshToken);
    }
};

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expireDate = getState().auth.expireDate;
            if (!token || new Date(expireDate) <= new Date()) {
                let fetchedToken;
                AsyncStorage.getItem('auth:token')
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem('auth:expire');
                    })
                    .then(expireDate => {
                        const parsedExpireDate = new Date(parseInt(expireDate));
                        const now = new Date();
                        if (parsedExpireDate > now) {
                            dispatch(authSetToken(fetchedToken));
                            resolve(fetchedToken);
                        } else {
                            reject();
                        }
                    })
                    .catch(err => reject())
            } else {
                resolve(token);
            }

        });
        return promise
            .catch(err => {
                return AsyncStorage.getItem('auth:refreshToken')
                    .then(refreshToken => {
                        return fetch('https://securetoken.googleapis.com/v1/token?key=' + API_KEY, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: 'grant_type=refresh_token&refresh_token=' + refreshToken
                        });
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        if (parsedRes.id_token) {
                            dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token));
                            return parsedRes.id_token;
                        } else {
                            dispatch(authClearStorage())
                        }
                    });
            })
            .then(token => {
                if (!token) {
                    throw(new Error());
                } else {
                    return token;
                }
            });
    };
};

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem('auth:token');
        AsyncStorage.removeItem('auth:expire');
        return AsyncStorage.removeItem("auth:refreshToken");
    }
};

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => startMainTabs())
            .catch(err => console.log('Failed to fetch token'))
    }
};

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
            .then(() => App());
        dispatch(authRemoveToken());
    }
};

export const authSetToken = (token, expireDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expireDate: expireDate
    };
};

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    };
};