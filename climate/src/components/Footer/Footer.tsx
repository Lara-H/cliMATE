import React, { FC } from 'react';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp
} from "@fortawesome/free-solid-svg-icons";

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <footer className={[styles.Footer, "text-light", "bg-dark", "py-4"].join(' ')} data-testid="Footer">
    <div className="container">
      <div className="row align-items-baseline">
        <div className="col small">
          <a className="me-2" href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </div>
        <div className="col text-end">
          <a href="#" type="button" className="btn btn-primary text-light"><FontAwesomeIcon icon={faAngleUp} /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
