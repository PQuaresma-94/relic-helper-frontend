import SideBar from "../SideBar/SideBar";
import CustomTeam from "../CustomTeam/CustomTeam";
import "./Profile.css";

const Profile = ({
  customTeams,
  onCustomTeamModal,
  onDeleteTeam,
  onEditProfileModal,
}) => {
  return (
    <section className="profile">
      <SideBar onEditProfileModal={onEditProfileModal} />
      <div className="profile__custom-teams">
        <div className="profile__custom-teams-header">
          <h2 className="profile__custom-teams-title">Custom Teams</h2>
          <button
            className="profile__custom-teams-add-button"
            onClick={onCustomTeamModal}
          >
            Add New Team
          </button>
        </div>
        <div className="profile__custom-teams-list">
          {customTeams.map((team) => (
            <CustomTeam
              key={team._id}
              teamData={team}
              onDeleteTeam={onDeleteTeam}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
