import React, { FC } from "react";
import styles from "./Navigation.module.scss";
import logo from "./logo.png";
import NavigationLink from "../NavigationLink/NavigationLink";
import { useTranslation } from "react-i18next";

interface NavigationProps {
  handleClick: (modeName: string) => void;
  currentMode: string;
}

const Navigation: FC<NavigationProps> = ({ handleClick, currentMode }) => {
  const { t, i18n } = useTranslation();

  let isDe = false;
  let isEn = false;
  if (i18n.language == "de") {
    isDe = true;
    isEn = false;
  } else if (i18n.language == "en") {
    isDe = false;
    isEn = true;
  }

  function changeLanguageHandler(lang: string) {
    i18n.changeLanguage(lang);
  }

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
            <ul className={`navbar-nav me-5 ${styles["cm-navbar-nav"]}`}>
              <NavigationLink title={t('nav-travel')} currentMode={currentMode} modeName="travel" handleClick={handleClick}></NavigationLink>
              <NavigationLink title={t('nav-freight')} currentMode={currentMode} modeName="freight" handleClick={handleClick}></NavigationLink>
              <NavigationLink title={t('nav-household')} currentMode={currentMode} modeName="household" handleClick={handleClick}></NavigationLink>
            </ul>
            <div className="lang-switch">
              <a className={`${isDe ? `btn btn-light` : `btn btn-outline-light`}`} onClick={() => changeLanguageHandler("de")}>DE</a><a className={`${isEn ? `btn btn-light` : `btn btn-outline-light`}`} onClick={() => changeLanguageHandler("en")}>EN</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;