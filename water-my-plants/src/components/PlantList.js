import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { PlantContext } from '../contexts/PlantContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { fetchPlants } from '../store/actions/plantActions';
import AddPlant from './AddPlant';

const PlantList = (props) => {
    const { initialPlant } = useContext(PlantContext);
    const[editing, setEditing] = useState(false);
    const[plantToEdit, setPlantToEdit] = useState(initialPlant);
    const[plantList, setPlantList] = useState([])
    // const { id } = useParams();

    useEffect(() => {
        props.fetchPlants()
    }, [])

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
                props.plants.map(plant => {
                    return plant.id === plantToEdit.id ? res.data : plant;
                });
            })
            .catch(err => {
                console.log(err)
            });
    };

    const deletePlant = (plant) => {
        axiosWithAuth()
            .delete(`/api/plants/${plant.id}`)
            .then(res => {
                props.plants.filter(plant => plant.id !== res.data)
            })
            .catch(err => {
                console.log(err)
            });
    };

    return(
        <div className="plants-wrapper">
            <p>My Plants!</p>
            <ul>
                {props.plants.map(plant => (
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
            {/* <AddPlant /> */}
            <AddPlant plants={plantList} setPlantList={setPlantList}/>
        </div> 
    );
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.isFetching,
        error: state.error,
        plants: state.plants
    }
}

export default connect(mapStateToProps, { fetchPlants })(PlantList);