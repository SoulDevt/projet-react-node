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
  const [redirect, setRedirect] = useState(false);

  const profile = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/" + props.userId, {
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
    useEffect(() => {
        profile();
    }, []);
    
  
  return (
    <>
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        disabled
                        type="text"
                        placeholder="Enter nom"
                        required
                        value={nom}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                        disabled
                        type="text"
                        placeholder="Enter prénom"
                        required
                        value={prenom}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        disabled
                        type="email"
                        placeholder="Enter email"
                        required
                        value={email}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Filiere</Form.Label>
                    <Form.Control
                        disabled
                        type="text"
                        placeholder="Enter filiere"
                        required
                        value={filiere}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Classe</Form.Label>
                    <Form.Control
                        disabled
                        type="text"
                        placeholder="Enter classe"
                        required
                        value={classe}
                    />
                </Form.Group>
            </Form>
        </Container>
    </>
  );
}

export default Profile;
