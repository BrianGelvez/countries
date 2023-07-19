import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteActivity } from '../../Redux/actions';
import './ActivitySelector.modules.css';

const ActivitySelector = () => {
  const activities = useSelector((state) => state.activities);
  const dispatch = useDispatch();
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [deletionMessage, setDeletionMessage] = useState('');

  const handleActivityChange = (e) => {
    setSelectedActivityId(e.target.value);
  };

  const handleDeleteClick = () => {
    if (selectedActivityId) {
      dispatch(deleteActivity(selectedActivityId))
        .then(() => {
          setDeletionMessage('Activity deleted successfully.');
          setTimeout(() => {
            setDeletionMessage('');
          }, 3000); // Tiempo de duración del mensaje: 3 segundos (3000 milisegundos)
        })
        .catch((error) => {
          setDeletionMessage('Error deleting activity.');
          console.error(error);
        });
    }
  };

  return (
    <div className="filtros">
      {deletionMessage && <div className="deletion-message">{deletionMessage}</div>}
      <button className="deleteactivity" onClick={handleDeleteClick}>
        Delete Activity
      </button>
      <select className="delete" value={selectedActivityId} onChange={handleActivityChange}>
        <option value="">select activity</option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ActivitySelector;
