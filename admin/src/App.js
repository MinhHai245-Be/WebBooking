import "./App.css";
import {  Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Silebar/NavBar";
import HomePage from "./components/Homepage/HomePage";
import Login from "./components/Users/Login";
import { useContext, useEffect } from "react";
import { AppContext } from "./components/Context/AppContext";
import HotelList from "./components/HotelList/HotelList";
import AddHotel from "./components/HotelList/AddHotel";
import RoomList from "./components/RoomList/RoomList";
import AddRoom from "./components/RoomList/AddRoom";
import Transactions from "./components/transactions/Transaction";

function App() {
  const {isLogin} = useContext(AppContext)
  const navigate =useNavigate()
  useEffect(()=>{
    if(!isLogin){
       navigate('/login')
    }
  })
  return (   
    <div>    
        {isLogin && <Navbar/>}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/newhotel/:idhotel" element={<AddHotel />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/newroom/:idroom" element={<AddRoom />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
    </div>
  );
}

export default App;
