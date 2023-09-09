import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import CITIES from "../../constants/cities_db.json";

const Search = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [cityName, setCityName] = useState("");
  const [filteredCities, setFilteredCities] = useState(CITIES);
  const [ignoreBlur, setIgnoreBlur] = useState(false);
  const [addErrorClass, setAddErrorClass] = useState(false);
  const inputSearch = useRef();

  const onCityClickHandler = (_cityName) => {
    setCityName(_cityName);
    setShowDropdown(false);
    setIgnoreBlur(false);
  };

  const inputFocusBlurHandler = (e) => {
    if (e.type === "blur" && ignoreBlur) return;

    setShowDropdown((pState) => !pState);
  };

  const onChangeHandler = (e) => {
    setCityName(e.target.value);
    setFilteredCities(
      CITIES.filter(({ City }) =>
        City.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      )
    );
  };

  const onSubmitHandler = () => {
    if (cityName === "") {
      setAddErrorClass(true);
      inputSearch.current.focus();
      return;
    }

    navigate(`/location/${cityName.toLocaleLowerCase()}`);
  };

  useEffect(() => {
    addErrorClass &&
      setTimeout(() => {
        setAddErrorClass(false);
      }, 500);
  }, [addErrorClass]);

  return (
    <>
      <div className="filter-container">
        <input
          ref={inputSearch}
          type="search"
          placeholder="Search for Popular Cities"
          value={cityName}
          className={addErrorClass ? "errorShake" : ""}
          onFocus={(e) => {
            inputFocusBlurHandler(e);
          }}
          onBlur={(e) => {
            inputFocusBlurHandler(e);
          }}
          onChange={onChangeHandler}
        />
        <button onClick={onSubmitHandler}>Search</button>
      </div>
      {filteredCities.length > 0 && showDropdown && (
        <div className="filter-search-results">
          <ul>
            {filteredCities.map(({ City, State, District }) => (
              <li
                key={City + State + District}
                onMouseDown={() => {
                  setIgnoreBlur(true);
                }}
                onClick={() => {
                  onCityClickHandler(City);
                }}
              >
                {City} - {State}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Search;
