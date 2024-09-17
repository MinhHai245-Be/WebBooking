import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faCircleDollarToSlot,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";

const HomePage = () => {
  const [userCount, setUserCount] = useState();
  const [transactionCount, setTransactionCount] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [avgmonthRevenue, setAvgmonthRevenue] = useState();
  const [recentTransaction, setRecentTransaction] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin")
      .then((response) => {
        setRecentTransaction(response.data.recentTransaction);
        setUserCount(response.data.userCount);
        setTransactionCount(response.data.transactionCount);
        setTotalRevenue(response.data.totalRevenue[0].total);
        setAvgmonthRevenue(response.data.avgmonthRevenue[0].avg);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home">
      <div className="list-infoboard">
        <div className="infoboard">
          <label>Users</label>
          <p>{userCount}</p>
          <button className="users">
            <FontAwesomeIcon icon={faUser} style={{ color: "red" }} />
          </button>
        </div>
        <div className="infoboard">
          <label>Orders</label>
          <p>{transactionCount}</p>
          <button className="orders">
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ color: "yellow" }}
            />
          </button>
        </div>
        <div className="infoboard">
          <label>EARNINGS</label>
          <p>${totalRevenue}</p>
          <button className="earnings">
            <FontAwesomeIcon
              icon={faCircleDollarToSlot}
              style={{ color: "green" }}
            />
          </button>
        </div>
        <div className="infoboard">
          <label>BLANCE</label>
          <p>${avgmonthRevenue}</p>
          <button className="blance">
            <FontAwesomeIcon
              icon={faCalculator}
              style={{ color: "blueviolet" }}
            />
          </button>
        </div>
      </div>
      <div >
        <h3>Latest Transactions</h3>

        {recentTransaction && (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox"></input>
                </th>
                <th>| ID</th>
                <th>| User</th>
                <th>| Hotel</th>
                <th>| Room</th>
                <th>| Date</th>
                <th>| Price</th>
                <th>| Payment</th>
                <th>| Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransaction.map((tran) => (
                <tr>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td>{tran._id}</td>
                  <td>{tran.user}</td>
                  <td>{tran.hotel}</td>
                  <td>{tran.room.join(", ")}</td>
                  <td>
                    {format(parseISO(tran.dateStart), "d/M/yyyy")} -{" "}
                    {format(parseISO(tran.dateEnd), "d/M/yyyy")}
                  </td>
                  <td>{tran.price}</td>
                  <td>{tran.payment}</td>
                  <td className={`${tran.status}`}><button>{tran.status}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default HomePage;
