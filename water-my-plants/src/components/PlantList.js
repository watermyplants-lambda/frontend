import React, { useState } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

// import AddPlant from './AddPlant';

const initialPlant = {
    id: Date.now(),
    name: '',
    species: '',
    water_schedule: '',
    last_watered: '',
    image_url: ''
};

const PlantList = ({ plants, updatePlants }) => {
    // console.log(plants)
    const[editing, setEditing] = useState(false);
    const[plantToEdit, setPlantToEdit] = useState(initialPlant);

    const editPlant = (plant) => {
        setEditing(true);
        setPlantToEdit(plant);
    };

    const saveEdit = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .put(`/api/plants/${plantToEdit.id}`, plantToEdit)
            .then(res => {
                setEditing(false)
                updatePlants(plants.map(plant => {
                    return plant.id === plantToEdit.id ? res.data : plant;
                }));
            })
            .catch(err => {
                console.log(err)
            });
    };

    const deletePlant = (plant) => {
        // console.log('delete', plant)
        axiosWithAuth()
            .delete(`/api/plants/${plant.id}`)
            .then(res => {
                updatePlants(plants.filter(plant => plant.id !== res.data))
            })
            .catch(err => {
                console.log(err)
            });
    };

    return(
        <div className="plants-wrapper">
            <p>Plants</p>
            <ul>
                {plants.map(plant => (
                    <li key={plant.id} onClick={() => editPlant(plant)}>
                        <span>
                            <span className="delete" onClick={e => {
                            e.stopPropagation();
                            deletePlant(plant);
                                }
                            }>
                                X
                            </span>{" "}
                            {plant.name}
                        </span>
                    </li>
                ))}
            </ul>
            {/* <button onClick={() => setEditing(true)}>Add Plant</button> */}
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>Edit Plant</legend>
                    <label>
                        Name:
                        <input 
                        onChange = {e =>
                        setPlantToEdit({ ...plantToEdit, name: e.target.value })}
                        value={plantToEdit.name}
                        />
                    </label>
                    <label>
                        Species:
                        <input 
                        onChange = {e => 
                        setPlantToEdit({ ...plantToEdit, species: e.target.value })}
                        value={plantToEdit.species}
                        />
                    </label>
                    <label>
                        Water Schedule:
                        <input 
                        onChange = {e => 
                        setPlantToEdit({ ...plantToEdit, water_schedule: e.target.value})}
                        value={plantToEdit.water_schedule}
                        />
                    </label>
                    <label>
                        Last Watered:
                        <input 
                        onChange = {e => 
                        setPlantToEdit({ ...plantToEdit, last_watered: e.target.value})}
                        value={plantToEdit.last_watered}
                        />
                    </label>
                    <div>
                        {/* render image url here */}
                    </div>
                    <div className = "button-row">
                        <button type="submit" onClick={saveEdit}>Save</button>
                        <button onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </form>
            )}
            <div />
            <div>To delete a plant from your list, click "X".</div>
            {/* <AddPlant initialPlant={initialPlant} plants={plants} updatePlants={updatePlants}/> */}
        </div>
    );
};

export default PlantList;