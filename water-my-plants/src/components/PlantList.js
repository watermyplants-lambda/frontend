import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialPlant = {
    id: Date.now(),
    nickname: '',
    species: '',
    waterFrequency: 0,
    // image: ''
}

const PlantList = ({ plants, updatePlants }) => {
    const[editing, setEditing] = useState(false);
    const[plantToEdit, setPlantToEdit] = useState(initialPlant);

    const editPlant = () => {
        setEditing(true);
        setPlantToEdit();
    };

    const saveEdit = (e) => {
        e.preventDefault();
        // make a put request
        axiosWithAuth()
            .put()
            .then(res => {
                console.log(res)
                setEditing(false)
                setPlantToEdit(plants.map(plant => {
                    return plant.id === plantToEdit.id ? res.data : plant;
                }))
            })
            .res(err => {
                console.log(err)
            })
    };

    const deletePlant = (e) => {
        // make a delete request
        axiosWithAuth()
            .delete()
            .then(res => {
                console.log(res)
                updatePlants(plants.filter(plant => plant.id !== res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <div>
            <p>Plants</p>
            <ul>
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
                            {plant.nickname}
                        </span>
                    </li>
                ))}
            </ul>
            <button onClick={() => setEditing(true)}>Add Plant</button>
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>Edit Plant</legend>
                    <label>
                        Nickname:
                        <input 
                        onChange = {e =>
                        setPlantToEdit({ ...plantToEdit, nickname: e.target.value })}
                        value={plantToEdit.nickname}
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
                        Water Frequency:
                        <input 
                        onChange = {e => 
                        setPlantToEdit({ ...plantToEdit, waterFrequency: e.target.value})}
                        value={plantToEdit.waterFrequency}
                        />
                    </label>
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