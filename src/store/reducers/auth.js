import {AUTH_REMOVE_TOKEN, AUTH_SET_TOKEN} from '../actions/actionTypes';

const initialState = {
    token: null,
    expireDate: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token,
                expireDate: action.expireDate
            };
        case AUTH_REMOVE_TOKEN:
            return {
                ...state,
                token: null,
                expireDate: null
            };
        default:
            return state;
    }
};

export default authReducer;