import "./Requirements.css";
import RequirementCard from "../RequirementCard/RequirementCard";
import RequirementsTable from "../RequirementTable/RequirementTable";
import NotFound from "../NotFound/NotFound";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequiredUnits } from "../../utils/swgohApi";
import { getTeam } from "../../utils/api";

const Requirements = ({ allCharacters, isCustomTeam }) => {
  const { baseId, _id } = useParams();
  const [requirements, setRequirements] = useState([]);
  const [requirementsData, setRequirementsData] = useState([]);
  const [legendaryCharacter, setLegendaryCharacter] = useState("");
  const [customTeam, setCustomTeam] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (isCustomTeam) {
      getTeam(_id)
        .then((teamData) => {
          if (!teamData) {
            setIsNotFound(true);
            return;
          }
          setRequirements(teamData.requiredUnits);
          setCustomTeam(teamData.name);
        })
        .catch((err) => {
          setIsNotFound(true);
          console.error(err);
        });
    } else {
      getRequiredUnits(baseId)
        .then((charactersData) => {
          if (!charactersData) {
            setIsNotFound(true);
            return;
          }
          setRequirements(charactersData.requiredUnits);
          setLegendaryCharacter(charactersData.unitName);
        })
        .catch((err) => {
          setIsNotFound(true);
          console.error(err);
        });
    }
  }, [baseId, _id, isCustomTeam]);

  useEffect(() => {
    const updatedRequirements = requirements.map((requirement) => {
      const character = allCharacters.find(
        (char) => char.base_id === requirement.baseId
      );
      if (character) {
        return {
          ...requirement,
          name: character.name,
          image: character.image,
        };
      } else {
        return requirement;
      }
    });
    setRequirementsData(updatedRequirements);
  }, [requirements, allCharacters]);

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <div className="requirements">
      <h2 className="requirements__title">
        {isCustomTeam ? customTeam : legendaryCharacter}'s Requirements
      </h2>
      <div className="requirements__characters">
        {requirementsData.map((char) => (
          <RequirementCard key={char.baseId} char={char} />
        ))}
      </div>
      <div className="requirements__table">
        <RequirementsTable requirements={requirements} />
      </div>
    </div>
  );
};

export default Requirements;
