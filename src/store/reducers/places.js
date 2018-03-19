import {ADD_PLACE, DELETE_PLACE} from '../actions/actionTypes';

const initialState = {
    places: []
};

const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random(),
                    name: action.placeName,
                    image: {uri: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'}
                })
            };
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter((place) => (place.key !== action.placeKey))
            };
        default:
            return state;
    }
};

export default placesReducer;