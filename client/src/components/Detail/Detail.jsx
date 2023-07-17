import { useParams, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { fetchCountryById, resetSelectedActivity } from "../../Redux/actions";
import { useEffect } from "react";
import "./Detail.modules.css";

const Detail = ({ country, activities, fetchCountryById }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCountryById(id);
  }, [id, fetchCountryById]);

  if (!country) {
    return <div>Loading...</div>;
  }

  const { name, flagImage, continent, capital, subregion, area, population } =
    country;

  const handleGoBack = () => {
    dispatch(resetSelectedActivity());
    navigate(-1); 
  };

  // Filtrar las actividades por el país actual
  const countryActivities = activities.filter((activity) =>
    activity.Countries.includes(name)
  );

  return (
    <div className="Detail2">
      <div className="Detail">
        <div className="infopais">
          {id && <p>ID: {id}</p>}
          <h1>{name}</h1>
          {flagImage && <img src={flagImage} alt={name} />}
          {continent && <p>Continent: {continent}</p>}
          {capital && <p>Capital: {capital}</p>}
          {subregion && <p>Subregion: {subregion}</p>}
          {area && <p>Area: {area}</p>}
          {population && <p>Population: {population}</p>}
        </div>
        <div className="activities"></div>
        {countryActivities.length > 0 && (
          <div>
            <p>Activities:</p>
            <ul>
              {countryActivities.map((activity) => (
                <li key={activity.id}>
                  <p>Activity Name: {activity.name}</p>
                  <p>Difficulty: {activity.difficulty}</p>
                  <p>Duration: {activity.duration}</p>
                  <p>Season: {activity.season}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="button-container">
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    country: state.selectedCountry,
    activities: state.activities,
  };
};

export default connect(mapStateToProps, { fetchCountryById })(Detail);
