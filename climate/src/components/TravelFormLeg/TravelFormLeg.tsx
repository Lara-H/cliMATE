import React, { FC, useState } from "react";
import styles from "./TravelFormLeg.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditModal from "../EditModal/EditModal";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import internal from "stream";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface TravelFormLegProps {
  leg: TravelLeg;
  handleRemove: (id: string) => void;
}

const TravelFormLeg: FC<TravelFormLegProps> = ({ leg, handleRemove }) => {
  const { t, i18n } = useTranslation();

  //current leg values
  const [currLeg, setCurrLeg] = useState(leg);

  // check if fields are valide
  const [valide, setValide] = useState({
    people: true,
    distance: true,
    vehicles: true,
  });

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

  function handleValidationValues(
    people: boolean,
    distance: boolean,
    vehicles: boolean
  ) {
    setValide({ people: people, distance: distance, vehicles: vehicles });
  }

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
    handleClose();
  }

  return (
    <tr className={styles.TravelFormLeg} data-testid="TravelFormLeg">
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
          handleValidationValues={handleValidationValues}
        ></EditModal>
      </td>
    </tr>
  );
};

// Define a Leg Object-Type.
export interface TravelLeg {
  id: string;
  type: string;
  passengers: number;
  distance: number;
  vehicles: number;
}

export default TravelFormLeg;