import { React } from "react";
import "./SideBar.css";

const SideBar = ({ currentUser, onEditProfileModal, onLogout }) => {
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
