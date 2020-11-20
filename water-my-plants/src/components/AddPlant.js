import React, { useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { PlantContext } from '../contexts/PlantContext';
import { postPlants } from '../store/actions/plantActions';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const AddPlant = ({ plantList, setPlantList }) => {
// const AddPlant = (props) => {
    const { initialPlant } = useContext(PlantContext);
    const[addPlant, setAddPlant] = useState(initialPlant);
    const userID = localStorage.getItem("id")

    const addNewPlant = (e) => {
        e.preventDefault();
        // props.postPlants();
        axiosWithAuth()
        .post(`/api/users/${userID}/plants`, addPlant)
        .then(res => {
            // console.log(res)
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
        };
    };

    return (
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
    );
};

const mapStateToProps = state => {
    return {
        plants: state.plants
    };
};

export default connect(mapStateToProps, { postPlants })(AddPlant);