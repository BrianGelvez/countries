import { useSelector, useDispatch } from "react-redux";
import { setSelectedContinent } from "../../Redux/actions";
import './ContinentFilter.modules.css'

const ContinentFilter = () => {
  const dispatch = useDispatch();
  const selectedContinent =
    useSelector((state) => state.selectedContinent) || "";

  const handleContinentChange = (e) => {
    const selectedContinent = e.target.value;
    dispatch(setSelectedContinent(selectedContinent));
  };

  const continents = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
    "Antarctica",
  ];

  return (
    <div className="ContinentFilter">
        <select className="Continent" value={selectedContinent} onChange={handleContinentChange}>
          <option value="">All Continents</option>
          {continents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
    </div>
  );
};

export default ContinentFilter;
