import React, { FC } from "react";
import styles from "./Navigation.module.scss";
import logo from "./logo.png";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => (
  <div className={styles.navigation} data-testid="Navigation">
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container">
      <a className="navbar-brand" href="#">
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
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className={`navbar-nav ${styles["cm-navbar-nav"]}`}>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Personenreise
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Frachtsendung
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Haushalt</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default Navigation;
