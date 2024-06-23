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
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Popup from "../Popup/Popup";
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
import { register, authorize, checkToken } from "../../utils/auth";
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
  const [currentUser, setCurrentUser] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

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

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
    setIsPasswordError(false);
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

  const handleRegister = (data) => {
    const userEmail = data.email;
    const userPassword = data.password;
    register(data.email, data.password, data.name, data.avatar)
      .then(() => {
        const userData = { email: userEmail, password: userPassword };
        handleLogin(userData);
        handleCloseModal();
        setPopupMessage("Registration successful! Logging you in...");
        setPopupType("success");
      })
      .catch((error) => {
        console.error("Error creating a new user:", error);
        setPopupMessage("Registration failed. Please try again.");
        setPopupType("error");
      });
  };

  const handleLogin = (data) => {
    authorize(data.email, data.password)
      .then((res) => {
        checkToken(res).then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          handleCloseModal();
          setPopupMessage("Login successful!");
          setPopupType("success");
        });
      })
      .catch((error) => {
        console.error("Login In Error:", error);
        setIsPasswordError(true);
        setPopupMessage("Login failed. Check your credentials.");
        setPopupType("error");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCustomTeams([]);
    setPopupMessage("Logged out successfully.");
    setPopupType("success");
  };

  const handleEditUserProfile = (data) => {
    updateUserProfile(data)
      .then((userData) => {
        setCurrentUser(userData);
        setPopupMessage("Profile updated successfully.");
        setPopupType("success");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setPopupMessage("Failed to update profile.");
        setPopupType("error");
      });
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
        setPopupMessage("Team added successfully.");
        setPopupType("success");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        setPopupMessage("Failed to add team.");
        setPopupType("error");
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
        setPopupMessage("Team was deleted successfully.");
        setPopupType("success");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        setPopupMessage("Failed to delete team.");
        setPopupType("error");
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
        setPopupMessage("Failed to get characters.");
        setPopupType("error");
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
    if (isLoggedIn) {
      getTeams()
        .then((teams) => {
          setCustomTeams(teams);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(true);
          console.error(err);
          setPopupMessage("Failed to get teams.");
          setPopupType("error");
        });
    }
  }, [isLoggedIn]);

  // Check Current User

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            isLoggedIn={isLoggedIn}
            onRegisterModal={handleRegisterModal}
            onLoginModal={handleLoginModal}
          />
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
                <Route path="/requirements/:baseId">
                  <Requirements
                    allCharacters={allCharactersData}
                    isCustomTeam={false}
                  />
                </Route>
                <ProtectedRoute
                  path="/profile"
                  isLoggedIn={isLoggedIn}
                  component={Profile}
                  onCustomTeamModal={handleCustomTeamModal}
                  customTeams={customTeams}
                  onEditProfileModal={handleEditProfileModal}
                  onDeleteTeam={handleDeleteTeamModal}
                  onLogout={handleLogout}
                  isAutherized={isLoggedIn}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/customTeam/:_id"
                  isLoggedIn={isLoggedIn}
                  component={Requirements}
                  allCharacters={allCharactersData}
                  isCustomTeam={true}
                  isAutherized={isLoggedIn}
                ></ProtectedRoute>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
              <Footer />
            </>
          )}
          {activeModal === "login" && (
            <LoginModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "login"}
              onLogin={handleLogin}
              onSwitch={handleRegisterModal}
              isPasswordError={isPasswordError}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "register"}
              onRegister={handleRegister}
              onSwitch={handleLoginModal}
            />
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
          <Popup message={popupMessage} type={popupType} />
        </CurrentUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
