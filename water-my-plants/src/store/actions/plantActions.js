import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const ADD_PLANT = 'ADD_PLANT';
export const DELETE_PLANT = 'DELETE_PLANT';
export const EDIT_PLANT = 'EDIT_PLANT';
export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_PLANTS_START = 'FETCH_PLANTS_START';
export const FETCH_PLANTS_FAIL = 'FETCH_PLANTS_FAIL';
export const FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS';

export const fetchPlants = () => dispatch => {
    dispatch({ type: FETCH_PLANTS_START })

        axiosWithAuth()
            .get('/api/users/1/plants')
            .then(res => {
                dispatch({ type: FETCH_PLANTS_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch({ type: FETCH_PLANTS_FAIL, payload: err.response })
            })

};

export const postPlants = (addPlant) => dispatch => {
        axiosWithAuth()
            .post('/api/users/1/plants', addPlant)
            .then(res => dispatch({
                type: ADD_PLANT,
                payload: res.data
            }))
            .catch(err => {
                console.log(err)
            })
};

export const saveEdit = (plantToEdit) => dispatch => {
        axiosWithAuth()
            .put(`/api/plants/${plantToEdit.id}`, plantToEdit)
            .then(res => dispatch({
                type: EDIT_PLANT,
                payload: res.data
            }))
            .catch(err => {
                console.log(err)
            })
};

export const deletePlant = (plant) => dispatch => {

        axiosWithAuth()
            .delete(`/api/plants${plant.id}`, plant)
            .then(res => dispatch({
                type: DELETE_PLANT,
                payload: res.data.id
            }))
            .catch(err => {
                console.log(err)
            })
};

export const login = data => dispatch => {
    dispatch({
        type: LOGIN_USER,
        payload: data
    })
    // console.log('actions', data)
}

export const registerUser = () => {
    return(dispatch) => {
        dispatch({  })

        axiosWithAuth()
            .post()
            .then()
            .catch()
    };
};