import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import LoginValidation from '../validation/LoginValidation';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../store/actions/plantActions';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialLoginValues = {
    email: '',
    password: ''
};

const initialLoginErrors = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};

const initialLoginDisabled = true;

const Login = (props) => {
    const [loginValues, setLoginValues] = useState (initialLoginValues);
    const [loginFormError, setLoginFormError] = useState(initialLoginErrors);
    const [loginFormDisabled, setLoginFormDisabled] = useState(initialLoginDisabled);
    const history = useHistory();

    const postLoginUser = (newLoginUser) => {
        props.login(newLoginUser)
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
            email: loginValues.email.trim(),
            password: loginValues.password.trim(),
        };
        postLoginUser(newLoginUser)
    };

    useEffect(() =>{
        LoginValidation.isValid(loginValues).then((valid) =>{
            setLoginFormDisabled(!valid);
        });
    }, [loginValues]);

    const onSubmit = (evt) => {
        evt.preventDefault();
        axiosWithAuth()
            .post('/api/auth/login', loginValues)
            .then(res => {
                console.log('login data', res)
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("firstName", res.data.user.firstName);
                localStorage.setItem("lastName", res.data.user.lastName);
                localStorage.setItem("id", res.data.user.id);
                localStorage.setItem("email", res.data.user.email);
                props.login(res.data);
                history.push('/plants');
            })
            .catch(err => console.log(err))
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
                    <p>{loginFormError.email}</p>
                    <p>{loginFormError.password}</p>
                    </div>
            
                    <div className="login-inputs">
                    <label className="label">Email: 
                        <input 
                            type='text'
                            name='email'
                            id='email'
                            value={loginValues.email}
                            onChange={onChange}
                        />
                    </label>

                    <label className="label">Password: 
                        <input 
                            type='password'
                            name='password'
                            id='password'
                            value={loginValues.password}
                            onChange={onChange}
                        />
                    </label>
                    </div>
                    <button className='loginBttn' disabled={loginFormDisabled}>Login</button>
                </div>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        email: state.email,
        password: state.password,
    };
};

export default connect(mapStateToProps, { login })(Login);