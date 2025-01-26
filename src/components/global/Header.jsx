import styles from "../../styles/global/Header.module.css";
import Logo from "../../assets/images/smallLogo.png";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className={styles.header}>
      <Link to="/">
        <img
          src={Logo}
          alt="Logo"
          className={styles.logo}
        />
      </Link>
    </div>
  );
}

export default Header;