import { useEffect, useRef, useState } from "react";
import "./addhotel.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddHotel = () => {
  const [selectedRooms, setSelectedRooms] = useState();
  const name = useRef();
  const city = useRef();
  const type = useRef();
  const distance = useRef();
  const description = useRef();
  const images = useRef();
  const address = useRef();
  const title = useRef();
  const price = useRef();
  const features = useRef(false);
  const rooms = useRef();
  const {idhotel} = useParams();
  const navigate = useNavigate()
  useEffect(()=>{
      if(idhotel){
        axios.get(`http://localhost:5000/admin/infohotelupdated/${idhotel}`).then(response => {
            const dataHotel = response.data;
            name.current.value = dataHotel.name;
            city.current.value = dataHotel.city;
            title.current.value = dataHotel.title;
            distance.current.value = dataHotel.distance;
            description.current.value = dataHotel.desc;
            type.current.value = dataHotel.type;
            images.current.value = dataHotel.photos;
            address.current.value = dataHotel.address;
            price.current.value = dataHotel.cheapestPrice;
            features.current.value = dataHotel.features;

        }).catch(err => {
          console.log(err);
        })
      }
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    const listImages = images.current.value
      .split(",")
      .map((link) => link.trim());
    const newhotel = {
      name: name.current.value,
      city: city.current.value,
      type: type.current.value,
      distance: distance.current.value,
      description: description.current.value,
      images: listImages,
      address: address.current.value,
      title: title.current.value,
      price: Number(price.current.value),
      features: features.current.value,
      rooms: selectedRooms,
    };
   if(idhotel === "addhotel"){
    if (
      newhotel.name &&
      newhotel.city &&
      newhotel.type &&
      newhotel.distance &&
      newhotel.description &&
      newhotel.images &&
      newhotel.address &&
      newhotel.title &&
      newhotel.price &&
      newhotel.features &&
      newhotel.rooms
    ) {
      axios
        .post("http://localhost:5000/admin/newhotel", newhotel)
        .then((result) => {
          if(result.data){
            alert("Thanh cong");
            navigate('/hotels')
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
      newhotel.name &&
      newhotel.city &&
      newhotel.type &&
      newhotel.distance &&
      newhotel.description &&
      newhotel.images &&
      newhotel.address &&
      newhotel.title &&
      newhotel.price &&
      newhotel.features 
    ) {
      axios
        .post(`http://localhost:5000/admin/updatedhotel/${idhotel}`, newhotel)
        .then((result) => {
          if(result.data){
            alert("Thanh cong");
          }
          navigate('/hotels')
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Can nhap day du thong tin");
    }
   }
  };
  // Hàm xử lý sự thay đổi trong <select>
  const handleChangeSelect = () => {
    const options = rooms.current.options;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedRooms(selectedOptions);
  };
  return (
    <div className="add-hotel">
      <div>
        <h3>Add New Product</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="addhotelform">
          <div className="addhotel-form">
            <label>Name</label>
            <input ref={name} type="text" />
            <label>City</label>
            <input ref={city} type="text" />
            <label>Distance from City Center</label>
            <input ref={distance} type="text" />
            <label>Description</label>
            <input ref={description} type="text" />
            <label>Images</label>
            <input ref={images} type="text" id="images" />
          </div>
          <div className="addhotel-form addhotel1">
            <label>Type</label>
            <select ref={type} id = "type">
              <option value="Hotel">Hotel</option>
              <option value="Apartments">Apartments</option>
              <option value="Resorts">Resorts</option>
              <option value="Villas">Villas</option>
              <option value="Cabins">Cabins</option>
            </select>
            <label>Address</label>
            <input ref={address} type="text" />
            <label>Title</label>
            <input ref={title} type="text" />
            <label>Price</label>
            <input ref={price} type="number" />
            <label>Featured</label>
            <select ref={features}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
        </div>
        {(idhotel === "addhotel") && (
          <div className="typeroomhotel">
          <select ref={rooms} size={5} multiple onChange={handleChangeSelect}>
            <option value="2 Bed Room">2 Bed Room</option>
            <option value="1 Bed Room">1 Bed Room</option>
            <option value="Basedment Double Room">Basedment Double Room</option>
            <option value="Superior basement Room">
              Superior basement Room
            </option>
            <option value="Deluxe Room">Deluxe Room</option>
          </select>
        </div>
        )}
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default AddHotel;
