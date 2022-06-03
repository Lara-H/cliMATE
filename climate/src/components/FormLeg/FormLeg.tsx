import React, { FC } from "react";
import styles from "./FormLeg.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import internal from "stream";

interface FormLegProps {
  leg:Leg;
}

const FormLeg: FC<FormLegProps> = ({leg}) => {
  return (
    <tr className={styles.FormLeg} data-testid="FormLeg">
      <td>{leg.type}</td>
      <td>{leg.distance}</td>
      <td>2. Klasse</td>
      <td className="text-end">
        <a href="#"><FontAwesomeIcon className="me-3" icon={faEdit} /></a>
        <a href="#"><FontAwesomeIcon className="text-danger" icon={faTrash} /></a>
      </td>
    </tr>
  );
};

// irgendwie so...
export interface Leg {
  type:string;
  distance: number;
};

export default FormLeg;