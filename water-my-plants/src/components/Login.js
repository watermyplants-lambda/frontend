import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth'
import * as yup from 'yup';
import LoginValidation from '../validation/LoginValidation';
import { useHistory } from 'react-router-dom';

const initialLoginValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};

const initialLoginErrors = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};

const initialLoginDisabled = true
const initialLoginUser = []

const Login = () => {
    const [loginValues, setLoginValues] = useState (initialLoginValues);
    const [loginFormError, setLoginFormError] = useState(initialLoginErrors);
    const [loginFormDisabled, setLoginFormDisabled] = useState(initialLoginDisabled);
    const [loginUser, setLoginUser] = useState(initialLoginUser);

    const history = useHistory();

    const postLoginUser = (newLoginUser) => {
        axiosWithAuth()
        .post('/api/auth/login', newLoginUser) 
        .then((res) => {
            window.localStorage.setItem("token", res.data.payload)
            setLoginUser([...loginUser, res.data]);
            setLoginValues(initialLoginValues)
        })
        .catch((err) => {
            console.log(err, 'error')
        });
    };

    const loginInputChange = (name, value) => {
        yup
            .reach(LoginValidation, name)
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
        setLoginValues({...loginValues, [name]: value});
    };

    const loginFormSubmit = () => {
        const newLoginUser = {
            firstname: loginValues.firstName.trim(),
            lastname: loginValues.lastName.trim(),
            email: loginValues.email.trim(),
            password: loginValues.password.trim(),
        }
        postLoginUser(newLoginUser)
    }

    useEffect(() =>{
        LoginValidation.isValid(loginValues).then((valid) =>{
            setLoginFormDisabled(!valid);
        })
    }, [loginValues]);

    const onSubmit = evt => {
        evt.preventDefault();
        history.push("/plants")
        loginFormSubmit();
    };

    const onChange = evt => {
        const { name, value } = evt.target;
        loginInputChange(name, value);
    };
    
    return(
        <form onSubmit={onSubmit}>

            <div className='login-page'>

                <div className='login-form'>
                <p>Login</p>

                    <div className='errors'>
                    {/* <p>{loginFormError.firstName}</p>
                    <p>{loginFormError.lastName}</p> */}
                    <p>{loginFormError.email}</p>
                    <p>{loginFormError.password}</p>
                    </div>
                    {/* <label>First Name
                        <input 
                            type='text'
                            name='firstName'
                            value={loginValues.firstName}
                            onChange={onChange}
                        />
                    </label>

                    <label>Last Name
                        <input 
                            type='text'
                            name='lastName'
                            value={loginValues.lastName}
                            onChange={onChange}
                        />
                    </label> */}
                    <div className="login-inputs">
                    <label className="label">Email: 
                        <input 
                            type='text'
                            name='email'
                            value={loginValues.email}
                            onChange={onChange}
                        />
                    </label>

                    <label className="label">Password: 
                        <input 
                            type='password'
                            name='password'
                            value={loginValues.password}
                            onChange={onChange}
                        />
                    </label>
                    </div>
                    <button className='loginBttn'>Login</button>
                    {/* <button className='loginBttn' disabled={loginFormDisabled}>Login</button> */}
                </div>
            </div>
        </form>
    );
};


export default Login;