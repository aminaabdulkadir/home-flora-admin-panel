import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/apiCalls"
import "./login.scss"
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=> state.user.currentUser);
  const isAdmin = user?.isAdmin;



  const handleClick = async (e)=>{
    e.preventDefault();
   login(dispatch, {username, password})
  
  }
  
  return (
        <div className="formContainer">
        <div className="title">Sign in </div>
        <div className="form">
          <input type="text" 
            placeholder="username"
            onFocus={(e) => e.target.placeholder = ""}
            onBlur={(e) => e.target.placeholder = "username"}
          onChange={(e)=> setUsername(e.target.value)}/>
          <input type="password" 
          placeholder="password" 
          onFocus={(e) => e.target.placeholder = ""}
          onBlur={(e) => e.target.placeholder = "password"} 
          onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <button className="logButton" onClick={handleClick}>Sign in </button>
        </div>
  )
}

export default Login
