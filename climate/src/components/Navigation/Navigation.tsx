import React, { FC } from "react";
import styles from "./Navigation.module.scss";
import logo from "./logo.png";
import NavigationLink from "../NavigationLink/NavigationLink";

interface NavigationProps {
  handleClick: (modeName: string) => void;
  currentMode: string;
}

const Navigation: FC<NavigationProps> = ({ handleClick, currentMode }) => {

  return (
    <div className={styles.navigation} data-testid="Navigation">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="" width="auto" height="35"></img>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className={`navbar-nav ${styles["cm-navbar-nav"]}`}>
              <NavigationLink title="Personenreise" currentMode={currentMode} modeName="travel" handleClick={handleClick}></NavigationLink>
              <NavigationLink title="Frachtsendung" currentMode={currentMode} modeName="freight" handleClick={handleClick}></NavigationLink>
              <NavigationLink title="Haushalt" currentMode={currentMode} modeName="household" handleClick={handleClick}></NavigationLink>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
