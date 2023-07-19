import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedActivity } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import "./UpdateActivityButton.modules.css";

const UpdateActivityButton = () => {
  const activities = useSelector((state) => state.activities);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedActivityId, setSelectedActivityId] = useState("");

  const handleActivityChange = (e) => {
    setSelectedActivityId(e.target.value);
  };

  const handleEditClick = () => {
    if (selectedActivityId) {
      const selectedActivity = activities.find(
        (activity) => activity.id === parseInt(selectedActivityId)
      );
      if (selectedActivity) {
        dispatch(setSelectedActivity(selectedActivity));
        navigate(`/edit-activity/${selectedActivity.id}`);
      }
    }
  };

  return (
    <div className="button-container">
      <button className="custom-button" onClick={handleEditClick}>
        Update Activity
      </button>
      <select
        className="select"
        id="activitySelect"
        onChange={handleActivityChange}
      >
        <option value="">Select activity</option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UpdateActivityButton;
