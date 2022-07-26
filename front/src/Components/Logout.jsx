import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    let navigate = useNavigate();
    const [redirect , setRedirect] = useState(false);
    useEffect(() => {
        localStorage.removeItem('JWT');
        setRedirect(true);
    })
    
    if (redirect) {
        navigate('/login');
    }


}

export default Logout;