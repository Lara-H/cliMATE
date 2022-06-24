import React, { FC } from 'react';
import styles from './HouseholdForm.module.scss';

interface HouseholdFormProps {}

const HouseholdForm: FC<HouseholdFormProps> = () => (
  <div className={styles.HouseholdForm} data-testid="HouseholdForm">
    HouseholdForm Component
  </div>
);

export default HouseholdForm;
