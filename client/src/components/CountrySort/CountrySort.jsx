import { useDispatch } from "react-redux";
import {
  sortCountriesAscending,
  sortCountriesDescending,
  sortCountriesByPopulationAscending,
  sortCountriesByPopulationDescending,
} from "../../Redux/actions";
import "./CountrySort.modules.css";

const CountrySort = () => {
  const dispatch = useDispatch();

  const handleAlphabeticalSort = () => {
    dispatch(sortCountriesAscending());
  };

  const handleReverseAlphabeticalSort = () => {
    dispatch(sortCountriesDescending());
  };

  const handlePopulationSort = () => {
    dispatch(sortCountriesByPopulationAscending());
  };

  const handleReversePopulationSort = () => {
    dispatch(sortCountriesByPopulationDescending());
  };

  return (
    <div className="divbutons">
      <div className="topButtons">
        <button className="butons" onClick={handleAlphabeticalSort}>
          Sort A-Z
        </button>
        <button className="butons" onClick={handleReverseAlphabeticalSort}>
          Sort Z-A
        </button>
      </div>
      <button className="butons" onClick={handlePopulationSort}>
        Population (Ascending)
      </button>
      <button className="butons" onClick={handleReversePopulationSort}>
        Population (Descending)
      </button>
    </div>
  );
  
};

export default CountrySort;
