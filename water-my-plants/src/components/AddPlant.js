import React, { useState, useContext } from 'react';

import { connect } from 'react-redux';
import { PlantContext } from '../contexts/PlantContext';
import { postPlants } from '../store/actions/plantActions';

const AddPlant = (props) => {
    const { initialPlant } = useContext(PlantContext);
    const[addPlant, setAddPlant] = useState(initialPlant);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.postPlants(addPlant);
        resetForm();
    };

    const handleChange = (e) => {
        setAddPlant({...addPlant, [e.target.name]: e.target.value})
    };

    const resetForm = () => {
        setAddPlant({
            initialPlant
        })
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
                <form onSubmit={handleSubmit}>
                    <legend>Add a New Plant</legend>
                        <label>
                            Name:
                            <input
                            type="text" 
                            onChange={handleChange}
                            />
                        </label>
                        <label>
                            Species:
                            <input 
                            type="text"
                            onChange={handleChange}
                            />
                        </label>
                        <label>
                            Water Schedule:
                            <input 
                            type="text"
                            onChange={handleChange}
                            />
                        </label>
                        <label>
                            Last Watered:
                            <input 
                            type="text"
                            onChange={handleChange}
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
                            <button onClick={handleSubmit} type="submit">Add Plant</button>
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