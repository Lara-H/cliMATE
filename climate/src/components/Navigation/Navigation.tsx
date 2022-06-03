import React, { FC } from "react";
import styles from "./Navigation.module.scss";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => (
  <div className={styles.Navigation} data-testid="Navigation">
    <nav className="navbar navbar-expand-lg bg-light fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          cliMATE
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
          <ul className="navbar-nav">
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
