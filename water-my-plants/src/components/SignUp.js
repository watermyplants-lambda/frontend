import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const initialSignup ={
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}
const initialUsers=[];

const SignUp () => {
    const [signupForm, setSignup] = useState(initialSignup);
    const [users, setUsers] = useState(initialUsers);


    const saveNewUser = (newUser) =>{
        axios
        .post('/', newUser)
        .then((res) =>{
            setUsers([res.data, ...users]);
            setSignup(initialSignup);
        })
        .catch((err) =>{
            console.log(err, 'error')
        })
    }

    const submitSignup = () ={
        const newUser ={
            firstName: signupForm.firstName.trim(),
            lastName: signupForm.lastName.trim(),
            email: signupForm.email.trim(),
            password: signupForm.password.trim(),
        }
        saveNewUser(newUser);
    }


    return(
        <form className='signup form' onSubmit={}>
            <div>
                <p>Sign Up</p>
            </div>
            <div className='signup'>
                <label>First Name
                <input 
                            type='text'
                            name='firstName'
                            value={signupForm.firstName}
                        />
                    </label>

                    <label>Last Name
                        <input 
                            type='text'
                            name='lastName'
                            value={signupForm.lastName}
                        />
                    </label>

                    <label>Email
                        <input 
                            type='text'
                            name='email'
                            value={signupForm.email}
                        />
                    </label>

                    <label>Password
                        <input 
                            type='text'
                            name='password'
                            value={signupForm.password}
                        />
                    </label>

                    <button className='loginBttn'>Login</button>
                
                </label>
            
            
            
            </div>
        
        
        
        </form>
    )


}

export default SignUp;
