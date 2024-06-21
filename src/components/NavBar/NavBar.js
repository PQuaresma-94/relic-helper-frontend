import { useState, useEffect, useContext } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const NavBar = ({ isLoggedIn, onRegisterModal, onLoginModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="nav-bar">
      <button className="nav-bar__toggle" onClick={toggleDropdown}></button>
      <div className={`nav-bar__content ${isDropdownOpen ? "open" : ""}`}>
        <Link
          to="/relicTable"
          className="nav-bar__link"
          onClick={closeDropdown}
        >
          <div className="nav-bar__tab">Relic Table</div>
        </Link>
        <Link to="/about" className="nav-bar__link" onClick={closeDropdown}>
          <div className="nav-bar__tab">About</div>
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              to="/profile"
              className="nav-bar__link"
              onClick={closeDropdown}
            >
              <div className="nav-bar__profile">
                <div className="nav-bar__profile-name">{currentUser.name}</div>
                <img
                  className="nav-bar__profile-avatar"
                  src={currentUser.avatar}
                  alt="Avatar"
                />
              </div>
            </Link>
          </>
        ) : (
          <div className="nav-bar__buttons">
            <button
              className="nav-bar__button"
              type="button"
              onClick={onRegisterModal}
            >
              Sign Up
            </button>
            <button
              className="nav-bar__button"
              type="button"
              onClick={onLoginModal}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
