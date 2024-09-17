import "./featured.css";
import { useState, useEffect } from "react";
import axios from "axios";
const Featured = () => {
  const [data, setData] = useState();
  useEffect(() => {
    axios.get(
      "http://localhost:5000/hotels/homepage"
    ).then(response => {
      setData(response.data);
    }).catch(err => {
      console.log(err)
    })
    
  }, []);
  

  
  return (
    <div className="featured">
      {data && data.map((citydata) => (
      <div className="featuredItem">
        <img
          src={`http://localhost:5000/uploads/${citydata.image}`}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>{citydata.city}</h1>
          <h2>{citydata.count} properties</h2>
        </div>
      </div>
    ))} 
    </div>
  );
};

export default Featured;
