import React, { FC } from 'react';
import styles from './Teaser.module.scss';

interface TeaserProps {}

const Teaser: FC<TeaserProps> = () => (
  <div className={[styles.Teaser, "text-light", "bg-dark"].join(' ')} data-testid="Teaser">
    <div className="container-fluid ">
      <div className="row">
        <div className="col col-md-4">
          <p className="fs-1">Wie groß ist der Fußabdruck deiner Reise?</p>
          <button type="button" className="btn btn-outline-light">Jetzt kalkulieren</button>
        </div>
      </div>
    </div>
  </div>
);

export default Teaser;
