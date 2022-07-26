import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";



function NavLogged() {

    return (
        <>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </>
    );

}

export default NavLogged;