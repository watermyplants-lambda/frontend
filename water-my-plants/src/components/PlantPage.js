import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import { fetchPlants } from '../store/actions/plantActions';

import PlantList from './PlantList';

const PlantPage = () => {
    const[plantList, setPlantList] = useState([])

    const fetchPlants = () => {
        axiosWithAuth()
            .get('/api/plants')
            .then(res => {
                setPlantList(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    return (
        <div>
            <PlantList plants={plantList} updatePlants={setPlantList}/>
        </div>

    );
};

export default PlantPage;

// const mapStateToProps = (state) => {
//     return {
//         isFetching: state.isFetching,
//         plants: state.plants,
//         error: state.error
//     }
// };

// export default connect(mapStateToProps, { fetchPlants })(PlantPage);