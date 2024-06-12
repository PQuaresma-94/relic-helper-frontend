import "./RequirementCard.css";

const RequirementCard = ({ char }) => {
  return (
    <div className="requirement-card">
      <img
        className="requirement-card__image"
        src={char.image}
        alt={char.name}
      />
      <div className="requirement-card__info">
        <div className="requirement-card__name">{char.name}</div>
        <div className="requirement-card__gear">
          Gear Level: {char.gearLevel}
        </div>
        <div className="requirement-card__relic">
          Relic Level: {char.relicTier}
        </div>
      </div>
    </div>
  );
};

export default RequirementCard;
