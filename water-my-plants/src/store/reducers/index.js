import {
    FETCH_PLANT_START,
    FETCH_PLANT_SUCCESS,
    FETCH_PLANT_FAILURE
} from '../actions/plantActions';

const initialState = {
    plants: [],
    error: '',
    isFetching: false
}

export default function reducer(state = initialState, action) {
    switch ( action.type ) {
        case FETCH_PLANT_START:
            return {
                ...state,
                isFetching: true,
                error: ''
            }
        case FETCH_PLANT_SUCCESS:
            return {
                ...state,
                plants: action.payload,
                isFetching: false,
                error: ''
            }
        case FETCH_PLANT_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default:
            return state
    };
};