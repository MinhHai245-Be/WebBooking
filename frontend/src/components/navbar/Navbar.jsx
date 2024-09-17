import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const usenavigate = useNavigate();
  const { isLogin,dataUser, setIsLogin } = useContext(AppContext);
  const handle = () => {
    setIsLogin(false);
    usenavigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking Website</span>
        {!isLogin && (
          <div className="navItems">
            <button className="navButton">
              <a href="/signup">Register</a>
            </button>
            <button className="navButton">
              <a href="/login">Login</a>
            </button>
          </div>
        )}
        {isLogin && (
          <div className="navItems">
            <p className="email">{dataUser.email}</p>
            <button
              className="navButton"
              onClick={() => {
                usenavigate("/transaction");
              }}
            >
             Transaction
            </button>
            <button className="navButton" onClick={handle}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
