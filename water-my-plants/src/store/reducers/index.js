import {
    FETCH_PLANT_START,
    FETCH_PLANT_SUCCESS,
    FETCH_PLANT_FAILURE,
    POST_PLANT_START,
    POST_PLANT_SUCCESS,
    POST_PLANT_FAILURE,
    ADD_PLANT,
    DELETE_PLANT,
    EDIT_PLANT
} from '../actions/plantActions';

const initialState = {
    plant: [],
    error: '',
    isLoading: false,
    initialPlant: {
        id: Date.now(),
        name: '',
        species: '',
        water_schedule: '',
        last_watered: '',
        image_url: ''
    },
    initialUser: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }
}

export const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case FETCH_PLANT_START:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case FETCH_PLANT_SUCCESS:
            return {
                ...state,
                plant: action.payload,
                isLoading: false,
                error: ''
            }
        case FETCH_PLANT_FAILURE:
            return {
                ...state,
                isLoading: false,
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
                plant: action.payload,
                error: ''
            }
        case POST_PLANT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case DELETE_PLANT:
            return {
                ...state,
                initialPlant: state.initialPlant.filter(plant => {
                    return plant.id !== action.payload.id
                })
            }
        case ADD_PLANT:
            return {
                ...state,
            }
        case EDIT_PLANT:
            return {
                ...state,
                initialPlant: {
                    ...state.initialPlant,
                    name: state.name,
                    species: state.species,
                    water_schedule: state.water_schedule,
                    last_watered: state.last_watered,
                }
            }
    default:
        return state
    };
};

export default reducer;