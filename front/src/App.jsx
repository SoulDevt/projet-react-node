//Librairies
import { React, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import routes from "./routes";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

//Components
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Register from "./Components/Register";
import NotFound from "./Components/NotFound";
import Logout from "./Components/Logout";
import EsgiNavbar from "./Components/EsgiNavbar";
import Loader from "./Components/Loader";
import Profile from "./Components/Profile";

function App() {
  
  const [name, setName] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  
  useEffect(() => {
    setIsLoading(true);
    const thereIsToken = localStorage.getItem("JWT");
    if (thereIsToken == null)
      return  
    const token = jwt_decode(localStorage.getItem("JWT"));
      
    setName(token.name);
    setIsAdmin(token.isAdmin);
    setUserId(token.id);
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
      <EsgiNavbar isLogged={isLogged} name={name} isAdmin={isAdmin}/>
      {isLoading ? <Loader /> : 
        <Routes>
          <Route path={routes.HOME} element={<Home name={name} isLogged={isLogged} />} />
          <Route path={routes.profile} element={<Profile userId={userId}/>} />
          <Route path={routes.login} element={<Login />}></Route>
          <Route path={routes.register} element={<Register />}></Route>
          <Route path={routes.logout} element={<Logout />}></Route>
          {isAdmin ? <Route path={routes.admin} element={<Admin />}></Route> : null}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      }
    </div>
  );
}

export default App;
