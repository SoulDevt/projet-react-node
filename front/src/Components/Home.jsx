import React, { useState, useEffect } from 'react';

function Home(name) {
    return (
        <>
            <h1>{name.name ? 'Hello ' + name.name : 'NOT LOGGED'}</h1>
        </>
    );

}

export default Home;