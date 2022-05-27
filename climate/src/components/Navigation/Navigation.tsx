import React, { FC } from 'react';
import styles from './Navigation.module.scss';

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => (
  <div className={styles.Navigation} data-testid="Navigation">
    Navigation Component
  </div>
);

export default Navigation;
