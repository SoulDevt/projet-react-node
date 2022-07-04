import React from 'react';

//Components
import {Link} from "react-router-dom"

function Home() {
    return (
        <> 
            <h1>Hello from Home</h1>
            <Link to="/">Home</Link>
            <Link to="/test1" style={{marginLeft: '5px'}}>Test1</Link>
            <Link to="/test1" style={{marginLeft: '5px'}}>Test2</Link>
        </>
    );

}

export default Home;