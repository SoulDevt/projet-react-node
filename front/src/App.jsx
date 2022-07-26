//Librairies
import { React, useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import routes from './routes';
import { Link } from "react-router-dom"
import jwt_decode from 'jwt-decode';
import NavLogged from './Components/NavLogged';
import NavNotLogged from './Components/NavNotLogged';

//Components
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import NotFound from './Components/NotFound'
import Logout from './Components/Logout';
function App() {
  const [name, setName] = useState('');
  useEffect(() => {
    const thereIsToken = localStorage.getItem('JWT');
    if (thereIsToken != null) {
      const token = jwt_decode(localStorage.getItem('JWT'));
      setName(token.name);
    } else {
      console.log('NO');
    }

  })


  return (
    <div className="App">
      {name ? <NavNotLogged /> : <NavLogged />}
      <Routes>
        <Route
          path={routes.HOME}
          element={<Home name={name} />}
        />
        <Route path={routes.login} element={<Login />}></Route>
        <Route path={routes.register} element={<Register />}></Route>
        <Route path={routes.logout} element={<Logout />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
