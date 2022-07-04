import React from 'react';

//Components
import {Link} from "react-router-dom"

function Home() {
    return (
        <> 
            <h1>Hello from Home</h1>
            <Link to="/">Home</Link>
            <Link to="/Login" style={{marginLeft: '5px'}}>Login</Link>
            <Link to="/Register" style={{marginLeft: '5px'}}>Register</Link>
        </>
    );

}

export default Home;