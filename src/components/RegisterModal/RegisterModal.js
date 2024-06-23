import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ handleCloseModal, onRegister, isOpen, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isAvatarValid, setIsAvatarValid] = useState(false);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleEmailChange = (e) => {
    const isEmailValid = e.target.validity.valid;
    setIsEmailValid(isEmailValid);
    setEmail(e.target.value);
    setIsButtonEnabled(
      isEmailValid && isPasswordValid && isNameValid && isAvatarValid
    );
  };

  const handlePasswordChange = (e) => {
    const isPasswordValid = e.target.validity.valid;
    setIsPasswordValid(isPasswordValid);
    setPassword(e.target.value);
    setIsButtonEnabled(
      isEmailValid && isPasswordValid && isNameValid && isAvatarValid
    );
  };

  const handleNameChange = (e) => {
    const isNameValid = e.target.validity.valid;
    setIsNameValid(isNameValid);
    setName(e.target.value);
    setIsButtonEnabled(
      isEmailValid && isPasswordValid && isNameValid && isAvatarValid
    );
  };

  const handleAvatarChange = (e) => {
    const isAvatarValid = e.target.validity.valid;
    setIsAvatarValid(isAvatarValid);
    setAvatar(e.target.value);
    setIsButtonEnabled(
      isEmailValid && isPasswordValid && isNameValid && isAvatarValid
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password, name, avatar });
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
      setIsEmailValid(false);
      setIsPasswordValid(false);
      setIsNameValid(false);
      setIsAvatarValid(false);
      setIsButtonEnabled(false);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
      submitButtonText="Sign Up"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isEnable={isButtonEnabled}
      switchButtonText="or Log In"
      onClick={onSwitch}
    >
      <div className="form">
        <div>
          <label className="form__label">
            <p className="form__title">Email*</p>
            <input
              type="email"
              className="form__input"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </label>
        </div>
        <div>
          <label className="form__label">
            <p className="form__title">Password*</p>
            <input
              type="password"
              className="form__input"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <div>
          <label className="form__label">
            <p className="form__title">Name*</p>
            <input
              type="text"
              className="form__input"
              name="name"
              placeholder="Name"
              required
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

export default RegisterModal;
