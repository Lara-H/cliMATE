import React, { FC, useState } from "react";
import styles from "./EditModal.module.scss";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { TravelLeg } from "../TravelFormLeg/TravelFormLeg";
import TravelFormRow from "../TravelFormRow/TravelFormRow";

interface EditModalProps {
  leg: TravelLeg;
  show: boolean;
  handleClose: () => void;
  handleSave: (passengers: number, distance: number, vehicles: number) => void;
}

const EditModal: FC<EditModalProps> = ({
  leg,
  show,
  handleClose,
  handleSave,
}) => {
  const { t, i18n } = useTranslation();

  const [valide, setValide] = useState({
    people: true,
    distance: true,
    vehicles: true,
  });

  /**
   * get new values from fields and save if valide
   */
  function handleClick() {
    let isValid = true;

    console.log(valide);

    const passengerSelect = document.getElementById(
      "people-edit"
    ) as HTMLInputElement;
    let people = leg.passengers;
    if (passengerSelect != null) {
      people = parseInt(passengerSelect.value);
      if (!valide.people) {
        isValid = false;
      }
    }

    const distanceSelect = document.getElementById(
      "distance-edit"
    ) as HTMLInputElement;
    let distance = leg.distance;
    if (distanceSelect != null) {
      distance = parseInt(distanceSelect.value);
      if (!valide.distance) {
        isValid = false;
      }
    }

    const vehicleSelect = document.getElementById(
      "vehicles-edit"
    ) as HTMLInputElement;
    let vehicles = leg.vehicles;
    if (vehicleSelect != null) {
      vehicles = parseInt(vehicleSelect.value);
      if (!valide.vehicles) {
        isValid = false;
      }
    }

    if (isValid) {
      handleSave(people, distance, vehicles);
    } else {
      console.log("MODLAL NICHT VALIDE");
    }
  }

  function handleValidationValues(
    people: boolean,
    distance: boolean,
    vehicles: boolean
  ) {
    setValide({ people: people, distance: distance, vehicles: vehicles });
  }

  return (
    <Modal
      className={styles.EditModal}
      data-testid="EditModal"
      show={show}
      onHide={handleClose}
    >
      <ModalHeader closeButton>
        <ModalTitle>{t(leg.type)}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <TravelFormRow
          currKind={leg.type}
          leg={leg}
          getValidationInfoRow={handleValidationValues}
        ></TravelFormRow>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-secondary" onClick={handleClose}>
          {t("btn-close")}
        </button>
        <button className="btn btn-primary text-light" onClick={handleClick}>
          {t("btn-save")}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default EditModal;
