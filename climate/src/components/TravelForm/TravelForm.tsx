import React, { FC } from 'react';
import styles from './TravelForm.module.scss';

interface TravelFormProps {}

const TravelForm: FC<TravelFormProps> = () => (
  <div className={styles.TravelForm} data-testid="TravelForm">
    TravelForm Component
  </div>
);

export default TravelForm;
