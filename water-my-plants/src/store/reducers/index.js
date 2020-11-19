import {
    // ADD_PLANT,
    // DELETE_PLANT,
    // EDIT_PLANT,
    FETCH_PLANTS_FAIL,
    FETCH_PLANTS_SUCCESS,
    FETCH_PLANTS_START,
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
};

const reducer = (state = initialState, action) => {
    const userID = localStorage.getItem("id")
    switch(action.type){
        case LOGIN_USER:
            console.log('reducer user ID: ', userID)
            return {
                ...state,
                ...state.user,
                user: {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    id: action.payload.id
                }
            };

            case FETCH_PLANTS_START:
                return {
                    ...state,
                    isFetching: true,
                    error: ''
                };

            case FETCH_PLANTS_FAIL:
                return {
                    ...state,
                    isFetching: false,
                    error: action.payload
                };

            case FETCH_PLANTS_SUCCESS:
                return {
                    ...state,
                    plants: action.payload,
                    isFetching: false,
                    error: ''
            };

            // case EDIT_PLANT:
            // const editingPlants = action.payload;
            // const updatedPlants = state.plants.map(plant=>{
            //     if(plant.id === editingPlants.id){
            //         return editingPlants;
            //     }
            //     return plant;
            // });
            // return{
            //     ...state,
            //     plants: updatedPlants
            // };
  
            // case DELETE_PLANT:
            //     return { 
            //         ...state,
            //         plants: action.payload.filter(plant => plant.id !== action.payload)
            //     };

            // case ADD_PLANT:
            // return{
            //     ...state,
            //     plants: [...state.plants, action.payload]
            // };

            default: return state;
    };
  } ;

  export default reducer;