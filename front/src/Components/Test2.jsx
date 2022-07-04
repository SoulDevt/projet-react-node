import React from 'react';
import {Link} from "react-router-dom"

function Test2() {
    return (
        <>
        <h1>Hello from Test2</h1>
        <Link to="/">Home</Link>
        <Link to="/test1" style={{marginLeft: '5px'}}>Test1</Link>
        <Link to="/test1" style={{marginLeft: '5px'}}>Test2</Link>
        </>

    );

}

export default Test2;