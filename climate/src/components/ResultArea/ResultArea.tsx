import React, { FC } from 'react';
import styles from './ResultArea.module.scss';

interface ResultAreaProps {}

const ResultArea: FC<ResultAreaProps> = () => (
  <div className={styles.ResultArea} data-testid="ResultArea">
    ResultArea Component
  </div>
);

export default ResultArea;
