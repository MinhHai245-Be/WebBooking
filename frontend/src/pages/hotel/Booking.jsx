import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./booking.css";
import Header from "../../components/header/Header";
import { AppContext } from "../../context/AppContext";
const Booking = () => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomsinfo, setRoomsinfo] = useState([]);
  const [card, setCard] = useState("Credit Card");
  const { dataUser } = useContext(AppContext);
  const [isDate, setIsDate] = useState(false);
  const [information, setInformation] = useState({});
  const [isReserve, setIsReserve] = useState(false);
  const [rooms, setRooms] = useState();
  const [count, setCount] = useState(0);
  const location = useLocation();
  const usenavigate = useNavigate();
  const fullname = useRef();
  const email = useRef();
  const phonenumber = useRef();
  const cardnumber = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataUser.username) {
      setInformation({
        username: dataUser.username,
        idhotel: location.state.name,
        fullname: fullname.current.value,
        email: email.current.value,
        phonenumber: phonenumber.current.value,
        cardnumber: cardnumber.current.value,
        date: date,
      });
    } else {
      alert("Ban chua dang nhap");
      usenavigate("/login");
    }
  };
  useEffect(() => {
    if (isDate) {
      axios
        .post("http://localhost:5000/hotels/booking", {
          id: location.state.id,
          date: date,
        })
        .then((result) => {
          setRooms(result.data);
        });
    }
  }, [date]);
  const dispatchInformation = () => {
    if (
      information.email &&
      information.phonenumber &&
      information.fullname &&
      card &&
      information.cardnumber &&
      information.date
    ) {
      axios.post("http://localhost:5000/hotels/transaction", {
        data: information,
        card: card,
        price:
          count *
          (Math.floor(
            Math.abs(date[0].endDate - date[0].startDate) /
              (1000 * 60 * 60 * 24)
          ) +
            1),
        roomsinfo: roomsinfo,
      });
      usenavigate("/transaction");
    } else {
      alert("Can nhap day du thong tin!");
    }
  };
    // Hàm xử lý khi chọn/bỏ chọn phòng
  const handleSelectRoom = (room, roomNumber) => {
    const isSelected = selectedRooms.some(
      selected => selected.roomNumber === roomNumber
    );

    if (isSelected) {
      setSelectedRooms(selectedRooms.filter(
        selected => selected.roomNumber !== roomNumber
      ));
    } else {
      setSelectedRooms([...selectedRooms, { roomNumber, price: room.price }]);
    }
  };

  // Tính tổng tiền va luu danh sach phong
  useEffect(() =>{
    const rooms = selectedRooms.map(room => room.roomNumber)
    const total =  selectedRooms.reduce((sum, room) => sum + room.price, 0)
    setCount(total)
    setRoomsinfo(rooms)
  }, [selectedRooms]);
  return (
    <div>
      <Navbar></Navbar>
      <Header type={"list"} />
      <div className="information">
        <div className="info1">
          <h3>{location.state.name}</h3>
          <p>{location.state.desc}</p>
        </div>
        <div className="info2">
          <p>
            <b>${location.state.price}</b> (1 nights)
          </p>
          <button onClick={() => setIsReserve(!isReserve)}>
            Reserve orBooks Now!
          </button>
        </div>
      </div>
  
      {isReserve && (
        <div className="transaction">
          <div className="tran1">
            <h2>Dates</h2>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setDate([item.selection]);
                setIsDate(true);
              }}
              moveRangeOnFirstSelection={false}
              ranges={date}
              minDate={new Date()}
            ></DateRange>
          </div>
          {isDate && (
            <div className="tran2">
              <form onChange={handleSubmit}>
                <h2>Reserve Info</h2>
                <label>Your Full Name:</label>
                <input
                  ref={fullname}
                  type="text"
                  placeholder="Full Name"
                ></input>
                <label>Your Email:</label>
                <input ref={email} type="email" placeholder="Email"></input>
                <label>Your Phone Number:</label>
                <input
                  ref={phonenumber}
                  type="text"
                  placeholder="Phone Number"
                ></input>
                <label>Your Identity Card Number:</label>
                <input
                  ref={cardnumber}
                  type="text"
                  placeholder="Card Number"
                ></input>
              </form>
            </div>
          )}
        </div>
      )}
      {isDate && (
        <div className="transaction2">
          <h3>Select rooms</h3>
          <div className="rooms">
            {rooms &&
              rooms.map((item) => (
                <div className="room">
                  <div className="room1">
                    <h6>{item.title}</h6>
                    <p>{item.desc}</p>
                    <p>Max people: {item.maxpeople}</p>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="room2">
                    {item.roomNumbers.map((room) => (
                      <div className="roominfo">
                        <label>{room}</label>
                        <input
                          type="checkbox" 
                          
                          id="toggleCheckbox"
                          onChange={() => {
                           handleSelectRoom(item,room)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          <h3>
            Total Bill$
            {count*
              (Math.floor(
                Math.abs(date[0].endDate - date[0].startDate) /
                  (1000 * 60 * 60 * 24)
              ) +
                1)}
          </h3>
          <div>
            <select onChange={(e) => setCard(e.target.value)}>
              <option>Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
            </select>
            <button onClick={dispatchInformation}>Reserve Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
