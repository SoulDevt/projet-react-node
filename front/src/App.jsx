import { React, useState } from 'react'
import logo from './logo.svg'
import './App.css'

//Components

import { Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path ='/' element={<Home/>}></Route>
            <Route path ='/Login' element={<Login/>}></Route>
            <Route path ='/Register' element={<Register/>}></Route>
        </Routes>
    </div>
  )
}

export default App
