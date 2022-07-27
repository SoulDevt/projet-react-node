import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, FormControl, Container, ListGroup } from "react-bootstrap";

function Admin(props) {

    const [users, setUsers] = useState("");
    const [messages, setMessages] = useState("");
    const [totalUsers, setTotalUsers] = useState("");
    const [totalMessages, setTotalMessages] = useState("");
    
    let token = localStorage.getItem("JWT");
    const getDataAdmin = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/admin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            const data = await response.json();
            // console.log(data);
            setUsers(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    const getMessages = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/messages", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            const data = await response.json();
            console.log(data);
            setMessages(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUsers();
        getMessages();
        getDataAdmin();
    }, []);
    useEffect(() => {
        if (users)
            users.push(users);
    }, [users]);

    useEffect(() => {
    if (messages)
        messages.push(messages);
    }, [messages]);
  return (
    <>
        <h1>Total Users = {totalUsers}</h1>
        {users && users.map((user, index) => (
            <ListGroup key={index}>
                <ListGroup.Item>
                    <h1>{user.name}</h1>
                    <h2>{user.email}</h2>
                    <h2>{user.role}</h2>
                </ListGroup.Item>
            </ListGroup>
        ))}
    </>
  );
}

export default Admin;
