import {
    FETCH_PLANTS,
    ADD_PLANT,
    DELETE_PLANT,
    EDIT_PLANT
} from '../actions/plantActions';

const initialState = {
    plant: {},
    plants: [],
}

export const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case FETCH_PLANTS:
            return {
                ...state,
                plants: action.payload
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