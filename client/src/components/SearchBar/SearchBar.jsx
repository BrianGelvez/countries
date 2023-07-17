import { useDispatch } from 'react-redux';
import { searchCountries } from '../../Redux/actions';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.modules.css'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchCountries(searchTerm));
  };

  return (
    <div className='SearchBar'>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search countries..."
      />
      <Link to="/home/1">
      <button onClick={handleSearch}>Search</button>
      </Link>
    </div>
  );
};

export default SearchBar;
