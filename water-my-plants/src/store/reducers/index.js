import {
    FETCH_PLANT_START,
    FETCH_PLANT_SUCCESS,
    FETCH_PLANT_FAILURE,
    POST_PLANT_START,
    POST_PLANT_SUCCESS,
    POST_PLANT_FAILURE,
    EDIT_PLANT_START,
    EDIT_PLANT_SUCCESS,
    EDIT_PLANT_FAILURE,
    DELETE_PLANT_START,
    DELETE_PLANT_SUCCESS,
    DELETE_PLANT_FAILURE
} from '../actions/plantActions';

const initialState = {
    plants: [],
    error: '',
    isFetching: false,
    isPosting: false,
    isEditing: false,
    isDeleting: false,
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
                isPosting: true,
            }
        case POST_PLANT_SUCCESS:
            return {
                ...state,
                isPosting: false,
                plants: action.payload,
                error: ''
            }
        case POST_PLANT_FAILURE:
            return {
                ...state,
                isPosting: false,
                error: action.payload
            }
        case EDIT_PLANT_START:
            return {
                ...state,
                isEditing: true
            }
        case EDIT_PLANT_SUCCESS:
            return {
                ...state,
                isEditing: false,
                plants: action.payload,
                error: ''
            }
        case EDIT_PLANT_FAILURE:
            return {
                ...state,
                isEditing: false,
                error: action.payload
            }
        case DELETE_PLANT_START:
            return {
                ...state,
                isDeleting: true
            }
        case DELETE_PLANT_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                plants: action.payload
            }
        case DELETE_PLANT_FAILURE:
            return {
                ...state,
                isDeleting: false,
                plants: action.payload
            }
    default:
        return state
    };
};

export default reducer;