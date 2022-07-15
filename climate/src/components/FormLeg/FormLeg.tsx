import React, { FC, useState } from "react";
import styles from "./FormLeg.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditModal from "../EditModal/EditModal";
import {
  faTrash,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import internal from "stream";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface FormLegProps {
  leg:Leg;
  handleRemove:(id: string) => void;
}

const FormLeg: FC<FormLegProps> = ({leg, handleRemove}) => {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const passengerString = i18next.t('table_passengerNum', {count: leg.passengers});
  const vehicleString = i18next.t('table_vehicleNum', {count: leg.vehicles});

  return (
    <tr className={styles.FormLeg} data-testid="FormLeg">
      <td>{t(leg.type)}</td>
      <td>{leg.distance == 0 ? "FRA - MUN" : leg.distance + " km"}</td>
      <td>{leg.passengers == 0 ? vehicleString : passengerString}</td>
      <td className="text-end">
        <a type="button" onClick={handleShow}><FontAwesomeIcon className="me-3" icon={faEdit} /></a>
        <a type="button" onClick={() => handleRemove(leg.id)}><FontAwesomeIcon className="text-danger" icon={faTrash} /></a>
        <EditModal title={t(leg.type)} show={show} handleClose={handleClose}></EditModal>
      </td>
    </tr>
  );
};

// irgendwie so...
export interface Leg {
  id:string;
  type:string;
  passengers: number;
  distance: number;
  vehicles: number;
};

export default FormLeg;