//Librairies
import { React, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import routes from "./routes";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import NavLogged from "./Components/NavLogged";
import NavNotLogged from "./Components/NavNotLogged";

//Components
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NotFound from "./Components/NotFound";
import Logout from "./Components/Logout";
import EsgiNavbar from "./Components/EsgiNavbar";
import Loader from "./Components/Loader";

function App() {
  const [name, setName] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    const thereIsToken = localStorage.getItem("JWT");
    if (thereIsToken == null)
      return  
    const token = jwt_decode(localStorage.getItem("JWT"));
    setName(token.name);
    setIsLogged(true);
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    if(!isLoading)
      return
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);
  return (
    <div className="App">
      <EsgiNavbar isLogged={isLogged} name={name}/>
      {isLoading ? <Loader /> : 
        <Routes>
          <Route path={routes.HOME} element={<Home name={name} isLogged={isLogged} />} />
          <Route path={routes.login} element={<Login />}></Route>
          <Route path={routes.register} element={<Register />}></Route>
          <Route path={routes.logout} element={<Logout />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      }
    </div>
  );
}

export default App;
