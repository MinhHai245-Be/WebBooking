import Navbar from "./Navbar";
import "./Login.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const email = useRef();
  const password = useRef();
  const [signup, setSignup] = useState();
  const usenavigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignup({ email: email.current.value, password: password.current.value });
  };
  useEffect(() => {
    if (signup) {
      axios
        .post("http://localhost:5000/user/register", signup)
        .then((response) => {
          if (response.data.isSignup) {
            alert("Dang ky thanh cong");
            usenavigate("/login");
          } else {
            alert(`Email da ton tai`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setSignup("");
  }, [signup]);
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className="form">
        <h1>Sign up</h1>
        <br />
        <input ref={email} type="email" id="email"></input>
        <br></br>
        <input ref={password} type="password" id="password"></input>
        <br />
        <button type="submit" className="button">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
