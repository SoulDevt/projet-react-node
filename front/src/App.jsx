import { React, useState } from 'react'
import logo from './logo.svg'
import './App.css'

//Components

import { Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Test1 from './Components/Test1';
import Test2 from './Components/Test2';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path ='/' element={<Home/>}></Route>
            <Route path ='/test1' element={<Test1/>}></Route>
            <Route path ='/test2' element={<Test2/>}></Route>
        </Routes>
    </div>
  )
}

export default App
