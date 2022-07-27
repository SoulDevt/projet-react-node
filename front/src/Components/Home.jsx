import React, { useState, useEffect } from 'react';


function Home(props) {
    
    const [isLogged, setIsLogged] = useState(false);
    
    useEffect(() => {
        setIsLogged(props.isLogged);
    }, [props.isLogged])
    return (
        <>
            <h1>{isLogged ? 'Hello ' + props.name : 'NOT LOGGED'}</h1>
        </>
    );

}

export default Home;
