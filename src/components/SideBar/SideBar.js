import { React, useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const SideBar = ({ onEditProfileModal, onLogout }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="profile__sidebar">
      <div className="profile__info">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Avatar"
        />
        <p className="profile__name">{currentUser.name}</p>
      </div>
      <div className="profile__buttons">
        <button className="profile__button" onClick={onEditProfileModal}>
          Change profile data
        </button>
        <button className="profile__button" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
