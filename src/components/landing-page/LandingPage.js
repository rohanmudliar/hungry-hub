import { Link } from "react-router-dom";

import Wrapper from "../common/Wrapper";
import Search from "../common/SearchBar";

import cityImage from "../../assets/images/landing-page/city-icons.png";

import FAMOUS_CITIES_INDIA from "../../constants/popular-cities-india";

import "./LandingPage.scss";

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <Wrapper>
        <div className="landing-page">
          <div className="title-container">
            <h1 className="heading">Hungry Hub</h1>
            <h2 className="sub-heading">Your Culinary Destination</h2>
          </div>
          <div className="search-container">
            <Search />
          </div>
          <div className="cities-container">
            {FAMOUS_CITIES_INDIA.map(({ name, xPosInBG, yPosInBG }) => (
              <Link
                to={`/location/${name.toLocaleLowerCase()}`}
                className="cityWrapper"
                key={name}
              >
                <div className="image-container">
                  <img
                    style={{ left: `${xPosInBG}px`, top: `${yPosInBG}px` }}
                    src={cityImage}
                    alt="citiImage"
                  />
                </div>

                <p>{name}</p>
              </Link>
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default LandingPage;
