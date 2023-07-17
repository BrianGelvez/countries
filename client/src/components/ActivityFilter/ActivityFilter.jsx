import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities, setSelectedActivity } from '../../Redux/actions';
import './ActivityFilter.modules.css'


const ActivityFilter = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const selectedActivity = useSelector((state) => state.selectedActivity);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleActivityChange = (e) => {
    const selectedActivity = e.target.value;
    dispatch(setSelectedActivity(selectedActivity));
  };

  return (
    <div className='activity'>
      <select className='ActivityFilter' defaultValue={selectedActivity} onChange={handleActivityChange}>
        <option value="">All Activities</option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.name}>
            {activity.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ActivityFilter;
