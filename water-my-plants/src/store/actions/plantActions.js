import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const FETCH_PLANT_START = 'FETCH_PLANT_START';
export const FETCH_PLANT_SUCCESS = 'FETCH_PLANT_SUCCESS';
export const FETCH_PLANT_FAILURE = 'FETCH_PLANT_FAILURE';
export const POST_PLANT_START = 'POST_PLANTS_START';
export const POST_PLANT_SUCCESS = 'POST_PLANTS_SUCCESS';
export const POST_PLANT_FAILURE = 'POST_PLANTS_FAILURE';
export const ADD_PLANT = 'ADD_PLANT';
export const DELETE_PLANT = 'DELETE_PLANT';
export const EDIT_PLANT = 'EDIT_PLANT';


export const fetchPlants = ({ setPlantList }) => {
    return(dispatch) => {
    
        axiosWithAuth()
            .get('/api/plants')
            .then(res => {
                setPlantList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
};

export const postPlants = (addPlant) => {
    return(dispatch) => {
        dispatch({ type: POST_PLANT_START })

        axiosWithAuth()
            .post('/api/plants', addPlant)
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
        dispatch({  })

        axiosWithAuth()
            .put()
            .then(res => {
                dispatch({  })
            })
            .catch(err => {
                dispatch({ })
            })
    };
};

export const deletePlant = () => {
    return(dispatch) => {
        dispatch({  })

        axiosWithAuth()
            .delete()
            .then(res => {
                dispatch({  })
            })
            .catch(err => {
                dispatch({  })
            })
    };
};