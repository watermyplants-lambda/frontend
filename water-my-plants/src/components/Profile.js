import React, {useState, useEffect} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';


const initialUserValues = {
    firstName: '',
    lastName:'',
    email: '',
    password: ''
}

const Profile = () => { 
    const [update, setUpdate] = useState(false)
    const [userValues, setUserValues] = useState(initialUserValues)

    useEffect(() => {
        axiosWithAuth()
        .get('/api/users/')
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
        .put('/api/users/:id', userValues)
        .then((res) => {
            setUpdate(false)
            setUserValues(res.data)
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

    
    // need to be able to update phone number and password
    // user must be autenticated 
    // use axiosWithAuth
    // create form 
    // put request 
    // get request with url with user id to display correct user data?

    return (
        <div>
            <h1>User Profile</h1>
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
                    <button>Save Info</button>
                </form>
            )}
        </div>
    )
};

export default Profile;