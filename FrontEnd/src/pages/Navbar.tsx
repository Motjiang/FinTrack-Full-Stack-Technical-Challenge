import { useState } from "react";
import { Link } from "react-router-dom"; // Use Link for SPA navigation
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => setMenuOpen(false); // Close menu when a link is clicked

  return (
    <nav>
      <div className="nav__header">
        <div className="nav__logo">
          <Link to="/" onClick={closeMenu}>
            Fin<span>Track</span>
          </Link>
        </div>
        <div className="nav__menu__btn" onClick={toggleMenu}>
          <i className="ri-menu-line"></i>
        </div>
      </div>
      <ul className={`nav__links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Dashboard</Link>
        </li>
        <li>
          <Link to="/how-it-works" onClick={closeMenu}>How It Works</Link>
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
