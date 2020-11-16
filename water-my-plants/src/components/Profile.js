import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const Profile = () => {
    const[user, setUser] = useState(initialUser)

    axiosWithAuth()
        .get('/auth/users')
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    // need to be able to update phone number and password
    // user must be autenticated 
    // use axiosWithAuth
    // create form 
    // get request with url with user id to display correct user data?
    // put request to update user data

    return (
        <div>
            User Profile
        </div>
    )
};

export default Profile;