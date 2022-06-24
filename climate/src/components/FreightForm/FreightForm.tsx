import React, { FC } from 'react';
import styles from './FreightForm.module.scss';

interface FreightFormProps {}

const FreightForm: FC<FreightFormProps> = () => (
  <div className={styles.FreightForm} data-testid="FreightForm">
    FreightForm Component
  </div>
);

export default FreightForm;
