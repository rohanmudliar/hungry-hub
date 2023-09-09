import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Wrapper from "../common/Wrapper";
import Logo from "../../assets/images/logo.png";
import SignIn from "jsx:../../assets/icons/signin.svg";
import Cart from "jsx:../../assets/icons/bag.svg";

import "./Header.scss";

const Header = () => {
  const [showLogo, setShowLogo] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setShowLogo(location.pathname !== "/");
  }, [location.pathname]);

  return (
    <Wrapper>
      <header>
        <Link to="/" className="logo-container">
          <img src={Logo} alt="Hungry Hub Logo" />
          {showLogo && <p className="logo-title">Hungry Hub</p>}
        </Link>

        <nav>
          <ul>
            <li className="sign-in">
              <SignIn />
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li className="cart">
              <Cart />
              <span className="totalItems">0</span>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </header>
    </Wrapper>
  );
};

export default Header;
