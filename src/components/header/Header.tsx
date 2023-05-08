import styles from "./Header.module.css";
import { ReactComponent as AppLogo } from "assets/images/valerify.svg";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <a href="/">
        <AppLogo />
      </a>
    </header>
  );
};

export default Header;
