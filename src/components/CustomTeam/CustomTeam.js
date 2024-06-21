import "./CustomTeam.css";
import { Link } from "react-router-dom";

const CustomTeam = ({ teamData, onDeleteTeam }) => {
  return (
    <div className="custom-team">
      <Link to={`/customTeam/${teamData._id}`} className="custom-team__link">
        <img
          className="custom-team__image"
          src={teamData.image}
          alt={teamData.name}
        />
        <div className="custom-team__name">{teamData.name}</div>
      </Link>
      <button
        className="custom-team__delete-button"
        onClick={() => onDeleteTeam(teamData)}
      ></button>
    </div>
  );
};

export default CustomTeam;
