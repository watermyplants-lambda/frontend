import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

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
    const[adding, setAdding] = useState(false);
    const[plantToEdit, setPlantToEdit] = useState(initialPlant);

    const editPlant = (plant) => {
        // console.log(plant)
        setEditing(true);
        setPlantToEdit(plant);
    };

    const saveEdit = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .put(`/api/plants/${plantToEdit.id}`, plantToEdit)
            .then(res => {
                // console.log(res)
                setEditing(false)
                updatePlants(plants.map(plant => {
                    return plant.id === plantToEdit.id ? res.data : plant;
                }));
            })
            .catch(err => {
                console.log(err)
            });
    };

    const addPlant = () => {
        axiosWithAuth()
        .post()
        .then()
        .catch()
    }

    const deletePlant = (plant) => {
        console.log('delete', plant)
        axiosWithAuth()
            .delete(`api/plants/${plant.id}`)
            .then(res => {
                // console.log(res)
                updatePlants(plants.filter(plant => plant.id !== res.data))
            })
            .catch(err => {
                console.log(err)
            });
    };

    return(
        <div className="plants-wrapper">
            <p>Plants</p>
            <ul className="delete">
                {plants.map(plant => (
                    <li key={plant.id} onClick={() => editPlant(plant)}>
                        <span>
                            <span onClick={e => {
                            e.stopPropagation();
                            deletePlant(plant);
                                }
                            }>
                                x
                            </span>{" "}
                            {plant.name}
                        </span>
                    </li>
                ))}
            </ul>
            <button onClick={() => setEditing(true)}>Add Plant</button>
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
                    <div>
                        <button type="submit">Save</button>
                        <button onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default PlantList;