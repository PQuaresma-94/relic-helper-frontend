import "./Requirements.css";
import RequirementCard from "../RequirementCard/RequirementCard";
import { useEffect, useState } from "react";
import RequirementsTable from "../RequirementTable/RequirementTable";
import { useParams } from "react-router-dom";
import { getRequiredUnits } from "../../utils/swgohApi";
import { getTeam } from "../../utils/api";

const Requirements = ({ allCharacters, isCustomTeam }) => {
  const { baseId, _id } = useParams();
  const [requirements, setRequirements] = useState([]);
  const [requirementsData, setRequirementsData] = useState([]);
  const [legendaryCharacter, setLegendaryCharacter] = useState("");
  const [customTeam, setCustomTeam] = useState("");

  useEffect(() => {
    if (isCustomTeam) {
      getTeam(_id)
        .then((teamData) => {
          setRequirements(teamData.requiredUnits);
          setCustomTeam(teamData.name);
        })
        .catch(console.error);
    } else {
      getRequiredUnits(baseId)
        .then((charactersData) => {
          setRequirements(charactersData.requiredUnits);
          setLegendaryCharacter(charactersData.unitName);
        })
        .catch(console.error);
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

  return (
    <div className="requirements">
      <div className="requirements__title">
        {isCustomTeam ? customTeam : legendaryCharacter}'s Requirements
      </div>
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
