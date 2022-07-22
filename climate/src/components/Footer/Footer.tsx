import React, { FC, useEffect, useState } from 'react';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import {
  faAngleUp
} from "@fortawesome/free-solid-svg-icons";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const { t, i18n } = useTranslation();

  // Scroll-to-top Button Mobile nach Scrollen fixed einblenden
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 100);
    });
  }, []);

return(
  <footer className={[styles.Footer, "text-light", "bg-dark", "py-4"].join(' ')} data-testid="Footer">
    <div className="container">
      <div className="row align-items-baseline">
        <div className="col small">
          <a id="imprint-link" className="me-2" href="/impressum">{t('imprint-headline')}</a>|<a id="datenschutz-link" className="ms-2" href="/datenschutz">{t('privacy-headline')}</a>
        </div>
        <div className="col text-end">
          <a href="#" type="button" className={scroll ? `btn btn-primary text-light ${styles["cm-btn"]}` : `btn btn-primary text-light d-none d-sm-inline-block ${styles["cm-btn"]}`}><FontAwesomeIcon icon={faAngleUp} /></a>
        </div>
      </div>
    </div>
  </footer>
);
};

export default Footer;
