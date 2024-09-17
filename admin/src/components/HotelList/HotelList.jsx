import { useEffect, useState } from 'react';
import './hotellist.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HotelList = () => {
    const [hotels, setHotels] = useState();
    const navigate = useNavigate()
    useEffect(() => {
        if(!hotels){
          axios.get('http://localhost:5000/admin/hotels')
        .then(response => {
            setHotels(response.data)
        })
        } else{
          axios.get('http://localhost:5000/admin/hotels')
        .then(response => {
            setHotels(response.data)
        })
        }
    }, [hotels]);

    const deleteHotel = (id) => {
        
          axios.post('http://localhost:5000/admin/deletehotel', {id : id}).then(result => {
            if(result.data){
              alert("Xoa thanh cong!")
            }
          }).catch(err => {
            console.log(err)
          })
    }
    
     
   return (
   <div className="hotel-list">
    <div className='title-page'>
        <h3>Hotel List</h3>
         <button onClick={() => {navigate('/newhotel/addhotel')}}>Add New</button>
    </div> 
    {hotels && (
        <table className="transaction-table1">
        <thead>
          <tr>
            <th>
              <input type="checkbox"></input>
            </th>
            <th>| ID</th>
            <th>| Name</th>
            <th>| Type</th>
            <th>| Title</th>
            <th>| City</th>
            <th>| Action</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>{hotel._id}</td>
              <td>{hotel.name}</td>
              <td>{hotel.type}</td>
              <td>{hotel.title}</td>
              <td>{hotel.city}</td>
              <td ><button type='submit' onClick={() => deleteHotel(hotel._id)}>Delete</button>
              <button type='submit' onClick={() => navigate(`/newhotel/${hotel._id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
   </div>)
}
export default HotelList;