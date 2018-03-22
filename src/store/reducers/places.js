import {} from '../actions/actionTypes';
import {SET_PLACES} from '../actions/actionTypes';
import {REMOVE_PLACE} from '../actions/actionTypes';

const initialState = {
    places: []
};

const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES:
            return {
                ...state,
                places: action.places
            };
        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter((place) => (place.key !== action.key))
            };
        default:
            return state;
    }
};

export default placesReducer;