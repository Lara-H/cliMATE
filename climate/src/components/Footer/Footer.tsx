import React, { FC } from 'react';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleUp
} from "@fortawesome/free-solid-svg-icons";

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <footer className={[styles.Footer, "text-light", "bg-dark", "py-4"].join(' ')} data-testid="Footer">
    <div className="container">
      <div className="row">
        <div className="col small">
          <a className="me-2" href="#">Impressum</a>
          <a href="#">Datenschutz</a>
        </div>
        <div className="col text-end">
          <button type="button" className="btn btn-primary text-light"><FontAwesomeIcon icon={faAngleUp} /></button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
