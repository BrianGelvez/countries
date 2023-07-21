import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  createActivity,
  resetFormData,
  fetchAllCountries,
} from "../../Redux/actions";
import "./FormPage.modules.css";
import { useNavigate } from "react-router-dom";
import validateForm from "./validateForm";

const FormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.formData);
  const countries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "countries") {
      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );

      if (!formData.countries.includes(value)) {
        dispatch(
          setFormData({
            ...formData,
            countries: [...formData.countries, ...selectedOptions],
          })
        );
      }
    } else {
      dispatch(setFormData({ ...formData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length === 0) {
      dispatch(createActivity(formData))
        .then(() => {
          setNotification({
            type: "success",
            message: "La actividad se creó exitosamente.",
          });
          dispatch(resetFormData());
        })
        .catch((error) => {
          setNotification({
            type: "error",
            message: "Hubo un problema al crear la actividad.",
          });
          console.error(error);
        });
    } else {
      setErrors(formErrors);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountrySelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    dispatch(
      setFormData({
        ...formData,
        countries: [...formData.countries, ...selectedOptions],
      })
    );
  };

  const handleCountryRemove = (country) => {
    const updatedCountries = formData.countries.filter((c) => c !== country);
    dispatch(setFormData({ ...formData, countries: updatedCountries }));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="form-page fondo">
      <div className="container">
        <h1 className="form-title">Create Activity</h1>
        {notification && (
          <div
            className={`notification ${
              notification.type === "success" ? "success" : "error"
            }`}
          >
            {notification.message}
          </div>
        )}
        <form className="form" onSubmit={handleSubmit} >
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Name Activity:
            </label>
            <input
              placeholder="Name Activity"
              className="form-input"
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="difficulty">
              difficulty:
            </label>
            <input
              className="form-input"
              placeholder="1 to 5"
              type="number"
              id="difficulty"
              name="difficulty"
              value={formData.difficulty || ""}
              onChange={handleInputChange}
            />
            {errors.difficulty && (
              <p className="form-error">{errors.difficulty}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="duration">
              duration:
            </label>
            <input
              className="form-input"
              placeholder="minutes"
              type="number"
              id="duration"
              name="duration"
              value={formData.duration || ""}
              onChange={handleInputChange}
            />
            {errors.duration && <p className="form-error">{errors.duration}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="season">
              season:
            </label>
            <select
              className="form-select"
              id="season"
              name="season"
              value={formData.season || ""}
              onChange={handleInputChange}
            >
              <option value="">select season</option>
              <option value="summer">summer</option>
              <option value="autumn">autumn</option>
              <option value="winter">winter</option>
              <option value="spring">spring</option>
            </select>
            {errors.season && <p className="form-error">{errors.season}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="countries">
              Countries:
            </label>
            <input
              className="form-input"
              type="text"
              id="countrySearch"
              placeholder="Search country"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="form-select"
              id="countries"
              name="countries"
              multiple
              onChange={handleCountrySelect}
              value={formData.countries} // Modificado para utilizar formData.countries
            >
              {filteredCountries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.countries && (
              <p className="form-error">{errors.countries}</p>
            )}
            <div className="selected-countries">
              <h3>Selected countries:</h3>
              {formData.countries.map((country) => (
                <div key={country} className="selected-country">
                  <span>{country}</span>
                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => handleCountryRemove(country)}
                  ></button>
                </div>
              ))}
            </div>
          </div>
          <button className="submit-button" type="submit">
            Create Activity
          </button>
          <button className="back-button" onClick={handleGoBack}>
            return
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
