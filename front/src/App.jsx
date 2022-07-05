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

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path ={routes.HOME} element={<Home/>}></Route>
            <Route path ={routes.test1} element={<Test1/>}></Route>
            <Route path ={routes.test2} element={<Test2/>}></Route>
            <Route path ='*' element={<NotFound/>}></Route>
        </Routes>

        <Link to={routes.HOME}>Home</Link>
        <Link to={routes.test1} style={{marginLeft: '5px'}}>Test1</Link>
        <Link to={routes.test2} style={{marginLeft: '5px'}}>Test2</Link>
    </div>
  )
}

export default App
