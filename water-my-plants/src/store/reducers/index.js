import {
    FETCH_PLANT_START,
    FETCH_PLANT_SUCCESS,
    FETCH_PLANT_FAILURE,
    POST_PLANT_START,
    POST_PLANT_SUCCESS,
    POST_PLANT_FAILURE,
    // EDIT_PLANT_START,
    // EDIT_PLANT_SUCCESS,
    // EDIT_PLANT_FAILURE,
    // DELETE_PLANT_START,
    // DELETE_PLANT_SUCCESS,
    // DELETE_PLANT_FAILURE
} from '../actions/plantActions';

const initialState = {
    plants: [],
    error: '',
    isFetching: false
}

export const reducer = (state = initialState, action) => {
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
        case POST_PLANT_START:
            return {
                ...state,
                isLoading: true,
            }
        case POST_PLANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                plants: action.payload,
                error: ''
            }
        case POST_PLANT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
    default:
        return state
    };
};

export default reducer;