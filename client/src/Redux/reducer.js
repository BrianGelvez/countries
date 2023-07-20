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

      case 'UPDATE_ACTIVITY_SUCCESS': {
        // Encuentra la actividad actualizada en el arreglo de actividades y actualiza su contenido
        const updatedActivityIndex = state.activities.findIndex(activity => activity.id === action.payload.id);
        if (updatedActivityIndex !== -1) {
          const updatedActivities = [...state.activities];
          updatedActivities[updatedActivityIndex] = action.payload;
          return {
            ...state,
            activities: updatedActivities,
            loading: false,
            error: null,
          };
        }
        return {
          ...state,
          loading: false,
          error: 'Failed to update activity',
        };
      }
  
      case 'UPDATE_ACTIVITY_FAILURE':
        // Puedes manejar errores relacionados con la actualización aquí
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case 'DELETE_ACTIVITY_SUCCESS': {
          // Filtramos las actividades para eliminar la actividad con el ID proporcionado
          const updatedActivities = state.activities.filter(
            (activity) => activity.id !== action.payload
          );
        
          return {
            ...state,
            activities: updatedActivities,
            selectedActivity: null,
          };
        }
        
        case 'DELETE_ACTIVITY_FAILURE':
          return {
            ...state,
            error: 'Error deleting activity.',
          };
    default:
      return state;
  }
};

export default reducer;