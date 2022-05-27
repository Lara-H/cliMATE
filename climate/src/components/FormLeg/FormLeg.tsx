import React, { FC } from 'react';
import styles from './FormLeg.module.scss';

interface FormLegProps {}

const FormLeg: FC<FormLegProps> = () => (
  <tr className={styles.FormLeg} data-testid="FormLeg">
    <td>Zugfahrt</td>
    <td>100km</td>
    <td>2. Klasse</td>
    <td className="text-end"><a href="#">EditIcon</a><a className="ms-2" href="#">DeleteIcon</a></td>
  </tr>
);

export default FormLeg;
