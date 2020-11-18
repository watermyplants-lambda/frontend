import React, { useContext, useState } from 'react';
import { PlantContext } from '../contexts/PlantContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialPlant = {
    id: Date.now(),
    name: '',
    species: '',
    water_schedule: '',
    last_watered: '',
    image_url: ''
};

const PlantList = () => {
    const[editing, setEditing] = useState(false);
    const[plantToEdit, setPlantToEdit] = useState(initialPlant);
    const[addPlant, setAddPlant] = useState(initialPlant);
    const { plantList, setPlantList, userValues } = useContext(PlantContext);

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
                setPlantList(plantList.map(plant => {
                    return plant.id === plantToEdit.id ? res.data : plant;
                }));
            })
            .catch(err => {
                console.log(err)
            });
    };

    const deletePlant = (plant) => {
        axiosWithAuth()
            .delete(`/api/plants/${plant.id}`)
            .then(res => {
                setPlantList(plantList.filter(plant => plant.id !== res.data))
            })
            .catch(err => {
                console.log(err)
            });
    };

    const addNewPlant = (e) => {
        e.preventDefault();
        axiosWithAuth()
        .post(`/api/users/${userValues.id}/plants`, addPlant)
        .then(res => {
            console.log(res)
            setPlantList([
                ...plantList,
                addPlant(res.data)
            ])
            setAddPlant(initialPlant);
        })
        .catch(err => {
            console.log(err)
        });
    };

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const handleImageUpload = (e) => {
        const[file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const {current} = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                current.src = e.target.result;
            }
            reader.readAsDataURL(file)
        }
    };

    return(
        <div className="plants-wrapper">
            <p>My Plants!</p>
            <ul>
                {plantList.map(plant => (
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
                    </div>
                    <div className = "button-row">
                        <button type="submit">Save</button>
                        <button onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </form>
            )}
            <div className="spacer"/>
            <div>
                <form onSubmit={addNewPlant}>
                    <legend>Add a New Plant</legend>
                        <label>
                            Name:
                            <input 
                            onChange = {e => 
                            setAddPlant({...addPlant, name: e.target.value})}
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
                        <label className="upload-image">
                            Click here to upload an image!
                            <input 
                                type="file" 
                                accepts="image/*" 
                                multiple="false"
                                onChange={handleImageUpload}
                                ref={imageUploader}
                                style={{display: "none"}}
                            />
                            <div onClick={() => imageUploader.current.click()}>
                                <img 
                                    ref={uploadedImage} 
                                    className="uploaded-image"
                                    alt=""/>
                            </div>
                        </label>
                        <div>
                            <button type="submit">Add Plant</button>
                        </div>
                </form>
            </div>
        </div>
    );
};

export default PlantList;