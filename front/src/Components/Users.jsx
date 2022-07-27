import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";



function Users() {

    const [users, setUsers] = useState([]);
    const connectedUser = jwt_decode(localStorage.getItem("JWT"));
    const [friendRequests , setFriendRequests] = useState([]);
    
    useEffect(() => {
        fetchUsers();
        friendRequest();
    }, [])

    const friendRequest = async () => {
        const reponse = await fetch("http://localhost:8000/api/users/"+connectedUser.id+"/awaitingFriendsRequests", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("JWT")
            }
        })
        const data = await reponse.json();
        console.log(data);
        setFriendRequests(data);

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
        const reponse = await fetch("http://localhost:8000/api/users/"+uId+"/friend/"+fId+"/request", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("JWT"),
                "Content-Type": "application/json"
            },
        })
        const data = await reponse.json();
        // console.log(data);
    }

    return (
        <>
            <h1>Users</h1>
            <div style={{display:'flex'}}>
            {users && users.map((user, index) => (
                <div key={index} className="userCard" style={{border: 'solid black 1px', padding: '2em', margin: '1em'}}>
                    <p>{user.name}</p>
                    <p>{user.classe}</p>
                    <p>{user.filiere}</p>
                    <button onClick={() => addFriend(connectedUser.id, user.id)}>Ajouter en ami</button>
                </div>
            ))}
            </div>
        </>
    );

}

export default Users;