import Navbar from "./Navbar";
import './Login.css'
import {  useContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";


const Login = () => {
    const {setIsLogin, setDataUser} = useContext(AppContext)
    const email = useRef();
    const password = useRef();
    const [login, setLogin] = useState();
    const usenavigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setLogin({email : email.current.value,password:password.current.value});
    }
   
    useEffect(() => {
        if(login){
            axios.post('http://localhost:5000/user/login', login)
            .then(result => {
                if(result.data.isLogin){
                    setIsLogin(result.data.isLogin);
                    setDataUser(result.data.user)
                    usenavigate('/')
                } else{
                    alert("Email hoac mat khau khong chinh xac")
                }
                
            }).catch(err=> console.log(err))
        };
        
    }, [login])
    return(<div>
        <Navbar />
        <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1><br/>
        <input ref={email} type="email" id="email"></input><br></br>
        <input ref={password} type="password" id="password"></input><br/>
        <button  type="submit" className="button">Login</button>
    </form>
    </div>)
}

export default Login;