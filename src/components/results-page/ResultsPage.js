import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Wrapper from "../common/Wrapper";
import Filters from "./filter-section/Filters";
import Card from "./card/Card";
import CardBlank from "./card/CardBlank";

import {
  MUMBAIURL,
  DELIVERY_FILTER_ID,
  RATING4_FILTER_ID,
  COSTFORTWO_FILTER_ID,
  DATA_SET,
} from "../../constants/results-page";

import "./ResultsPage.scss";

const BLANK_DATA_ARRAY = new Array(15).fill(true);

const ResultsPage = () => {
  const { locationName } = useParams();
  const [dataCards, setDataCards] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [isResultsPageLoading, setIsResultsPageLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(MUMBAIURL);
        const json = await response.json();
        const data =
          json.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
            .restaurants ||
          json.data.cards[5].card.card.gridElements.infoWithStyle.restaurants;
        const dataMerge = [...data, ...DATA_SET];
        const idHolders = [];

        const uniqueData = dataMerge.filter(({ info: { id } }) => {
          if (!idHolders.includes(id)) {
            idHolders.push(id);
            return true;
          }

          return false;
        });

        setDataCards(uniqueData);
        setCardList(uniqueData);
        setIsResultsPageLoading(false);
      } catch (err) {
        setShowError(true);
        console.log("Error occured", err);
      }
    })();
  }, []);

  useEffect(() => {
    let filteredData = [...cardList];

    if (activeFilters.includes(DELIVERY_FILTER_ID)) {
      filteredData = filteredData.sort((a, b) => {
        return a.info.sla.deliveryTime - b.info.sla.deliveryTime;
      });
    }

    if (activeFilters.includes(RATING4_FILTER_ID)) {
      filteredData = filteredData.filter(
        ({ info: { avgRating } }) => avgRating >= 4.0
      );
    }

    if (activeFilters.includes(COSTFORTWO_FILTER_ID)) {
      filteredData = filteredData.filter(
        ({ info: { costForTwo } }) =>
          +costForTwo.split(" for two")[0].split("₹")[1] <= 300
      );
    }

    setCardList(filteredData);
  }, [activeFilters]);

  const filterOptionClicked = ({ action, payload }) => {
    setIsResultsPageLoading(true);

    switch (action) {
      case "ADD":
        setActiveFilters((pState) => (newDataArray = [payload, ...pState]));
        break;

      case "REMOVE":
        setActiveFilters((pState) => pState.filter((data) => data !== payload));
        break;

      default:
        setActiveFilters(activeFilters);
        break;
    }

    setTimeout(() => {
      // Currently I'm not hitting API as soon as any Filter is applied because I dont have latitude longtitude to fetch the results. So setting it to false after 2 seconds.
      setIsResultsPageLoading(false);
    }, 2000);
  };

  if (showError) {
    return (
      <Wrapper>
        Something went wrong with Swiggy's API.
        <br />
        <br />
        (Yes, I am using Swiggy's API to show few cards)
        <br />
        <br />
        Please refresh the page or try again.
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="results-page-container">
        <div className="section-title">
          Restaurants with online food delivery in Mumbai
        </div>

        <Filters
          activeFilters={activeFilters}
          isResultsPageLoading={isResultsPageLoading}
          setFilterOptionFn={filterOptionClicked}
        />

        <div className="cards-wrapper">
          {!isResultsPageLoading
            ? cardList.map((data) => (
                <Card key={data.info.id} cardDetails={data.info} />
              ))
            : BLANK_DATA_ARRAY.map((data, idx) => <CardBlank key={idx} />)}
        </div>
      </div>
    </Wrapper>
  );
};

export default ResultsPage;
