const initialState = {
  formData: {
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: [],
  },
  countries: [],
  activities: [],
  filteredCountries: [],
  createdActivity: null,
  selectedCountry: null,
  selectedContinent: null,
  selectedActivity: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_COUNTRIES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_ALL_COUNTRIES_SUCCESS':
      return {
        ...state,
        loading: false,
        countries: action.payload,
        error: null,
      };
    case 'FETCH_ALL_COUNTRIES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SEARCH_COUNTRIES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'SEARCH_COUNTRIES_SUCCESS':
      return {
        ...state,
        loading: false,
        countries: action.payload,
        error: null,
      };
    case 'SEARCH_COUNTRIES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'FETCH_COUNTRY_BY_ID_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_COUNTRY_BY_ID_SUCCESS':
      return {
        ...state,
        loading: false,
        selectedCountry: action.payload.country,
        selectedActivity: action.payload.activity,
        error: null,
      };

    case 'FETCH_COUNTRY_BY_ID_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'CREATE_ACTIVITY_SUCCESS':
      return {
        ...state,
        createdActivity: action.payload,
      };
    case 'CREATE_ACTIVITY_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_FORM_DATA':
      console.log(action.payload);
      return {
        ...state,
        formData: action.payload,
      };
    case 'RESET_FORM_DATA':
      return {
        ...state,
        formData: initialState.formData,
      };
    case 'SET_SELECTED_CONTINENT':
      return {
        ...state,
        selectedContinent: action.payload,
      };
    case 'SET_SELECTED_ACTIVITY':
      return {
        ...state,
        selectedActivity: action.payload,
      };
    case 'FETCH_ACTIVITIES_SUCCESS':
      return {
        ...state,
        activities: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_ACTIVITIES_FAILURE':
      return {
        ...state,
        loading: false,
        error: 'Failed to fetch activities',
      };
    case "RESET_SELECTED_ACTIVITY":
      return {
        ...state,
        selectedActivity: null,
      };
    case 'SORT_COUNTRIES_ASCENDING':
      return {
        ...state,
        countries: [...state.countries].sort((a, b) => a.name.localeCompare(b.name)),
      };

    case 'SORT_COUNTRIES_DESCENDING':
      return {
        ...state,
        countries: [...state.countries].sort((a, b) => b.name.localeCompare(a.name)),
      };

    case 'SORT_COUNTRIES_BY_POPULATION_ASCENDING':
      return {
        ...state,
        countries: [...state.countries].sort((a, b) => a.population - b.population),
      };

    case 'SORT_COUNTRIES_BY_POPULATION_DESCENDING':
      return {
        ...state,
        countries: [...state.countries].sort((a, b) => b.population - a.population),
      };
    default:
      return state;
  }
};

export default reducer;