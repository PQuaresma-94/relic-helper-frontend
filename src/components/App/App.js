import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import RelicTable from "../RelicTable/RelicTable";
import About from "../About/About";
import Profile from "../Profile/Profile";
import Requirements from "../Requirements/Requirements";
import Footer from "../Footer/Footer";
import AddCustomTeamModal from "../AddCustomTeamModal/AddCustomTeamModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import { getAllCharacters, getLegendaryCharacters } from "../../utils/swgohApi";
import {
  getTeams,
  postTeam,
  deleteTeam,
  updateUserProfile,
} from "../../utils/api";
import { testUser } from "../../utils/constants";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [charactersData, setCharactersData] = useState([]);
  const [allCharactersData, setAllCharactersData] = useState([]);
  const [customTeams, setCustomTeams] = useState([]);
  const [customTeam, setCustomTeam] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(testUser);

  // Handle Modal Functions

  const handleCustomTeamModal = () => {
    setActiveModal("custom-team");
  };

  const handleDeleteTeamModal = (teamData) => {
    setActiveModal("delete");
    setCustomTeam(teamData);
  };

  const handleEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  // Handle Overlay Functions

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    const handleOverlayClick = (event) => {
      if (event.target.classList.contains("modal")) {
        handleCloseModal();
      }
    };

    if (activeModal) {
      document.addEventListener("keydown", handleEscapeKeyPress);
      document.addEventListener("mousedown", handleOverlayClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [activeModal, handleCloseModal]);

  // Handle User Functions

  const handleEditUserProfile = (data) => {
    setCurrentUser(data);
    // updateUserProfile(data).then((userData) => {
    //   setCurrentUser(userData);
    // });
  };

  // Handle Teams Functions

  const handleAddTeamSubmit = (teamData) => {
    postTeam({
      name: teamData.teamName,
      image: teamData.teamImage,
      requiredUnits: teamData.requiredUnits,
    })
      .then((addedTeam) => {
        const updatedTeams = [...customTeams, addedTeam];
        setCustomTeams(updatedTeams);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleDeleteTeam = (teamData) => {
    deleteTeam(teamData._id)
      .then(() => {
        const filteredTeams = customTeams.filter(
          (customTeam) => customTeam._id !== teamData._id
        );
        setCustomTeams(filteredTeams);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  // Fetch Characters from third-party Api via backend
  useEffect(() => {
    getLegendaryCharacters()
      .then((characters) => {
        setCharactersData(characters.units);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getAllCharacters()
      .then((characters) => {
        setAllCharactersData(characters);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.error(err);
      });
  }, []);

  // Fetch Custom Teams
  useEffect(() => {
    getTeams()
      .then((teams) => {
        setCustomTeams(teams);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        console.error(err);
      });
  }, []);

  // Fetch Current User

  return (
    <BrowserRouter>
      <div className="app">
        <CurrentUserContext.Provider value={currentUser}>
          <Header isLoggedIn={true} />
          {loading ? (
            <Preloader />
          ) : (
            <>
              <Switch>
                <Route exact path="/">
                  <Main characters={charactersData} />
                </Route>
                <Route path="/relicTable">
                  <RelicTable />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/profile">
                  <Profile
                    customTeams={customTeams}
                    onCustomTeamModal={handleCustomTeamModal}
                    onDeleteTeam={handleDeleteTeamModal}
                    onEditProfileModal={handleEditProfileModal}
                  />
                </Route>
                <Route path="/requirements/:baseId">
                  <Requirements
                    allCharacters={allCharactersData}
                    isCustomTeam={false}
                  />
                </Route>
                <Route path="/customTeam/:_id">
                  <Requirements
                    allCharacters={allCharactersData}
                    isCustomTeam={true}
                  />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
              <Footer />
            </>
          )}
          {activeModal === "custom-team" && (
            <AddCustomTeamModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "custom-team"}
              onAddTeam={handleAddTeamSubmit}
              allCharacters={allCharactersData}
            />
          )}
          {activeModal === "delete" && (
            <DeleteConfirmationModal
              name={"delete"}
              onClose={handleCloseModal}
              onConfirmation={() => handleDeleteTeam(customTeam)}
            />
          )}
          {activeModal === "edit-profile" && (
            <EditProfileModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "edit-profile"}
              onEditUser={handleEditUserProfile}
            />
          )}
        </CurrentUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
