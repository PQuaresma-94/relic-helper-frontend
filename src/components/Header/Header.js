import "./Header.css";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import RelicMaterial1 from "../../images/aeromagnifier.png";

const Header = ({ isLoggedIn, onRegisterModal, onLoginModal }) => {
  //logo idea create a random funtion to select the random image from the relic mats images
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" className="header__link">
          <div className="logo">
            <img className="logo__image" alt="Logo" src={RelicMaterial1} />
            <div className="logo__text">Relic Helper</div>
          </div>
        </Link>
      </div>
      <NavBar
        isLoggedIn={isLoggedIn}
        onRegisterModal={onRegisterModal}
        onLoginModal={onLoginModal}
      />
    </header>
  );
};

export default Header;
