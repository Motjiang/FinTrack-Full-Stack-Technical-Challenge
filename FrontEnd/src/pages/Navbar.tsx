import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className="nav__header">
        <div className="nav__logo">
          <a href="#">
            Fin<span>Track</span>
          </a>
        </div>
        <div className="nav__menu__btn" id="menu-btn" onClick={toggleMenu}>
          <i className="ri-menu-line"></i>
        </div>
      </div>
      <ul className={`nav__links ${menuOpen ? "open" : ""}`} id="nav-links">
        <li>
          <a href="">How it works</a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/brilliant-nhlamolo-motjiang-77b536270/"
            target="_blank"
          >
            Contact Me
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
