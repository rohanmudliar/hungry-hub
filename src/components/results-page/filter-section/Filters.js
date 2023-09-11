import { useEffect, useState } from "react";
import FiltersBlank from "./FiltersBlank";
import Cross from "jsx:../../../assets/icons/cross.svg";
import "./Filters.scss";
import { FILTER_OPTIONS } from "../../../constants/results-page";

const Filters = ({
  setFilterOptionFn,
  activeFilters,
  isResultsPageLoading,
}) => {
  const [filterLabels, setFilterLabels] = useState(FILTER_OPTIONS);

  useEffect(() => {
    if (activeFilters.length > 0) {
      setFilterLabels((pState) => {
        const selectedFilter = pState.filter((label) =>
          activeFilters.includes(label.id)
        );

        const newFilterArray = [...selectedFilter, ...filterLabels];

        return [...new Set(newFilterArray)];
      });
    }
  }, [activeFilters]);

  return (
    <div className="filter-container">
      <ul>
        {!isResultsPageLoading ? (
          filterLabels.map((filter) => (
            <li
              key={filter.id}
              onClick={() => {
                setFilterOptionFn({
                  action: activeFilters.includes(filter.id) ? "REMOVE" : "ADD",
                  payload: filter.id,
                });
              }}
              className={activeFilters.includes(filter.id) ? "selected" : ""}
            >
              {filter.label}

              {activeFilters.includes(filter.id) && (
                <span>
                  <Cross />
                </span>
              )}
            </li>
          ))
        ) : (
          <FiltersBlank filterLabels={filterLabels} />
        )}
      </ul>
    </div>
  );
};

export default Filters;
