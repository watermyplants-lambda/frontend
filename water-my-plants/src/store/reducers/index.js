import {
    ADD_PLANT,
    DELETE_PLANT,
    EDIT_PLANT
} from '../actions/plantActions';

const initialState = {
    plants: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
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