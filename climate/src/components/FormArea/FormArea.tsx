import React, { FC } from 'react';
import styles from './FormArea.module.scss';

interface FormAreaProps {}

const FormArea: FC<FormAreaProps> = () => (
  <div className={styles.FormArea} data-testid="FormArea">
    FormArea Component
  </div>
);

export default FormArea;
