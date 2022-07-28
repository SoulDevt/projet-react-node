import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, FormControl, Container, ListGroup, Table } from "react-bootstrap";

function Admin(props) {

    const [users, setUsers] = useState("");
    const [totalUsers, setTotalUsers] = useState("");
    const [totalMessages, setTotalMessages] = useState("");
    const [totalMessagesPerUser, setTotalMessagesPerUser] = useState("");

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
            setTotalUsers(data.totalUsers);
            setTotalMessages(data.totalMessages);
            setTotalMessagesPerUser(data.totalMessagesPerUser);
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
            setUsers(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
        getDataAdmin();
    }, []);

    useEffect(() => {
        const timer = setInterval(getDataAdmin, 5000);
        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        const timer = setInterval(getUsers, 5000);
        return () => clearInterval(timer);
    }, []);
    
    
  return (
    <>
        <h1>Total Users = {totalUsers}</h1>
        <h1>Total Messages Sent = {totalMessages}</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th># of messages sent</th>
                <th># of messages received</th>
                </tr>
            </thead>
            <tbody>
                {users && users.map((user, index) => (
                <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{totalMessagesPerUser && totalMessagesPerUser.map((message, index) => (
                    message._id.sender == user.id ? message.count : "0"
                ))}</td>
                <td>{totalMessagesPerUser && totalMessagesPerUser.map((message, index) => (
                    message._id.receiver == user.id ? message.count : "0"
                ))}</td>
                </tr>
                ))}
            </tbody>
        </Table>
    </>
  );
}

export default Admin;
