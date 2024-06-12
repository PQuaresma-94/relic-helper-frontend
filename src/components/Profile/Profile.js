import SideBar from "../SideBar/SideBar";
import CustomTeam from "../CustomTeam/CustomTeam";
import "./Profile.css";

const Profile = ({
  currentUser,
  customTeams,
  onCustomTeamModal,
  onDeleteTeam,
}) => {
  return (
    <section className="profile">
      <SideBar currentUser={currentUser} />
      <div className="custom-teams">
        <div className="custom-teams__header">
          <div className="custom-teams__title">Custom Teams</div>
          <button
            className="custom-teams__add-button"
            onClick={onCustomTeamModal}
          >
            Add New Team
          </button>
        </div>
        <div className="custom-teams__teams">
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
