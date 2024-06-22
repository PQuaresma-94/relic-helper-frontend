import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ handleCloseModal, onEditUser, isOpen }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const [isNameValid, setIsNameValid] = useState(false);
  const [isAvatarValid, setIsAvatarValid] = useState(false);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleNameChange = (e) => {
    const isNameValid = e.target.validity.valid;
    setIsNameValid(isNameValid);
    setName(e.target.value);
    setIsButtonEnabled(isNameValid && isAvatarValid);
  };

  const handleAvatarChange = (e) => {
    const isAvatarValid = e.target.validity.valid;
    setIsAvatarValid(isAvatarValid);
    setAvatar(e.target.value);
    setIsButtonEnabled(isNameValid && isAvatarValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditUser({ name, avatar });
    handleCloseModal();
  };

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
      setIsNameValid(true);
      setIsAvatarValid(true);
      setIsButtonEnabled(true);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Change profile data"
      submitButtonText="Save changes"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isEnable={isButtonEnabled}
    >
      <div className="form">
        <div>
          <label className="form__label">
            <p className="form__title">Name*</p>
            <input
              type="text"
              className="form__input"
              name="name"
              placeholder="Name"
              required
              minLength={2}
              maxLength={30}
              value={name}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div>
          <label className="form__label">
            <p className="form__title">Avatar URL*</p>
            <input
              type="url"
              className="form__input"
              name="avatar"
              placeholder="Avatar URL"
              required
              value={avatar}
              onChange={handleAvatarChange}
            />
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
