import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { Form, Button, FormControl, Container } from "react-bootstrap";
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
            <Container>
                <Form onSubmit={register}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter nom"
                            required
                            onChange={(e) => setNom(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter prénom"
                            required
                            onChange={(e) => setPrenom(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Filiere</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter filiere"
                            required
                            onChange={(e) => setFiliere(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Classe</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter classe"
                            required
                            onChange={(e) => setClasse(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );

}

export default Test2;