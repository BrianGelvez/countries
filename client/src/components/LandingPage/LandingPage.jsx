import { Link } from "react-router-dom";
import "./Landingpage.modules.css";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="content">
        <h2 className="nombre">Welcome to the</h2>
        <h1 className="title">countries app</h1>
      </div>
      <div className="content">
        <Link to="/home">
          <button className="btn-third">View Countries</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
