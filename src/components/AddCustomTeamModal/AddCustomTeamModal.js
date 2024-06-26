import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Select from "react-select";

const AddCustomTeamModal = ({
  handleCloseModal,
  onAddTeam,
  isOpen,
  allCharacters,
}) => {
  const [teamName, setTeamName] = useState("");
  const [teamImage, setTeamImage] = useState("");
  const [characters, setCharacters] = useState([
    { character: "", relic: "" },
    { character: "", relic: "" },
    { character: "", relic: "" },
    { character: "", relic: "" },
    { character: "", relic: "" },
  ]);

  const [isNameValid, setIsNameValid] = useState(false);
  const [isImageUrlValid, setIsImageUrlValid] = useState(false);
  const [isRequiredUnitsValid, setIsRequiredUnitsValid] = useState(false);

  const [characterOptions, setCharacterOptions] = useState([]);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleTeamNameChange = (e) => {
    const isNameValid = e.target.validity.valid;
    setIsNameValid(isNameValid);
    setTeamName(e.target.value);
    setIsButtonEnabled(isNameValid && isImageUrlValid && isRequiredUnitsValid);
  };

  const handleTeamImageChange = (e) => {
    const isImageUrlValid = e.target.validity.valid;
    setIsImageUrlValid(isImageUrlValid);
    setTeamImage(e.target.value);
    setIsButtonEnabled(isNameValid && isImageUrlValid && isRequiredUnitsValid);
  };

  // To be added after
  const handleCharacterChange = (index, selectedOption) => {
    const newCharacters = [...characters];
    newCharacters[index].character = selectedOption;
    setCharacters(newCharacters);
    handleRequiredUnitChange(newCharacters);
  };

  const handleRelicChange = (index, selectedOption) => {
    const newCharacters = [...characters];
    newCharacters[index].relic = selectedOption;
    setCharacters(newCharacters);
    handleRequiredUnitChange(newCharacters);
  };

  //validate if at least one field is fill

  const handleRequiredUnitChange = (newCharacters) => {
    const isRequiredUnitsValid = newCharacters.every((item, index) => {
      return (item.character && item.relic) || (!item.character && !item.relic);
    });
    setIsRequiredUnitsValid(isRequiredUnitsValid);
    setIsButtonEnabled(
      isRequiredUnitsValid &&
        isNameValid &&
        isImageUrlValid &&
        newCharacters.some((item) => item.character && item.relic)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTeam({
      teamName,
      teamImage,
      requiredUnits: characters
        .filter((item) => item.character && item.relic)
        .map((item) => ({
          baseId: item.character.value,
          gearLevel: 13,
          relicTier: item.relic.value,
        })),
    });
    handleCloseModal();
  };

  useEffect(() => {
    if (isOpen) {
      setTeamName("");
      setTeamImage("");
      setCharacters([
        { character: "", relic: "" },
        { character: "", relic: "" },
        { character: "", relic: "" },
        { character: "", relic: "" },
        { character: "", relic: "" },
      ]);
      setIsButtonEnabled(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const options = allCharacters.map((character) => ({
      value: character.base_id,
      label: character.name,
    }));
    setCharacterOptions(options);
  }, [allCharacters]);

  const relicOptions = Array.from({ length: 9 }, (_, index) => ({
    value: `${index + 1}`,
    label: `R${index + 1}`,
  }));

  return (
    <ModalWithForm
      title="New Custom Team"
      submitButtonText="Add Team"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isEnable={isButtonEnabled}
    >
      <div className="form">
        <div>
          <label className="form__label">
            <p className="form__title">Team Name</p>
            <input
              type="text"
              className="form__input"
              name="teamName"
              placeholder="Team Name"
              minLength="1"
              maxLength="30"
              required
              value={teamName}
              onChange={handleTeamNameChange}
            />
          </label>
        </div>
        <div>
          <label className="form__label">
            <p className="form__title">Team Image</p>
            <input
              type="url"
              className="form__input"
              name="teamImage"
              placeholder="Team Image URL"
              required
              value={teamImage}
              onChange={handleTeamImageChange}
              pattern="https?://.*"
              title="Please enter a valid URL starting with http:// or https://"
            />
          </label>
        </div>
        {characters.map((item, index) => (
          <div key={index} className="form__field">
            <label className="form__label">
              <p className="form__title">Character {index + 1}</p>
              <Select
                className="form__select  form__select-characters"
                value={characterOptions.find(
                  (option) => option.value === item.character
                )}
                onChange={(selectedOption) =>
                  handleCharacterChange(index, selectedOption)
                }
                options={characterOptions}
                placeholder="Search for character"
              />
            </label>
            <label className="form__label">
              <p className="form__title">Relic Level</p>
              <Select
                className="form__select"
                value={relicOptions.find(
                  (option) => option.value === item.relic
                )}
                onChange={(selectedOption) =>
                  handleRelicChange(index, selectedOption)
                }
                options={relicOptions}
                placeholder=""
              />
            </label>
          </div>
        ))}
      </div>
    </ModalWithForm>
  );
};

export default AddCustomTeamModal;
