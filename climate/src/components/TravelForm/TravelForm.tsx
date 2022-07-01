import React, { FC } from 'react';
import FormArea from '../FormArea/FormArea';
import styles from './TravelForm.module.scss';

interface TravelFormProps {
  result: Array<Object>,
  setResult: Function
}

const TravelForm: FC<TravelFormProps> = ({
  result,
  setResult
}) => (
  <div className={styles.TravelForm} data-testid="TravelForm">
    <FormArea result={result} setResult={setResult}> </FormArea>
  </div>
);

export default TravelForm;
