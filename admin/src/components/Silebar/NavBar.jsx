import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightFromBracket,
  faDashboard,
  faTruck,
  faCreditCard,
  faShop
} from "@fortawesome/free-solid-svg-icons";

import "./navbar.css";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const {setIsLogin} = useContext(AppContext)
  return (
    <div className="navbar">
      <hr />
      <div className="navbar-left">
        <h3>Admin Page</h3>
        <div className="nav-links">
          <label>Main</label>
          <Link className="link">
            <FontAwesomeIcon
              icon={faDashboard}
              style={{ color: "blueviolet" }}
            />{" "}
            Dashboard
          </Link>
        </div>
        <div className="nav-links">
          <label>List</label>
          <Link className="link">
            <FontAwesomeIcon icon={faUser} style={{ color: "blueviolet" }} />{" "}
            Users
          </Link>
          <Link to="/hotels" className="link">
            <FontAwesomeIcon icon={faShop} style={{ color: "blueviolet" }} />{" "}
            Hotels
          </Link>
          <Link to="/rooms" className="link">
            <FontAwesomeIcon
              icon={faCreditCard}
              style={{ color: "blueviolet" }}
            />{" "}
            Rooms
          </Link>
          <Link to="/transactions" className="link">
            <FontAwesomeIcon icon={faTruck} style={{ color: "blueviolet" }} />{" "}
            Transactions
          </Link>
        </div>
        <div className="nav-links">
          <label>New</label>
          <Link to="/newhotel/addhotel" className="link">
            <FontAwesomeIcon icon={faShop} style={{ color: "blueviolet" }} />{" "}
            New Hotel
          </Link>
          <Link to="/newroom/addroom" className="link">
            <FontAwesomeIcon
              icon={faCreditCard}
              style={{ color: "blueviolet" }}
            />{" "}
            New Room
          </Link>
        </div>
        <div className="nav-links">
          <label>user</label>
          <Link className="link" onClick={() => setIsLogin(false)}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ color: "blueviolet" }}
            />{" "}
            Logout
          </Link>
        </div>
      </div>
        <Outlet/>
      
    </div>
  );
};
export default Navbar;
