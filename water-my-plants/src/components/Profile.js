import React, {useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { PlantContext } from '../contexts/PlantContext';

const Profile = () => { 
    const { initialUser } = useContext(PlantContext);
    const [update, setUpdate] = useState(false);
    const [userValues, setUserValues] = useState([])
    const [valueToEdit, setValueToEdit] = useState(initialUser);
    // let { id } = useParams();

    useEffect(() => {
        const fetchUsers = () => {
            axiosWithAuth()
              .get('/api/users')
            //   .get(`/api/users/${id}`)
              .then(res => {
                setUserValues(res.data)
            })
            .catch(err => {
              console.log(err)
            });
          };
          fetchUsers();
    }, [])

    const saveNewInfo = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .put(`/api/users/${userValues.id}`, userValues)
        .then((res) => {
            setUpdate(false)
            // setUserValues(res.data)
            setUserValues(userValues.map(value => {
                return value.id === valueToEdit.id ? res.data : value;
            }));
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleChange = (e) => {
        e.persist()
        setUserValues({
            ...userValues,
            [e.target.name]: e.target.value
        })
    }

    const onClickEdit = (value) => {
        setUpdate(true)
        setValueToEdit(value)
    }

    return (
        <div>
            <h1>My Profile</h1>
                <h3>First Name:{userValues.firstName}</h3>
                <h3>Last Name:{userValues.lastName}</h3>
                <h3>Email: {userValues.email}</h3>
                <button onClick = {onClickEdit}>Update My Info</button>
            {update && (
                <form onSubmit = {saveNewInfo}>
                    <label>First Name:
                        <input
                            type = 'text'
                            name = 'firstName'
                            value = {userValues.firstName}
                            onChange = {handleChange}
                        />
                    </label>
                    <label>Last Name:
                        <input
                            type = 'text'
                            name = 'lastName'
                            value = {userValues.lastName}
                            onChange = {handleChange}
                        />
                    </label>
                    <label>Email:
                        <input
                            type = 'email'
                            name = 'email'
                            value = {userValues.email}
                            onChange = {handleChange}
                        />
                    </label>
                    <label>Password:
                        <input
                            type = 'password'
                            name = 'password'
                            value = {userValues.password}
                            onChange = {handleChange}
                        />
                    </label>
                    <div className="button-row">
                        <button>Save Info</button>
                        <button>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    )
};

export default Profile;