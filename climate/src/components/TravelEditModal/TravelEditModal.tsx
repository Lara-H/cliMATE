import React, { FC, useState } from "react";
import styles from "./TravelEditModal.module.scss";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { TravelLeg } from "../TravelFormLeg/TravelFormLeg";
import TravelFormRow from "../TravelFormRow/TravelFormRow";
import { Alert } from "react-bootstrap";

interface TravelEditModalProps {
  leg: TravelLeg;
  showModal: boolean;
  handleClose: () => void;
  handleSave: (passengers: number, distance: number, vehicles: number) => void;
}

const TravelEditModal: FC<TravelEditModalProps> = ({
  leg,
  showModal,
  handleClose,
  handleSave,
}) => {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const [isValid, setValid] = useState({
    people: true,
    distance: true,
    vehicles: true,
  });

  /**
   * get new values from fields and save if valide
   */
  function handleClick() {
    let isFormValid = true;

    const passengerSelect = document.getElementById(
      "people-edit"
    ) as HTMLInputElement;
    let people = leg.passengers;
    if (passengerSelect != null) {
      people = parseInt(passengerSelect.value);
      if (!isValid.people) {
        isFormValid = false;
      }
    }
    const distanceSelect = document.getElementById(
      "distance-edit"
    ) as HTMLInputElement;
    let distance = leg.distance;
    if (distanceSelect != null) {
      distance = parseInt(distanceSelect.value);
      if (!isValid.distance) {
        isFormValid = false;
      }
    }
    const vehicleSelect = document.getElementById(
      "vehicles-edit"
    ) as HTMLInputElement;
    let vehicles = leg.vehicles;
    if (vehicleSelect != null) {
      vehicles = parseInt(vehicleSelect.value);
      if (!isValid.vehicles) {
        isFormValid = false;
      }
    }

    if (isFormValid) {
      handleSave(people, distance, vehicles);
      setShow(false);
    } else {
      setShow(true);
    }
  }

  return (
    <Modal
      className={styles.TravelEditModal}
      data-testid="TravelEditModal"
      show={showModal}
      onHide={handleClose}
    >
      <ModalHeader closeButton>
        <ModalTitle>{t(leg.type)}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Alert
          className={`${show ? "d-block" : "d-none"}`}
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          {t("error-alert")}
        </Alert>
        <TravelFormRow
          currKind={leg.type}
          leg={leg}
          getValidationInfoRow={(
            people: boolean,
            distance: boolean,
            vehicles: boolean
          ) =>
            setValid({
              people: people,
              distance: distance,
              vehicles: vehicles,
            })
          }
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

export default TravelEditModal;
