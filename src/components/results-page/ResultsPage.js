import { useParams } from "react-router-dom";

const ResultsPage = () => {
  const { locationName } = useParams();

  return <div>Loading results for location - {locationName}</div>;
};

export default ResultsPage;
