import React, { FC } from "react";
import styles from "./FormLeg.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit
} from "@fortawesome/free-solid-svg-icons";

interface FormLegProps {}

const FormLeg: FC<FormLegProps> = () => (
  <tr className={styles.FormLeg} data-testid="FormLeg">
    <td>Zugfahrt</td>
    <td>100km</td>
    <td>2. Klasse</td>
    <td className="text-end">
      <a href="#"><FontAwesomeIcon className="me-3" icon={faEdit} /></a>
      <a href="#"><FontAwesomeIcon className="cm-link-danger" icon={faTrash} /></a>
    </td>
  </tr>
);

export default FormLeg;
