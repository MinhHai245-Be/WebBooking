import { useEffect, useState } from "react";
import axios from 'axios'
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const [topRating, setTopRating] = useState();
  
  useEffect(() => {
      axios.get('http://localhost:5000/hotels/ratinghotel').then(result => {
        setTopRating(result.data);
      }).catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div className="fp">
     {topRating && topRating.map(hotel => 
      <div className="fpItem">
      <img
        src={hotel.photos[0]}
        alt=""
        className="fpImg"
      />
      <span className="fpName"><a href="./hotels/0" target="_blank">{hotel.title}</a></span>
      <span className="fpCity">{hotel.city}</span>
      <span className="fpPrice">Starting from ${hotel.cheapestPrice}</span>
     
    </div>
     )}
      
    </div>
  );
};

export default FeaturedProperties;
