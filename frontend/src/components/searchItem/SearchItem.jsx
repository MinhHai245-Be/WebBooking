import { useNavigate } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({data, free_cancel}) => {
  const usenavigate = useNavigate();
  return (
    <div>
      {data.map(data=> <div className="searchItem">
      <img
        src={data.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{data.name}</h1>
        <span className="siDistance">{data.distance} from center</span>
        <span className="siTaxiOp">{data.tag}</span>
        <span className="siSubtitle">
          {data.city}
        </span>
        <span className="siFeatures">
          {data.type}
        </span>
        {/* If can cancel */}
        {free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (<div></div>)}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{data.rate_text}</span>
          <button>{data.rate}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${data.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={() => {usenavigate(`/hotels/${data._id}`, {state : {id : data._id}})}}>See availability</button>
        </div>
      </div>
    </div>)}
    </div>
  );
};

export default SearchItem;
