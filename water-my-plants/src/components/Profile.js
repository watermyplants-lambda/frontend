import React, {useState, useEffect} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';


const initialUserValues = {
    username: '',
    email:'',
    password: ''
}

const Profile = () => { 
    const [update, setUpdate] = useState(false)
    const [userValues, setUserValues] = useState(initialUserValues)

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
                <h3>Username:{userValues.username}</h3>
                <h3>Email:{userValues.email}</h3>
                <button onClick = {onClickEdit}>Update My Info</button>
            {update && (
                <form onSubmit = {saveNewInfo}>
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
                    <button>Save Info</button>
                </form>
            )}
        </div>
    )
};

export default Profile;