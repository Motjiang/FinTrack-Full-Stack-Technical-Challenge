import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      Copyright © {currentYear} brilliant-nhlamolo-motjiang. All Rights Reserved.
    </footer>
  );
}

export default Footer;
