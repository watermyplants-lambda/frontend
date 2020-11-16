import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const FETCH_PLANT_START = 'FETCH_PLANT_START';
export const FETCH_PLANT_SUCCESS = 'FETCH_PLANT_SUCCESS';
export const FETCH_PLANT_FAILURE = 'FETCH_PLANT_FAILURE';
export const POST_PLANT_START = 'POST_PLANTS_START';
export const POST_PLANT_SUCCESS = 'POST_PLANTS_SUCCESS';
export const POST_PLANT_FAILURE = 'POST_PLANTS_FAILURE';
export const EDIT_PLANT_START = "EDIT_PLANT_START";
export const EDIT_PLANT_SUCCESS = "DELETE_PLANT_SUCCESS";
export const EDIT_PLANT_FAILURE = "EDIT_PLANT_FAILURE";
export const DELETE_PLANT_START = "DELETE_PLANT_START";
export const DELETE_PLANT_SUCCESS = "DELETE_PLANT_SUCCESS";
export const DELETE_PLANT_FAILURE = "DELETE_PLANT_FAILURE";

export const fetchPlants = () => dispatch => {
    return(dispatch) => {
        dispatch({ type: FETCH_PLANT_START })
    
        axiosWithAuth()
            .get('api/plants')
            .then(res => (
                dispatch({ type: FETCH_PLANT_SUCCESS, payload: res.data })
            ))
            .catch(err => (
                dispatch({ type: FETCH_PLANT_FAILURE, payload: err})
            ))
    }
};

export const postPlants = (addPlant) => {
    return(dispatch) => {
        dispatch({ type: POST_PLANT_START })

        axiosWithAuth()
            .post('api/plants', addPlant)
            .then(res => {
                dispatch({ type: POST_PLANT_SUCCESS, payload: res.data })
            })
            .catch(err => {
                dispatch({ type: POST_PLANT_FAILURE, payload: err})
            })
    };
};

export const editPlant = () => {
    return(dispatch) => {
        dispatch({ type: EDIT_PLANT_START })

        axiosWithAuth()
            .put()
            .then(res => {
                dispatch({ type: EDIT_PLANT_SUCCESS, payload: res.data })
            })
            .catch(err => {
                dispatch({ type: EDIT_PLANT_FAILURE, payload: err })
            })
    };
};

export const deletePlant = () => {
    return(dispatch) => {
        dispatch({ type: DELETE_PLANT_START })

        axiosWithAuth()
            .delete()
            .then(res => {
                dispatch({ type: DELETE_PLANT_SUCCESS, payload: res.data })
            })
            .catch(err => {
                dispatch({ type: DELETE_PLANT_FAILURE, payload: err })
            })
    };
};