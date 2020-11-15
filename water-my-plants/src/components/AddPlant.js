import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const AddPlant = ({ initialPlant, plants, updatePlants }) => {
    const[addPlant, setAddPlant] = useState(initialPlant);

    const addNewPlant = (e) => {
        e.preventDefault();
        axiosWithAuth()
        .post('/api/plants', addPlant)
        .then(res => {
            updatePlants([
                ...plants,
                addPlant(res.data)
            ])
        })
        .catch(err => {
            console.log(err)
        });
    };

    return (
        <div>
            <form className="plants-wrapper" onSubmit={addNewPlant}>
                <legend>Add Plant</legend>
                    <label>
                        Name:
                        <input 
                        onChange={e => 
                        setAddPlant({
                            ...addPlant, name: e.target.value})}
                        value={addPlant.name}
                        />
                    </label>
                    <label>
                        Species:
                        <input 
                        onChange = {e => 
                        setAddPlant({ ...addPlant, species: e.target.value })}
                        value={addPlant.species}
                        />
                    </label>
                    <label>
                        Water Schedule:
                        <input 
                        onChange = {e => 
                        setAddPlant({ ...addPlant, water_schedule: e.target.value})}
                        value={addPlant.water_schedule}
                        />
                    </label>
                    <label>
                        Last Watered:
                        <input 
                        onChange = {e => 
                        setAddPlant({ ...addPlant, last_watered: e.target.value})}
                        value={addPlant.last_watered}
                        />
                    </label>
                    <div>
                        <button type="submit">Add Plant</button>
                    </div>
            </form>
        </div>
    )
};

export default AddPlant;