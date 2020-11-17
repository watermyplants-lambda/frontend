import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth'; 
import * as yup from 'yup';
import SignUpValidation from './SignupValidation';

const initialSignup ={
    firstname: '',
    lastname: '',
    email: '',
    password: ''
}

const initialSignupError ={
    firstname: '',
    lastname: '',
    email: '',
    password: ''
}

// const initialUsers=[];
// const initialSignupDisabled = true;

const SignUp = (props) => {
    const [signupForm, setSignupForm] = useState(initialSignup);
    // const [users, setUsers] = useState(initialUsers);
    const [signupFormErrors, setSignupFormErrors] = useState(initialSignupError);
    // const [signupDisabled, setSignupDisabled] = useState(initialSignupDisabled)

    // useEffect(() =>{
    //     axiosWithAuth()
    //     .get('/auth/register') //may need to change api
    //     .then((res) =>{
    //         setUsers(initialUsers)
    //     })
    //     .catch((err) =>{
    //         console.log(err,'error')
    //     })
    // },[]);


    const onSubmit = (e) =>{
        e.preventDefault()
        axiosWithAuth()
        .post('/api/auth/register', signupForm)
        .then((res) => {
            window.localStorage.setItem('token', res.data.payload)
            props.history.push('/')
        })
        .catch((err) =>{
            console.log(err, 'error')
        })
        setSignupForm(initialSignup);
    }

    // const submitSignup = () => {
    //     const newUser ={   //need to fix error of ':' expected for newUser
    //         firstName: signupForm.firstName.trim(),
    //         lastName: signupForm.lastName.trim(),
    //         email: signupForm.email.trim(),
    //         password: signupForm.password.trim(),
    //     }
    //     saveNewUser(newUser);  //need to fix this error of ',' expected for saveNewUser
    // }

    const changeSignup = (name, value) =>{
        //validation
        yup.reach(SignUpValidation, name)
        .validate(value)
        .then(() =>{
            //console.log(value)
            setSignupFormErrors({
                ...signupFormErrors,
                [name]: '',
            });
        })
        .catch((err) =>{
            console.log(err)
        });
        setSignupForm({...setSignupForm, [name]: value});
    }
    
    // useEffect(() =>{
    //     SignUpValidation.isValid(signupForm).then((valid) =>{
    //         setSignupDisabled(!valid);
    //     });
    // },[signupForm]);

    // const onSubmit = evt =>{
    //     evt.preventDefault();
    //     submitSignup();
    // }

    //Need to add to check if login info is correct to be successful or not

    const onChange = evt =>{
        // const { name, value, type, checked } = evt.target
        // const valueToUse = type === 'checkbox' ? checked : value;
        // change(name, valueToUse)
        // setSignupForm({...signupForm, [evt.name]: evt.target.value})
        changeSignup()
    }


    return(
        <form className='signup form' onSubmit={onSubmit}>
            <div>
                <p>Sign Up</p>
            </div>
            <div className='signuperrors'>

            <div className='errors'>
                <p>{signupFormErrors.firstname}</p>
                <p>{signupFormErrors.lastname}</p>
                <p>{signupFormErrors.email}</p>
                <p>{signupFormErrors.password}</p>
            </div>
            
            
            </div>
            <div className='signup'>
                <label>First Name
                    <input 
                        type='text'
                        name='firstName'
                        value={signupForm.firstname}
                        onChange={onChange}
                        // submit={submitSignup}
                    />
                </label>

                <label>Last Name
                    <input 
                        type='text'
                        name='lastName'
                        value={signupForm.lastname}
                        onChange={onChange}
                        // submit={onChange}
                    />
                </label>

                <label>Email
                    <input 
                        type='text'
                        name='email'
                        value={signupForm.email}
                        onChange={onChange}
                        // submit={onChange}
                    />
                </label>

                <label>Password
                    <input 
                        type='password'
                        name='password'
                        value={signupForm.password}
                        onChange={onChange}
                        // submit={onChange}
                    />
                </label>

                <button className='signupBttn' >Submit</button>
            </div>
        </form>
    )


}

export default SignUp;
