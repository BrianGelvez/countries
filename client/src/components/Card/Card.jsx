import { Link } from "react-router-dom";
import "./Card.modules.css";

const Card = ({ id, flagImage, name, continent }) => {

  return (
    <div className="card2">
      <div className="card">
        <img src={flagImage} alt={name} />
        <Link to={`/home/id/${id}`}>
          <h2>{name}</h2>
        </Link>
        <p>Continent: {continent}</p>
      </div>
    </div>
  );
};

export default Card;
