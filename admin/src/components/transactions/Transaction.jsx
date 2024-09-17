import { useState, useEffect } from "react";
import "./transactions.css";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Transactions = () => {
  const [transactions, setTransactions] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/transactions/${page}`)
      .then((response) => {
        setTransactions(response.data.transactions);
        setTotalPages(response.data.totalPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  return (
    <div className="home">
      <div>
        <h3>Transactions List</h3>

        {transactions && (
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
              {transactions.map((tran) => (
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
                  <td className={`${tran.status}`}>
                    <button>{tran.status}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="page">
          <p>
            {page} - {totalPages} of {totalPages}
          </p>
          <button
            onClick={() => {
              if (page > 0 && page < totalPages) {
                setPage(page - 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            onClick={() => {
              if (page > 0 && page < totalPages) {
                setPage(page + 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
