import { useContext, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./transaction.css";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { format, parseISO } from 'date-fns';
const Transaction = () => {
  const [dataTran, setDateTran] = useState();
  const { dataUser } = useContext(AppContext);

  useEffect(() => {
    if (dataUser) {
      axios
        .get(`http://localhost:5000/hotels/transaction/${dataUser.username}`)
        .then((response) => {
          setDateTran(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dataUser]);
  return (
    <div>
      <Navbar />
      <Header type={"list"} />
      <div class="container">
        <h3>Your Transactions</h3>
        <table class="transaction-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {dataTran &&
              dataTran.map((item, index) => (
                <tr>
                  <td>{index}</td>
                  <td>{item.hotel}</td>
                  <td>{item.room.join(', ')}</td>
                  <td>{format(parseISO(item.dateStart), 'd/M/yyyy')} - {format(parseISO(item.dateEnd), 'd/M/yyyy')}</td>
                  <td>${item.price}</td>
                  <td>{item.payment}</td>
                  <td className={`${item.status}`}><button>{item.status}</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Transaction;
