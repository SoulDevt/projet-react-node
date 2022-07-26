import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Test1() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('JWT', data.token);
        })
        setRedirect(true);
    }

    if (redirect) {
        navigate("/", { replace: true });
    }

    return (
        <>
            <h1>Hello from Login</h1>
            <form onSubmit={login}>
                <input type="text" placeholder='Email' required
                    onChange={e => setEmail(e.target.value)} /><br />
                <input type="password" placeholder='Mot de passe' required 
                    onChange={e => setPassword(e.target.value)}/><br />
                <button type="submit">Login</button>
            </form>
        </>

    );

}

export default Test1;