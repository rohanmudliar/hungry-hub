const FiltersBlank = ({ filterLabels }) => {
  return (
    <div className="filter-container">
      <ul>
        {filterLabels.map((filter) => (
          <li
            className="shimmerBG"
            style={{ width: "100px", height: "40px" }}
            key={filter.id}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default FiltersBlank;
