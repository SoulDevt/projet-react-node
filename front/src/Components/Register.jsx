import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Test2() {
    let navigate = useNavigate();
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [filiere, setFiliere] = useState("");
    const [classe, setClasse] = useState("");
    const [redirect, setRedirect] = useState(false);

    const register = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nom,
                lastname: prenom,
                email: email,
                password: password,
                filiere: filiere,
                classe: classe
            })
        });
        setRedirect(true);
    }

    if (redirect) {
        navigate("/login", { replace: true });
    }

    return (
        <>
            <h1>Hello from Register</h1>
            <form onSubmit={register}>
                <input type="text" placeholder='Nom' required
                    onChange={e => setNom(e.target.value)} /><br />
                <input type="text" placeholder='Prénom' required
                    onChange={e => setPrenom(e.target.value)} /><br />
                <input type="mail" placeholder='Email' required
                    onChange={e => setEmail(e.target.value)} /><br />
                <input type="password" placeholder='Mot de passe' required
                    onChange={e => setPassword(e.target.value)} /><br />
                <input type="text" placeholder='Filiere' required
                    onChange={e => setFiliere(e.target.value)} /><br />
                <input type="text" placeholder='Classe' required
                    onChange={e => setClasse(e.target.value)} /><br />
                <button type="submit">Register</button>
            </form>
        </>

    );

}

export default Test2;