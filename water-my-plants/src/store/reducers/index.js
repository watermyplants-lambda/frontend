import {
    ADD_PLANT,
    DELETE_PLANT,
    EDIT_PLANT,
    // FETCH_PLANTS_FAIL,
    // FETCH_PLANTS_SUCCESS,
    // FETCH_PLANTS_START,
    LOGIN_USER
} from '../actions/plantActions';

export const initialState = {
    isFetching: true,
    error: '',
    plants: [],
    user: {
        firstName: '',
        lastName: '',
        email: '',
        id: ''
    }
}

const reducer = (state = initialState, action) => {
    // console.log('reducer', action.payload)
    switch(action.type){
        // case FETCH_PLANTS_START:
        //     return {
        //         ...state,
        //     }

        // case FETCH_PLANTS_FAIL:
        //     return {
        //         ...state,
        //         error: state.payload
        //     }

        // case FETCH_PLANTS_SUCCESS:
        //     return {
        //         ...state,
        //         plants:
        //         error: ''
        //     }

        case LOGIN_USER:
            // console.log(action.payload)
            return {
                ...state, 
                user: {
                    firstName: action.payload.user.firstName,
                    lastName: action.payload.user.lastName,
                    email: action.payload.user.email,
                    id: action.payload.user.id
                }
            }
        case ADD_PLANT:
            return{
                ...state,
                plants: [...state.plants, action.payload]
            };
  
        case EDIT_PLANT:
            const editingPlants = action.payload;
            const updatedPlants = state.plants.map(plant=>{
                if(plant.id === editingPlants.id){
                    return editingPlants;
                }
                return plant;
            });
            return{
                ...state,
                plants: updatedPlants
            }
  
            case DELETE_PLANT:
                return { 
                    ...state,
                    plants: state.plants.filter(plant => plant.id !== action.payload)
                };
  
            default: return state;
    }
  } 

  export default reducer;