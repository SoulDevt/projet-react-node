//Librairies
import { React, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import routes from './routes';
import { Link } from "react-router-dom"

//Components
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import NotFound from './Components/NotFound'
function App() {
  return (
    <div className="App">
        <Routes>
            <Route path ={routes.HOME} element={<Home/>}></Route>
            <Route path ={routes.login} element={<Login />}></Route>
            <Route path ={routes.register} element={<Register />}></Route>
            <Route path ='*' element={<NotFound/>}></Route>
        </Routes>

        <Link to={routes.HOME}>Home</Link>
        <Link to={routes.login} style={{marginLeft: '5px'}}>Login</Link>
        <Link to={routes.register} style={{marginLeft: '5px'}}>Register</Link>
    </div>
  )
}

export default App
