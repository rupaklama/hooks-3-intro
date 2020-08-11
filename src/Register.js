import React, { useState } from 'react';

const initialFormState = {
    username: '',
    email: '',
    password: ''
}
function Register () {
    
    // implementing a Register Form with a Single State Value
    const [form, setForm] = useState(initialFormState);

    const [user, setUser] = useState(null);

    // helper func to update our state object - form
    const handleChange = (event) => {
        setForm({
            // spread operator to add values 
            ...form,
            // updating state props based on the 'name' attrib
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setUser(form);
        // clearing out form
        setForm(initialFormState);
    }

    // to keep track of input values, use 'name' attrib with our state props
    return (
        <div>
            <h2>Register</h2>
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
                    name='username'
                    onChange={handleChange} 
                    value={form.username}
                />

                <input 
                    type='email' 
                    placeholder='email' 
                    name='email'
                    onChange={handleChange}
                    value={form.email} 
                />

                <input 
                    type='text' 
                    placeholder='password'
                    name='password'
                    onChange={handleChange} 
                    value={form.password}
                />
                <br />
                <button type='submit'>Submit</button>
            </form>

            {user && JSON.stringify(user, null, 2)}
        </div>
    )
}

export default Register;