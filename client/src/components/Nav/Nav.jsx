import ActivityFilter from "../ActivityFilter/ActivityFilter";
import ContinentFilter from "../ContinentFilter/ContinentFilter";
import CountrySort from "../CountrySort/CountrySort";
import SearchBar from "../SearchBar/SearchBar";
import "./Nav.modules.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllCountries } from "../../Redux/actions";

export const Nav = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(fetchAllCountries());
  };

  return (
    <div className="Nav">
      <div className="NavContainer">
        <div className="countrySort">
          <CountrySort />
        </div>

        <div className="filtros">
        <ContinentFilter />
        <ActivityFilter />
        </div>


        <Link to="/form">
          <button className="CreateActivity">create activity</button>
        </Link>

        <button className="reset" onClick={handleReset}>
          Reset
        </button>

      </div>
      <div className="busqueda">
        <SearchBar />
      </div>
    </div>
  );
};
