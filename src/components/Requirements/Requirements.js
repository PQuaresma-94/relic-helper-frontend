import "./Requirements.css";
import RequirementCard from "../RequirementCard/RequirementCard";
import RequirementsTable from "../RequirementTable/RequirementTable";
import CharacterRelicTable from "../CharacterRelicTable/CharacterRelicTable";
import NotFound from "../NotFound/NotFound";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRequiredUnits } from "../../utils/swgohApi";
import { getTeam } from "../../utils/api";

const Requirements = ({ allCharacters, isCustomTeam }) => {
  const { baseId, _id } = useParams();

  // raw API list of { baseId, relicTier, ... }
  const [requirements, setRequirements] = useState([]);
  // enriched with name/image—and we’ll also seed relic=0 here
  const [requirementsData, setRequirementsData] = useState([]);
  // “live” table data including the user-picked relics
  const [tableData, setTableData] = useState([]);

  const [legendaryCharacter, setLegendaryCharacter] = useState("");
  const [customTeam, setCustomTeam] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);

  // 1) fetch from API
  useEffect(() => {
    if (isCustomTeam) {
      getTeam(_id)
        .then((teamData) => {
          if (!teamData) return setIsNotFound(true);
          setRequirements(teamData.requiredUnits);
          setCustomTeam(teamData.name);
        })
        .catch(() => setIsNotFound(true));
    } else {
      getRequiredUnits(baseId)
        .then((charactersData) => {
          if (!charactersData) return setIsNotFound(true);
          setRequirements(charactersData.requiredUnits);
          setLegendaryCharacter(charactersData.unitName);
        })
        .catch(() => setIsNotFound(true));
    }
  }, [baseId, _id, isCustomTeam]);

  // 2) enrich with name/image and seed relic=0
  useEffect(() => {
    const enriched = requirements.map((req) => {
      const char = allCharacters.find((c) => c.base_id === req.baseId);
      return {
        ...req,
        name: char?.name || req.baseId,
        image: char?.image,
        relic: 0,
      };
    });
    setRequirementsData(enriched);
    setTableData(enriched);
  }, [requirements, allCharacters]);

  // 3) dropdown handler
  const handleRelicChange = (idx, newRelic) => {
    setTableData((prev) =>
      prev.map((row, i) =>
        i === idx ? { ...row, relic: Number(newRelic) } : row
      )
    );
  };

  if (isNotFound) return <NotFound />;

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
        {/* input table */}
        <CharacterRelicTable
          requirements={tableData}
          onRelicChange={handleRelicChange}
        />

        {/* output materials table */}
        <RequirementsTable
          requirements={requirementsData}
          currentRelics={tableData.map((r) => r.relic)}
        />
      </div>
    </div>
  );
};

export default Requirements;
