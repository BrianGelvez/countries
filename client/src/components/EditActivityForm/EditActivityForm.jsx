import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateActivity, resetSelectedActivity } from "../../Redux/actions";
import "./EditActivityForm.modules.css";

const EditActivityForm = () => {
  const selectedActivity = useSelector((state) => state.selectedActivity);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: selectedActivity?.name || "",
    difficulty: selectedActivity?.difficulty || "",
    duration: selectedActivity?.duration || "",
    season: selectedActivity?.season || "",
  });
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGoBack = () => {
    dispatch(resetSelectedActivity());
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones y lógica de actualización de la actividad
    if (selectedActivity) {
      const updatedActivity = {
        ...selectedActivity,
        ...formData,
      };
      dispatch(updateActivity(id, updatedActivity))
        .then(() => {
          setNotification({
            type: "success",
            message: "La actividad se actualizó exitosamente.",
          });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        })
        .catch((error) => {
          setNotification({
            type: "error",
            message: "Hubo un problema al actualizar la actividad.",
          });
          console.error(error);
        });
    }
  };

  if (!selectedActivity) {
    return null;
  }

  return (
    <>
      <div className="fondo">
        <div className="conteiner">
          <h1 className="form-title">Edit Activity</h1>
          {notification && (
            <div
              className={`notification ${
                notification.type === "success" ? "success" : "error"
              }`}
            >
              {notification.message}
            </div>
          )}
          <form className="form" onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="name">
              Name:
            </label>
            <input
              className="form-input"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <label className="form-label" htmlFor="difficulty">
              Difficulty:
            </label>
            <input
              className="form-input"
              type="text"
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
            />

            <label className="form-label" htmlFor="duration">
              Duration:
            </label>
            <input
              className="form-input"
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
            />

            <label className="form-label" htmlFor="season">
              Season:
            </label>
            <select
              className="form-select"
              id="season"
              name="season"
              value={formData.season}
              onChange={handleInputChange}
            >
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
            </select>

            <button className="submit-button" type="submit">
              Save Changes
            </button>
            <button
              type="button"
              className="back-button"
              onClick={handleGoBack}
            >
              Return
            </button>
          </form>
        </div>
      </div>
      {/* Aquí coloca el código que muestra las cards con los países */}
    </>
  );
};

export default EditActivityForm;
