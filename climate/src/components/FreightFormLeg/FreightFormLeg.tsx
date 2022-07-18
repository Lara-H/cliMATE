import React, { FC, useState } from "react";
import styles from "./FreightFormLeg.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import internal from "stream";
import { useTranslation } from "react-i18next";
import EditModal from "../EditModal/EditModal";

interface FreightFormLegProps {
  leg: FreightLeg;
  handleRemove: (id: string) => void;
}

const FreightFormLeg: FC<FreightFormLegProps> = ({ leg, handleRemove }) => {
  const { t, i18n } = useTranslation();

  //current leg values
  const [currLeg, setCurrLeg] = useState(leg);

  //modal-states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * handle edited value from modal
   */
   function handleSave(distance:number, weight:number) {
    let newLeg = {
      id: currLeg.id,
      type: currLeg.type,
      distance: distance,
      weight: weight,
    };
    setCurrLeg(newLeg);
    handleClose();
  }

  return (
    <tr className={styles.FreightFormLeg} data-testid="FreightFormLeg">
      <td>{t(currLeg.type)}</td>
      <td>{currLeg.distance} km</td>
      <td>{currLeg.weight} t</td>
      <td className="text-end">
        <a type="button">
          <FontAwesomeIcon className="me-3" icon={faEdit} />
        </a>
        <a type="button" onClick={() => handleRemove(currLeg.id)}>
          <FontAwesomeIcon className="text-danger" icon={faTrash} />
        </a>
        {/* 
        <EditModal
          leg={currLeg}
          showModal={show}
          handleClose={handleClose}
          handleSave={handleSave}
        ></EditModal>
        */}
      </td>
    </tr>
  );
};

// Define a Leg Object-Type.
export interface FreightLeg {
  id: string;
  type: string;
  weight: number;
  distance: number;
}

export default FreightFormLeg;
