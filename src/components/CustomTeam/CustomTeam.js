import "./CustomTeam.css";
import { Link } from "react-router-dom";

const CustomTeam = ({ teamData, onDeleteTeam }) => {
  return (
    <div className="custom-team__team">
      <Link to={`/customTeam/${teamData._id}`} className="character__link">
        <img className="team__image" src={teamData.image} alt={teamData.name} />
        <div className="team__name">{teamData.name}</div>
      </Link>
      <button
        className="team__delete-button"
        onClick={() => onDeleteTeam(teamData)}
      ></button>
    </div>
  );
};

export default CustomTeam;
