import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { set } from 'mongoose';



function Users() {
    const [users, setUsers] = useState([]);
    const connectedUser = jwt_decode(localStorage.getItem("JWT"));
    const [friendRequests, setFriendRequests] = useState([]);
    const [requestCount, setRequestCount] = useState(0);
    const [userFriendRequest, setUserFriendRequest] = useState([]);

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
        console.log(data.length);
        setFriendRequests(data);
        setRequestCount(data.length);
    }


    const getRequestsUsersById = async () => {
        friendRequests.forEach(async (el) => {
            const reponse = await fetch("http://localhost:8000/api/users/" + el, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsIm5hbWUiOiJvdGhlciIsImlhdCI6MTY1ODk0MDM5MywiZXhwIjoxNjkwNDk3OTkzfQ.vpYp63QFTleK1R1h_4s6n2g3LSC6hwQv6EjpwTIAar66DsMNnbpQJC9KvZRWPu759OQLvr_NkPL_eYs7RYOWnQ"
                }
            })
            const data = await reponse.json();
            setUserFriendRequest([...userFriendRequest, data]);
        });
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
            <h1>Users</h1>
            <div style={{ display: 'flex' }}>
                {users && users.map((user, index) => (
                    <div key={index} className="userCard" style={{ border: 'solid black 1px', padding: '2em', margin: '1em' }}>
                        <p>{user.name}</p>
                        <p>{user.classe}</p>
                        <p>{user.filiere}</p>
                        <button onClick={() => addFriend(connectedUser.id, user.id)}>Ajouter en ami</button><br />
                        <button>Envoyer un message</button>
                    </div>
                ))}
                {requestCount > 0 &&
                    <p>Vous avez {requestCount} demande d'ami.<button onClick={getRequestsUsersById}>Voir la liste</button></p>
                }
                {/* {userFriendRequest && userFriendRequest.map((user, index) => (
                    <div key={user.id}>
                        <p>{user.name}</p>
                        <p>{user.lastname}</p>
                        <p>{user.filiere}</p>
                    </div>
                ))} */}
            </div>
        </>
    );

}

export default Users;