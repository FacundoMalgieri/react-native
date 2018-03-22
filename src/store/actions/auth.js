import {uiStopLoading, uiStartLoading} from './index';

export const tryAuth = authData => {
    return dispatch => {
        dispatch(authSignup(authData));
    };
};

export const authSignup = authData => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAR-vBSzBYtySiumRCweNJZ5EfbV9x1oeM', {
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
                console.log(parsedRes);
                dispatch(uiStopLoading());
            });
    };
};