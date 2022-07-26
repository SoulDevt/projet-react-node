import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";



function NavNotLogged() {

    return (
        <>
            <nav>
                <Link to="/logout">Logout</Link>
            </nav>
        </>
    );

}

export default NavNotLogged;