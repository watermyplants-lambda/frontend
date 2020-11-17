import React, { useState } from 'react';

const initailLogin ={
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}


const Login () => {
    const [login, setLogin] = useState(initailLogin);
    
    
    return(
        <form onSubmit={}>
            <div className='loginPage'>
                <p>Login</p>
                <div className='loginForm'>

                    <label>First Name
                        <input 
                            type='text'
                            name='firstName'
                            value={login.firstName}
                        />
                    </label>

                    <label>Last Name
                        <input 
                            type='text'
                            name='lastName'
                            value={login.lastName}
                        />
                    </label>

                    <label>Email
                        <input 
                            type='text'
                            name='email'
                            value={login.email}
                        />
                    </label>

                    <label>Password
                        <input 
                            type='text'
                            name='password'
                            value={login.password}
                        />
                    </label>

                    <button className='loginBttn'>Log In</button>

                
                </div>
            
            
            
            </div>


        
        
        
        </form>
    )
}