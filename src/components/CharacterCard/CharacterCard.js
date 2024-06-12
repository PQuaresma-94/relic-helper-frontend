import "./CharacterCard.css";
import { Link } from "react-router-dom";

const CharacterCard = ({ char }) => {
  return (
    <div className="character">
      <Link to={`/requirements/${char.baseId}`} className="character__link">
        <img
          className="character__image"
          src={char.image}
          alt={char.unitName}
        />
      </Link>
      <div className="character__name">{char.unitName}</div>
    </div>
  );
};

export default CharacterCard;
