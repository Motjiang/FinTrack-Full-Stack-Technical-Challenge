import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="nav__header">
        <div className="nav__logo">
          <a href="#">
            Fin<span>Track</span>
          </a>
        </div>
        <div className="nav__menu__btn" id="menu-btn">
          <i className="ri-menu-line"></i>
        </div>
      </div>
      <ul className="nav__links" id="nav-links">
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
