import { useEffect, useState } from 'react';
import './roomlist.css'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const RoomList = () => {
    const [page, setPage] = useState(1);
    const [rooms, setRooms] = useState();
    const [totalPages, setTotalPage] = useState(1)
    const navigate = useNavigate()
    useEffect(() => {
        if(!rooms){
          axios.get(`http://localhost:5000/admin/rooms/${page}`)
        .then(response => {
            setRooms(response.data.rooms)
            setTotalPage(response.data.totalPages)
        })
        } else{
          axios.get(`http://localhost:5000/admin/rooms/${page}`)
        .then(response => {
            setRooms(response.data.rooms)
            setTotalPage(response.data.totalPages)
        })
        }
    }, [rooms, page, totalPages]);

    const deleteRoom = (id) => {
        
          axios.post('http://localhost:5000/admin/deleteroom', {id : id}).then(result => {
            if(result.data){
              alert("Xoa thanh cong!")
            }
          }).catch(err => {
            console.log(err)
          })
    }
    
     
   return (
   <div className="room-list">
    <div className='title-page'>
        <h3>Rooms List</h3>
         <button onClick={() => {navigate('/newroom/addroom')}}>Add New</button>
    </div> 
    {rooms && (
        <table className="transaction-table2">
        <thead>
          <tr>
            <th>
              <input type="checkbox"></input>
            </th>
            <th>| ID</th>
            <th>| Title</th>
            <th>| Description</th>
            <th>| Price</th>
            <th>| Max People</th>
            <th>| Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr>
              <td>
                <input type="checkbox"></input>
              </td>
              <td>{room._id}</td>
              <td>{room.title}</td>
              <td>{room.desc}</td>
              <td>{room.price}</td>
              <td>{room.maxPeople}</td>
              <td >
                <button type='submit' onClick={() => deleteRoom(room._id)}>Delete</button>
                <button type='submit' onClick={() => navigate(`/newroom/${room._id}`)}>Edit</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    <div className='page'>
        <p>{page} - {totalPages} of {totalPages}</p>
        <button onClick={() => {
            if(page > 0 && page < totalPages){
                setPage(page-1)
            }
        }}><FontAwesomeIcon icon={faAngleLeft}/></button>
        <button onClick={()=> {
            if(page > 0 && page < totalPages){
                setPage(page+1)
            }
        }}><FontAwesomeIcon icon={faAngleRight}/></button> 
    </div>
   </div>)
}
export default RoomList;