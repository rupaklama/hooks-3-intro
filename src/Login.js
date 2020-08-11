import React, { useState } from 'react';
import Register from './Register';


function Login () {
    // implementing a login form with multiple state values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(username)
        console.log(password)
        
        const userData = {
            username,
            password
        }

        setUser(userData)
        setUsername('')
        setPassword('')
    }

    return (
        <div style={{textAlign: 'center'}} >
            <h2>Login</h2>
            <form 
                style={{
                    display: 'grid',
                    alignItems: 'center',
                    justifyItems: 'center'
                }}

                onSubmit={handleSubmit}
            >
                <input 
                    type='text' 
                    placeholder='username' 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                />
                <input 
                    type='text' 
                    placeholder='password'
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                <br />
                <button type='submit'>Submit</button>
            </form>
            {user && JSON.stringify(user, null, 2)}

            <hr />
            <Register />
        </div>
        
    )// format user state to json data
}

export default Login;