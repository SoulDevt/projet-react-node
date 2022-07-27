import React, { useState, useEffect } from 'react';

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        const response = await fetch("http://localhost:8000/api/users", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("JWT")
            }
        })
        const data = await response.json();
        console.log(data);
        setUsers(data);
    }

    const addFriend = async () => {
        console.log('hehe');
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
                    <button onClick={addFriend}>Ajouter en ami</button>
                </div>
            ))}
            </div>
        </>
    );

}

export default Users;