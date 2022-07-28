import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, FormControl, Container } from "react-bootstrap";

function Profile(props) {
    
  let token = localStorage.getItem("JWT");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [filiere, setFiliere] = useState("");
  const [classe, setClasse] = useState("");
  const [userId, setUserId] = useState(null);
  console.log(props);
  const profile = async () => {
    setUserId(props.userId);
    try {
      const response = await fetch("http://localhost:8000/api/users/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
      });
        const data = await response.json();
        setNom(data.lastname);
        setPrenom(data.name);
        setEmail(data.email);
        setPassword(data.password);
        setFiliere(data.filiere);
        setClasse(data.classe);
    }
    catch (error) {
      console.log(error);
    }
  };
    
    const updateProfile = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8000/api/users/' + props.userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                },
            body: JSON.stringify({
                lastname: nom,
                name: prenom,
                email: email,
                password: password,
                filiere: filiere,
                classe: classe
            })
        });
        window.location.reload();
    }
    
    useEffect(() => {
        profile();
    }, [userId]);
    
  
  return (
    <>
        <Container>
            <Form onSubmit={updateProfile}>
                <Form.Group className="mb-3">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter nom"
                        required
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter prénom"
                        required
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filiere</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter filiere"
                        required
                        value={filiere}
                        onChange={(e) => setFiliere(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Classe</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter classe"
                        required
                        value={classe}
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

export default Profile;
