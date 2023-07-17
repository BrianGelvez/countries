import axios from 'axios';



export const fetchAllCountriesRequest = () => {
  return {
    type: 'FETCH_ALL_COUNTRIES_REQUEST',
  };
};

export const fetchAllCountriesSuccess = (countries) => {
  return {
    type: 'FETCH_ALL_COUNTRIES_SUCCESS',
    payload: countries,
  };
};

export const fetchAllCountriesFailure = (error) => {
  return {
    type: 'FETCH_ALL_COUNTRIES_FAILURE',
    payload: error,
  };
};

export const fetchAllCountries = (page) => {
  return (dispatch) => {
    dispatch(fetchAllCountriesRequest());
    axios
      .get(`/countries/${page}`)
      .then((response) => {
        dispatch(fetchAllCountriesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchAllCountriesFailure(error.message));
      });
  };
};

//-----------------------------------------------------------------------------------------------------------

export const searchCountriesRequest = () => {
  return {
    type: 'SEARCH_COUNTRIES_REQUEST',
  };
};

export const searchCountriesSuccess = (countries) => {
  return {
    type: 'SEARCH_COUNTRIES_SUCCESS',
    payload: countries,
  };
};

export const searchCountriesFailure = (error) => {
  return {
    type: 'SEARCH_COUNTRIES_FAILURE',
    payload: error,
  };
};

export const searchCountries = (searchTerm) => {
  return (dispatch) => {
    dispatch(searchCountriesRequest());

    axios
      .get(`/countries/search/name?name=${searchTerm}`)
      .then((response) => {
        dispatch(searchCountriesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(searchCountriesFailure(error.message));
      });
  };
};

//-----------------------------------------------------------------------------------------------------------

export const fetchCountryByIdRequest = () => {
  return {
    type: 'FETCH_COUNTRY_BY_ID_REQUEST',
  };
};

export const fetchCountryByIdSuccess = (country) => {
  const activity = country.Activities && country.Activities[0];

  return {
    type: 'FETCH_COUNTRY_BY_ID_SUCCESS',
    payload: {
      country,
      activity,
    },
  };
};

export const fetchCountryByIdFailure = (error) => {
  return {
    type: 'FETCH_COUNTRY_BY_ID_FAILURE',
    payload: error,
  };
};

export const fetchCountryById = (id) => {
  return (dispatch) => {
    dispatch(fetchCountryByIdRequest());

    axios.get(`/countries/id/${id}`)
      .then((response) => {
        dispatch(fetchCountryByIdSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchCountryByIdFailure(error.message));
      });
  };
};

//-----------------------------------------------------------------------------------------------------------

export const createActivitySuccess = (newActivity) => {
  return {
    type: 'CREATE_ACTIVITY_SUCCESS',
    payload: newActivity,
  };
};

export const createActivityFailure = (errorMessage) => {
  return {
    type: 'CREATE_ACTIVITY_FAILURE',
    payload: errorMessage,
  };
};

export const setFormData = (formData) => {
  return {
    type: 'SET_FORM_DATA',
    payload: formData,
  };
};

export const resetFormData = () => {
  return {
    type: 'RESET_FORM_DATA',
  };
};

export const createActivity = (formData) => {
  return async (dispatch) => {
    try {
      // Realiza la solicitud POST al backend para crear la actividad
      const response = await axios.post('/activities', formData);
      const newActivity = response.data;
      
      dispatch(createActivitySuccess(newActivity));
    } catch (error) {
      dispatch(createActivityFailure(error.message));
    }
  };
};

//-----------------------------------------------------------------------------------------------------------

export const setSelectedContinent = (continent) => {
  return {
    type: 'SET_SELECTED_CONTINENT',
    payload: continent,
  };
};

//-----------------------------------------------------------------------------------------------------------

export const setSelectedActivity = (activity) => {
  return {
    type: 'SET_SELECTED_ACTIVITY',
    payload: activity,
  };
};

const fetchActivitiesSuccess = (activities) => {
  return {
    type: 'FETCH_ACTIVITIES_SUCCESS',
    payload: activities,
  };
};

const fetchActivitiesFailure = () => {
  return {
    type: 'FETCH_ACTIVITIES_FAILURE',
  };
};


export const fetchActivities = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/activities');
      const data = response.data;
      dispatch(fetchActivitiesSuccess(data));
    } catch (error) {
      console.error('Error fetching activities:', error);
      dispatch(fetchActivitiesFailure());
    }
  };
};

//-----------------------------------------------------------------------------------------------------------

export const resetSelectedActivity = () => ({
  type: "RESET_SELECTED_ACTIVITY",
});

//-----------------------------------------------------------------------------------------------------------

export const sortCountriesAscending = () => {
  return {
    type: 'SORT_COUNTRIES_ASCENDING',
  };
};

export const sortCountriesDescending = () => {
  return {
    type: 'SORT_COUNTRIES_DESCENDING',
  };
};

//-----------------------------------------------------------------------------------------------------------

export const sortCountriesByPopulationAscending = () => {
  return {
    type: 'SORT_COUNTRIES_BY_POPULATION_ASCENDING',
  };
};

export const sortCountriesByPopulationDescending = () => {
  return {
    type: 'SORT_COUNTRIES_BY_POPULATION_DESCENDING',
  };
};

//-----------------------------------------------------------------------------------------------------------