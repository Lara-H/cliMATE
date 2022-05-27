import React, { FC } from 'react';
import styles from './Teaser.module.scss';

interface TeaserProps {}

const Teaser: FC<TeaserProps> = () => (
  <div className={styles.Teaser} data-testid="Teaser">
    Teaser Component
  </div>
);

export default Teaser;
