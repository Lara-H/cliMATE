import React, { FC } from 'react';
import { Value } from 'sass';
import styles from './ResultAreaText.module.scss';

interface ResultAreaTextProps {
  value: String;
  label: String;
}

const ResultAreaText: FC<ResultAreaTextProps> = ({ value, label }) => (
  <div className={styles.ResultAreaText} data-testid="ResultAreaText">
    <h3 className="display-5">{value}</h3>
    <p className='text-muted small'>{label}</p>
  </div>
);

export default ResultAreaText;
