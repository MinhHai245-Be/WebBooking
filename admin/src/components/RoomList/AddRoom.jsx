import { useEffect, useRef, useState } from "react";
import "./addroom.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddRoom = () => {
  const [nameHotels, setNameHotels] = useState();
  const description = useRef();
  const title = useRef();
  const price = useRef();
  const maxpeoples = useRef();
  const rooms = useRef();
  const name = useRef();  
  const { idroom } = useParams();
  const navigate =  useNavigate();
  useEffect(() => {
    if (idroom !== "addroom") {
      Promise.all(
       [ axios.get("http://localhost:5000/admin/newroom"),
        axios.get(`http://localhost:5000/admin/inforoom/${idroom}`)]
      )
        .then(([response1, response2]) => {
          setNameHotels(response1.data);
          title.current.value = response2.data.title;
          description.current.value = response2.data.desc;
          maxpeoples.current.value = response2.data.maxPeople;
          rooms.current.value = response2.data.roomNumbers;
          price.current.value = response2.data.price
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get("http://localhost:5000/admin/newroom")
        .then((response) => {
          setNameHotels(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const listrooms = rooms.current.value
      .split(",")
      .map((item) => item.trim())
      .map((item) => Number(item));
    const newroom = {
      title: title.current.value,
      price: Number(price.current.value),
      description: description.current.value,
      maxpeoples: Number(maxpeoples.current.value),
      rooms: listrooms
    };
   if(idroom === "addroom"){
    newroom.nameHotel = name.current.value;
    if (
      newroom.nameHotel &&
      newroom.maxpeoples &&
      newroom.description &&
      newroom.title &&
      newroom.price &&
      newroom.rooms
    ) {
      axios
        .post("http://localhost:5000/admin/newroom", newroom)
        .then((result) => {
          if (result.data) {
            alert("Thanh cong");
            navigate('/rooms')
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Can nhap day du thong tin");
    }
   } else{
    if (
      newroom.maxpeoples &&
      newroom.description &&
      newroom.title &&
      newroom.price &&
      newroom.rooms
    ) {
      axios
        .post(`http://localhost:5000/admin/inforoom/${idroom}`, newroom)
        .then((result) => {
          if (result.data) {
            alert("Thanh cong");
            navigate('/rooms')
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Can nhap day du thong tin");
    }
   }
  };

  return (
    <div className="add-room">
      <div>
        <h3>Add New Hotel</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="addhotelform">
          <div className="addhotel-form ">
            <label>Title</label>
            <input ref={title} type="text" />
            <label>Price</label>
            <input ref={price} type="number" />
          </div>
          <div className="addhotel-form addhotel1">
            <label>Description</label>
            <input ref={description} type="text" />
            <label>Max Peoples</label>
            <input ref={maxpeoples} type="number" />
          </div>
        </div>
        <div className="choose-room">
          <div className="typeroomhotel1">
            <label>Rooms</label>
            <input
              ref={rooms}
              type="text"
              placeholder="give comma between room number"
            />
          </div>
          {(idroom === "addroom") && 
          (
            <div className="typeroomhotel1">
            <label>Choose a Hotel</label>
            {nameHotels && (
              <select ref={name}>
                {nameHotels.map((name) => (
                  <option value={`${name.name}`}>{name.name}</option>
                ))}
              </select>
            )}
          </div>
          )
          }
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
