import ActivityFilter from "../ActivityFilter/ActivityFilter";
import ContinentFilter from "../ContinentFilter/ContinentFilter";
import CountrySort from "../CountrySort/CountrySort";
import SearchBar from "../SearchBar/SearchBar";
import "./Nav.modules.css";
import { Link } from "react-router-dom";
import UpdateActivityButton from "../UpdateActivityButton/UpdateActivityButton";
import ActivitySelector from "../ActivitySelector/ActivitySelector";

export const Nav = () => {
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
        <div className="filtros">
          <UpdateActivityButton />
        </div>
        <ActivitySelector />
      </div>
      <div className="busqueda">
        <SearchBar />
      </div>
    </div>
  );
};
