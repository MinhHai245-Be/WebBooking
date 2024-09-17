import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import './form.css'
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
const Login = () => {
  const [login, setLogin] = useState();
  const email = useRef();
  const password = useRef();
  const {setIsLogin} = useContext(AppContext)
  const navigate = useNavigate()

  const handleOnchange = (e) => {
    e.preventDefault();
    setLogin({
      email: email.current.value,
      password: password.current.value,
    });
  };
  useEffect(() => {
    if(login){
        axios.post("http://localhost:5000/user/login", login).then(response => {
            setIsLogin(response.data.isLogin)
            if(response.data.isLogin){
                if(response.data.user.isAdmin){
                    navigate("/")
                 } else{
                     alert("Tai khoan khong ton tai")
                 }
            } else{
                alert("Sai ten dang nhap hoac mat khau")
            }
        }).catch(err => {
            console.log(err)
        })
    }
  }, [login]);
  return (
    <form onSubmit={handleOnchange} className="form">
        <h3>Login</h3>
      <label>Username</label>
      <input type="email" ref={email} placeholder="Username"></input>
      <label>Password</label>
      <input ref={password} type="password" placeholder="password"></input>
      <div>
        <button type="submit">LOGIN</button>
      </div>
    </form>
  );
};

export default Login;
