import React, { FC, useState } from "react";
import styles from "./FormLeg.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditModal from "../EditModal/EditModal";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import internal from "stream";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface FormLegProps {
  leg: Leg;
  handleRemove: (id: string) => void;
}

const FormLeg: FC<FormLegProps> = ({ leg, handleRemove }) => {
  const { t, i18n } = useTranslation();

  //current leg values
  const [currLeg, setCurrLeg] = useState(leg);

  //modal-states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //string values for return
  const passengerString = i18next.t("table_passengerNum", {
    count: currLeg.passengers,
  });
  const vehicleString = i18next.t("table_vehicleNum", {
    count: currLeg.vehicles,
  });

  /**
   * handle edited value from modal
   */
  function handleSave() {
    let newLeg = {
      id: currLeg.id,
      type: currLeg.type,
      passengers: currLeg.passengers,
      distance: currLeg.distance,
      vehicles: currLeg.vehicles,
    };
    setCurrLeg(newLeg);
  }

  return (
    <tr className={styles.FormLeg} data-testid="FormLeg">
      <td>{t(currLeg.type)}</td>
      <td>{currLeg.distance == 0 ? "FRA - MUN" : currLeg.distance + " km"}</td>
      <td>{currLeg.passengers == 0 ? vehicleString : passengerString}</td>
      <td className="text-end">
        <a type="button" onClick={handleShow}>
          <FontAwesomeIcon className="me-3" icon={faEdit} />
        </a>
        <a type="button" onClick={() => handleRemove(currLeg.id)}>
          <FontAwesomeIcon className="text-danger" icon={faTrash} />
        </a>
        <EditModal
          leg={currLeg}
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
        ></EditModal>
      </td>
    </tr>
  );
};

// irgendwie so...
export interface Leg {
  id: string;
  type: string;
  passengers: number;
  distance: number;
  vehicles: number;
}

export default FormLeg;