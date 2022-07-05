import React from 'react';
import {Link} from "react-router-dom"
function Test1() {
    return (
        <>
        <h1>Hello from Login</h1>
        <Link to="/">Home</Link>
        <Link to="/Login" style={{marginLeft: '5px'}}>Login</Link>
        <Link to="/Register" style={{marginLeft: '5px'}}>Register</Link>
        </>

    );

}

export default Test1;