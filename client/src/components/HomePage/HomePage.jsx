import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCountries, setSelectedContinent, setSelectedActivity, fetchActivities } from '../../Redux/actions';
import { Nav } from '../Nav/Nav';
import { useEffect } from 'react';
import Cards from '../Cards/Cards';
import { useParams, useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import './HomePage.modules.css'



const HomePage = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const selectedContinent = useSelector((state) => state.selectedContinent);
  const activities = useSelector((state) => state.activities);
  const selectedActivity = useSelector((state) => state.selectedActivity);
  const { page } = useParams();
  const navigate = useNavigate();

  const itemsPerPage = 10;
  const pageNumber = Number(page) || 1;
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    dispatch(fetchAllCountries());
    dispatch(fetchActivities());
  }, [dispatch]);

  const filteredCountries = countries.filter((country) => {
    if (selectedContinent && selectedActivity) {
      return (
        country.continent === selectedContinent &&
        activities.some(
          (activity) =>
            activity.name === selectedActivity &&
            activity.Countries.includes(country.name)
        )
      );
    } else if (selectedContinent) {
      return country.continent === selectedContinent;
    } else if (selectedActivity) {
      return activities.some(
        (activity) =>
          activity.name === selectedActivity &&
          activity.Countries.includes(country.name)
      );
    } else {
      return true;
    }
  });

  const countriesToShow = filteredCountries.slice(startIndex, endIndex);
  const totalCountries = filteredCountries.length;
  const totalPages = Math.ceil(totalCountries / itemsPerPage);



  const handleContinentChange = (continent) => {
    dispatch(setSelectedContinent(continent));
    navigate(`/home/1`);
  };

    const handleActivityChange = (activity) => {
    dispatch(setSelectedActivity(activity));
  };

  if (!countries || countries.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Nav
        onContinentChange={handleContinentChange}
        onActivityChange={handleActivityChange}
        activities={activities}
      />
      <h1 className='countries'>COUNTRIES</h1>
            <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        navigate={navigate}
      />
      <Cards countries={countriesToShow} />
      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        navigate={navigate}
      />
    </div>
  );
};

export default HomePage;
