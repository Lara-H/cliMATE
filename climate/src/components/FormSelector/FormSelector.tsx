import React, { FC } from 'react';
import styles from './FormSelector.module.scss';

interface FormSelectorProps {}

const FormSelector: FC<FormSelectorProps> = () => (
  <div className={styles.FormSelector} data-testid="FormSelector">
    FormSelector Component
  </div>
);

export default FormSelector;
