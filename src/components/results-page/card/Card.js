import { IMG_SRC } from "../../../constants/results-page";
import Star from "jsx:../../../assets/icons/star.svg";
import timerImage from "../../../assets/images/results-page/timer.png";

import "./Card.scss";

const Card = ({ cardDetails }) => {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={IMG_SRC + cardDetails.cloudinaryImageId} alt="citiImage" />
      </div>
      <div className="title">
        <p>{cardDetails.name}</p>
      </div>
      <div className="ratings">
        <span>
          <Star />
        </span>
        <p>{cardDetails.avgRating}</p>
      </div>
      <div className="cuisines">
        <p>{cardDetails.cuisines.join(", ")}</p>
      </div>
      <div className="areaName">
        <p>{cardDetails.areaName}</p>
      </div>
      <div className="deliveryTime">
        <img src={timerImage} alt="time" />
        <p>{cardDetails.sla.deliveryTime} mins</p>
      </div>
    </div>
  );
};

export default Card;
