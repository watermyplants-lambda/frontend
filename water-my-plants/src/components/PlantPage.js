import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import PlantList from './PlantList';

const PlantPage = () => {
    const[plantList, setPlantList] = useState([])

    const fetchPlants = () => {
        // make a get request
        axiosWithAuth()
            .get()
            .then()
            .catch()
    }

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