import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

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