// import React, { useState, useEffect } from 'react';
// import axiosWithAuth from '../utils/axiosWithAuth'; 
// import * as yup from 'yup';
// import SignUpValidation from './SignupValidation';

// const initialSignup ={
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: ''
// }

// const initialSignupError ={
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: ''
// }

// const initialUsers=[];
// const initialSignupDisabled = true;

// const SignUp () => {
//     const [signupForm, setSignupForm] = useState(initialSignup);
//     const [users, setUsers] = useState(initialUsers);
//     const [signupFormErrors, setSignupFormErrors] = useState(initialSignupError);
//     const [signupDisabled, setSignupDisabled] = useState(initialSignupDisabled)

//     useEffect(() =>{
//         axios
//         .get('https://watermyplants35.herokuapp.com/auth/register') //may need to change api
//         .then((res) =>{
//             setUsers(initialUsers)
//         })
//         .catch((err) =>{
//             console.log(err,'error')
//         })
//     },[]);


//     const saveNewUser = (newUser) =>{
//         axios
//         .post('https://watermyplants35.herokuapp.com/auth/register', newUser) //may need to change api
//         .then((res) => {
//             setUsers([res.data, ...users]);
//             setSignup(initialSignup);
//             //should this redirect to profile or home if successful
//         })
//         .catch((err) =>{
//             console.log(err, 'error')
//         })
//     }

//     const submitSignup = () ={
//         const newUser ={   //need to fix error of ':' expected for newUser
//             firstName: signupForm.firstName.trim(),
//             lastName: signupForm.lastName.trim(),
//             email: signupForm.email.trim(),
//             password: signupForm.password.trim(),
//         }
//         saveNewUser(newUser);  //need to fix this error of ',' expected for saveNewUser
//     }

//     const changeSignup = (name, value) =>{
//         //validation
//         yup.reach(SignUpValidation, name)
//         .validate(value)
//         .then(() =>{
//             //console.log(value)
//             setSignupFormErrors({
//                 ...signupFormErrors,
//                 [name]: '',
//             });
//         })
//         .catch((err) =>{
//             setSignupFormErrors,
//             [name]; err.errors[0],
//         });
//         setSignupForm({...setSignupForm, [name]: value});
//     }
    
//     useEffect(() =>{
//         SignUpValidation.isValid(signupForm).then((valid) =>{
//             setSignupDisabled(!valid);
//         });
//     },[signupForm]);

//     const onSubmit = evt =>{
//         evt.preventDefault();
//         submitSignup();
//     }

//     //Need to add to check if login info is correct to be successful or not

//     const onChange = evt =>{
//         const { name, value, type, checked } = evt.target
//         const valueToUse = type === 'checkbox' ? checked : value;
//         change(name, valueToUse)
//     }


//     return(
//         <form className='signup form' onSubmit={onSubmit}>
//             <div>
//                 <p>Sign Up</p>
//             </div>
//             <div className='signuperrors'>

//             <div className='errors'>
//                 <p>{signupFormErrors.firstName}</p>
//                 <p>{signupFormErrors.lastName}</p>
//                 <p>{signupFormErrors.email}</p>
//                 <p>{signupFormErrors.password}</p>
//             </div>
            
            
//             </div>
//             <div className='signup'>
//                 <label>First Name
//                     <input 
//                         type='text'
//                         name='firstName'
//                         value={signupForm.firstName}
//                         onChange={onChange}
//                         submit={submitSignup}
//                     />
//                 </label>

//                 <label>Last Name
//                     <input 
//                         type='text'
//                         name='lastName'
//                         value={signupForm.lastName}
//                         onChange={changeSignup}
//                         submit={onChange}
//                     />
//                 </label>

//                 <label>Email
//                     <input 
//                         type='text'
//                         name='email'
//                         value={signupForm.email}
//                         onChange={changeSignup}
//                         submit={onChange}
//                     />
//                 </label>

//                 <label>Password
//                     <input 
//                         type='text'
//                         name='password'
//                         value={signupForm.password}
//                         onChange={changeSignup}
//                         submit={onChange}
//                     />
//                 </label>

//                 <button className='signupBttn' disabled={signupDisabled} >Submit</button>
//             </div>
//         </form>
//     )


// }

// export default SignUp;
