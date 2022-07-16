import React, { FC } from "react";
import styles from "./FreightFormLeg.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import internal from "stream";

interface FreightFormLegProps {
  leg:FreightLeg;
  handleRemove:(id: string) => void;
}

const FreightFormLeg: FC<FreightFormLegProps> = ({leg, handleRemove}) => {
  return (
    <tr className={styles.FormLeg} data-testid="FormLeg">
      <td>{leg.type}</td>
      <td>{leg.distance}</td>
      <td>2. Klasse</td>
      <td className="text-end">
        <a type="button" ><FontAwesomeIcon className="me-3" icon={faEdit} /></a>
        <a type="button" onClick={() => handleRemove(leg.id)}><FontAwesomeIcon className="text-danger" icon={faTrash} /></a>
      </td>
    </tr>
  );
};

// Define a Leg Object-Type.
export interface FreightLeg {
  id: string;
  type: string;
  weight: number,
  distance: number
};

export default FreightFormLeg;