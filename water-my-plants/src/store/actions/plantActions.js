import axiosWithAuth from '../../utils/axiosWithAuth';

export const FETCH_PLANT_START = 'FETCH_PLANT_START';
export const FETCH_PLANT_SUCCESS = 'FETCH_PLANT_SUCCESS';
export const FETCH_PLANT_FAILURE = 'FETCH_PLANT_FAILURE';


export const getPlants = () => dispatch => {
    dispatch({ type: FETCH_PLANT_START })
    axiosWithAuth()
        .get()
        .then(res => (
            dispatch({ type: FETCH_PLANT_SUCCESS, payload: res.data })
        ))
        .catch(err => (
            dispatch({ type: FETCH_PLANT_FAILURE, payload: err})
        ))
}