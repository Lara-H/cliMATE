import React, { FC, useEffect, useState } from "react";
import styles from "./TravelFormLeg.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TravelEditModal from "../TravelEditModal/TravelEditModal";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import internal from "stream";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface TravelFormLegProps {
  leg: TravelLeg;
  handleRemove: (id: string) => void;
  handleEdit: (leg: TravelLeg) => void;
}

const TravelFormLeg: FC<TravelFormLegProps> = ({ leg, handleRemove, handleEdit }) => {
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
  const airportString = currLeg.departureAirport + " - " + currLeg.arrivalAirport

  /**
   * handle edited value from modal
   */
  function handleSave(passengers:number, distance:number, vehicles:number, departureAirport:string, arrivalAirport:string) {
    let newLeg = {
      id: currLeg.id,
      type: currLeg.type,
      passengers: passengers,
      distance: distance,
      vehicles: vehicles,
      departureAirport: departureAirport,
      arrivalAirport: arrivalAirport
    };
    handleEdit(newLeg);
    setCurrLeg(newLeg);
    handleClose();
  }

  return (
    <tr className={styles.TravelFormLeg} data-testid="TravelFormLeg">
      <td>{t(currLeg.type)}</td>
      <td>{currLeg.distance == 0 ? airportString : currLeg.distance + " km"}</td>
      <td>{currLeg.passengers == 0 ? vehicleString : passengerString}</td>
      <td className="text-end">
        <a type="button" onClick={handleShow}>
          <FontAwesomeIcon className="me-3" icon={faEdit} />
        </a>
        <a type="button" onClick={() => handleRemove(currLeg.id)}>
          <FontAwesomeIcon className="text-danger" icon={faTrash} />
        </a>
        <TravelEditModal
          leg={currLeg}
          showModal={show}
          handleClose={handleClose}
          handleSave={handleSave}
        ></TravelEditModal>
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
  departureAirport: string;
  arrivalAirport: string;
}

export default TravelFormLeg;
