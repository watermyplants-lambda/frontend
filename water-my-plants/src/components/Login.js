import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import * as yup from 'yup';
import LoginValidation from './LoginValidation';

const initailLogin ={
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}
const initialLoginError ={
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const initialLoginDisabled = true



const Login = () => {
    const [loginForm, setLoginForm] = useState(initailLogin);
    const [loginFormError, setLoginFormError] = useState(initialLoginError);
    const [loginFormDisabled, setLoginFormDisabled] = useState(initialLoginDisabled);
    const [users, setUsers] = useState([]);


    const loginCheck = (loginInfo) => {
        axiosWithAuth.get('/api/auth/login') //May need to rewrite api
        .then((res) => {
            setUsers(res);
            //will use forEach array method to see if all values equal eachother to allow login
        })
        .catch((err) => {
            console.log(err, 'error')
        })
    }

    const editLogin = (name, value) => {
        yup.reach(LoginValidation, name)
        .validate(value)
        .then(() => {
            setLoginFormError({
                ...loginFormError,
                [name]: '',
            });
        })
        .catch((err) => {
            setLoginFormError({
                ...loginFormError,
                [name]: err.errors[0]
            });
        });
        setLoginForm({...loginForm, [name]: value});
    }


    const submitLogin = () => {
        const info ={
            firstname: loginForm.firstName.trim(),
            lastname: loginForm.lastName.trim(),
            email: loginForm.email.trim(),
            password: loginForm.password.trim(),
        }
    }


    useEffect(() =>{
        LoginValidation.isValid(loginForm).then((valid) =>{
            setLoginFormDisabled(!valid);
        })
    }, [loginForm]);

    const onSubmit = evt => {
        evt.preventDefault();
        submitLogin();
    }

    const onChange = evt => {
        const { name, value, type ,checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        editLogin(name, valueToUse);
    }
    
    return(
        <form onSubmit={onSubmit}>

            <div className='loginPage'>
                <p>Login</p>

                <div className='errors'>
                <p>{loginFormError.firstName}</p>
                <p>{loginFormError.lastName}</p>
                <p>{loginFormError.email}</p>
                <p>{loginFormError.password}</p>
                </div>

                <div className='loginForm'>

                    <label>First Name
                        <input 
                            type='text'
                            name='firstName'
                            value={loginForm.firstName}
                            onChange={onChange}
                        />
                    </label>

                    <label>Last Name
                        <input 
                            type='text'
                            name='lastName'
                            value={loginForm.lastName}
                            onChange={onChange}
                        />
                    </label>

                    <label>Email
                        <input 
                            type='text'
                            name='email'
                            value={loginForm.email}
                            onChange={onChange}
                        />
                    </label>

                    <label>Password
                        <input 
                            type='password'
                            name='password'
                            value={loginForm.password}
                            onChange={onChange}
                        />
                    </label>


                    <button className='loginBttn' disabled={loginFormDisabled}>Login</button>

                </div>
            
            </div>
        
        </form>
    )
}


export default Login;