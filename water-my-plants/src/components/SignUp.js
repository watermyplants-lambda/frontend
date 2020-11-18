import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth'; 
import * as yup from 'yup';
import SignUpValidation from '../validation/SignupValidation';
import { useHistory } from 'react-router-dom';

const initialSignupValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const initialSignupError = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const initialUser=[];
const initialSignupDisabled = true;

const SignUp = () => {
    const [signUpForm, setSignUpForm] = useState(initialSignupValues);
    const [signUpUser, setSignUpUser] = useState(initialUser);
    const [signupFormErrors, setSignupFormErrors] = useState(initialSignupError);
    const [signupDisabled, setSignupDisabled] = useState(initialSignupDisabled);
    const history = useHistory();

    const postRegisterUser = newUser => {
        axiosWithAuth()
            .post('/api/auth/register', newUser)
            .then((res) => {
                window.localStorage.setItem('token', res.data.payload)
                setSignUpUser([...signUpUser, res.data]);
                setSignUpForm(initialSignupValues)
            })
            .catch((err) => {
                console.log(err)
            });
    };

    const changeSignup = (name, value) =>{
        yup
        .reach(SignUpValidation, name)
        .validate(value)
        .then(() => {
            setSignupFormErrors({
                ...signupFormErrors,
                [name]: '',
            });
        })
        .catch((err) =>{
            setSignupFormErrors({
                ...signupFormErrors,
                [name]: err.errors[0]
            });
        });
        setSignUpForm({
            ...signUpForm,
            [name]: value
        });
    }

    const signUpFormSubmit = () => {
        const newUser = {
            firstName: signUpForm.firstName.trim(),
            lastName: signUpForm.lastName.trim(),
            email: signUpForm.email.trim(),
            password: signUpForm.password.trim()
        }
        postRegisterUser(newUser)
    }
    
    useEffect(() =>{
        SignUpValidation.isValid(signUpForm).then((valid) =>{
            setSignupDisabled(!valid);
        });
    }, [signUpForm]);

    const onSubmit = evt => {
        evt.preventDefault();
        history.push("/plants")
        signUpFormSubmit();
    };

    const onChange = evt =>{
        const { name, value } = evt.target
        changeSignup(name, value)
    };

    return(
        <form onSubmit={onSubmit}>
            <div className="signup-page">
                <div className="signup-form">
                <p>Sign Up</p>

                    <div className="errors">
                        <p>{signupFormErrors.firstName}</p>
                        <p>{signupFormErrors.lastName}</p>
                        <p>{signupFormErrors.email}</p>
                        <p>{signupFormErrors.password}</p>
                    </div>

                    <div className="signup-inputs">
                        <label>First Name:
                            <input 
                                type='text'
                                name='firstName'
                                value={signUpForm.firstName}
                                onChange={onChange}
                            />
                        </label>

                        <label>Last Name:
                            <input 
                                type='text'
                                name='lastName'
                                value={signUpForm.lastName}
                                onChange={onChange}
                            />
                        </label>

                        <label>Email:
                            <input 
                                type='text'
                                name='email'
                                value={signUpForm.email}
                                onChange={onChange}
                            />
                        </label>

                        <label>Password:
                            <input 
                                type='password'
                                name='password'
                                value={signUpForm.password}
                                onChange={onChange}
                            />
                        </label>
                    </div>
                    <button>Submit</button>
                </div>
            </div>
        </form>
    );
};

export default SignUp;
