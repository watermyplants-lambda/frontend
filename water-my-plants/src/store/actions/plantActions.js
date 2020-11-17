import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const ADD_PLANT = 'ADD_PLANT';
export const DELETE_PLANT = 'DELETE_PLANT';
export const EDIT_PLANT = 'EDIT_PLANT';

export const postPlants = (addPlant) => {
    return(dispatch) => {

        axiosWithAuth()
            .post('/api/plants', addPlant)
            .then(res => dispatch({
                type: ADD_PLANT,
                payload: res.data
            }))
            .catch(err => {
                console.log(err)
            })
    };
};

export const saveEdit = (plantToEdit) => {
    return(dispatch) => {
        dispatch({ type: EDIT_PLANT })

        axiosWithAuth()
            .put(`/api/plants/${plantToEdit.id}`, plantToEdit)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    };
};

export const deletePlant = (plant) => {
    return(dispatch) => {
        dispatch({ type: DELETE_PLANT })

        axiosWithAuth()
            .delete(`/api/plants${plant.id}`, plant)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    };
};