import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { set } from 'mongoose';
import './User.css';
import { Form, Button, FormControl, Container, Card } from "react-bootstrap";

function Users() {
    const [users, setUsers] = useState([]);
    const connectedUser = jwt_decode(localStorage.getItem("JWT"));
    const [friendRequests, setFriendRequests] = useState([]);
    const [requestCount, setRequestCount] = useState(0);
    const [userFriendRequest, setUserFriendRequest] = useState([]);

    let hehe=[];

    useEffect(() => {
        fetchUsers();
        friendRequest();
    }, [])


    const friendRequest = async () => {
        const reponse = await fetch("http://localhost:8000/api/users/" + connectedUser.id + "/awaitingFriendsRequests", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("JWT")
            }
        })
        const data = await reponse.json();
        console.log(data);
        setFriendRequests(data);
        setRequestCount(data.length);
    }

    const fetchUsers = async () => {
        const response = await fetch("http://localhost:8000/api/users", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("JWT")
            }
        })
        const data = await response.json();
        setUsers(data);
    }

    const addFriend = async (uId, fId) => {
        console.log(uId, fId);
        const reponse = await fetch("http://localhost:8000/api/users/" + uId + "/friend/" + fId + "/request", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("JWT"),
                "Content-Type": "application/json"
            },
        })
    }

   
    return (
        
        <>
            <h1 style={{ paddingTop: '1em'}}>Users</h1>
            <div className='usersCard' style={{ display: 'flex' }}>
                {users && users.map((user, index) => (
                    <div key={index} className="userCard" style={{padding: '2em'}}>
                        <Card style={{ width: '18rem', paddingTop: '1em', paddingBottom: '1em' }}>
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Text>
                                <span>Classe : {user.classe}</span>
                            </Card.Text>
                            <Card.Text>
                                <span>Filiere : {user.filiere}</span>
                            </Card.Text>
                            <Button onClick={() => addFriend(connectedUser.id, user.id)} variant="primary">Ajouter</Button>
                        </Card.Body>
                        </Card>
                    </div>
                    
                ))}
           
            </div>
            {requestCount > 0 &&
                    <p>Vous avez {requestCount} demande d'ami.<button >Voir la liste</button></p>
                }
                {userFriendRequest && userFriendRequest.map((user, index) => (
                    <div key={user.id}>
                        <p>{user.name}</p>
                        <p>{user.lastname}</p>
                        <p>{user.filiere}</p>
                    </div>
                ))}
        </>
    );
}

export default Users;