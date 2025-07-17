import React from "react";
import Select from "react-select";
import "./CharacterRelicTable.css";

const CharacterRelicTable = ({ requirements, onRelicChange }) => {
  // fixed relic options from 0 to 9
  const relicOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i,
    label: `${i}`,
  }));

  return (
    <table className="requirements__input-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Required Relic</th>
          <th>Your Relic</th>
        </tr>
      </thead>
      <tbody>
        {requirements.map((item, idx) => (
          <tr key={item.baseId}>
            <td>{item.name}</td>
            <td>{item.relicTier}</td>
            <td>
              <Select
                className="form__select"
                options={relicOptions}
                value={relicOptions.find((opt) => opt.value === item.relic)}
                onChange={(opt) => onRelicChange(idx, opt.value)}
                placeholder="0"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CharacterRelicTable;
