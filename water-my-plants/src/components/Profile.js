import React, {useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { PlantContext } from '../contexts/PlantContext';

const Profile = () => { 
    const [update, setUpdate] = useState(false)
    const { userValues, setUserValues } = useContext(PlantContext);

    useEffect(() => {
        axiosWithAuth()
        .get('/') //need endpoint
        .then((res) => {
            setUserValues(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const saveNewInfo = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .put('/', userValues) //need endpoint
        .then((res) => {
            setUpdate(false)
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

    const onClickEdit = (e) => {
        setUpdate(true)
    }

    return (
        <div className="profile-wrapper">
            <h1 className="profile"> My Profile</h1>
                <p>Username:{userValues.username}</p>
                <p>Email:{userValues.email}</p>
                <button onClick = {onClickEdit}>Update My Info</button>
            {update && (
                <form className="profile-form" onSubmit = {saveNewInfo}>
                    <label>Username:
                        <input
                            type = 'text'
                            name = 'username'
                            value = {userValues.username}
                            onChange = {handleChange}
                        />
                    </label>
                    <label>Email:
                        <input
                            type = 'text'
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