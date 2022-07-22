import React, { FC, useState } from "react";
import styles from "./FreightEditModal.module.scss";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { FreightLeg } from "../FreightFormLeg/FreightFormLeg";
import FreightFormRow from "../FreightFormRow/FreightFormRow";
import { Alert } from "react-bootstrap";

interface FreightEditModalProps {
  leg: FreightLeg;
  showModal: boolean;
  handleClose: () => void;
  handleSave: (distance: number, weight: number) => void;
}

const FreightEditModal: FC<FreightEditModalProps> = ({
  leg,
  showModal,
  handleClose,
  handleSave,
}) => {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const [isValid, setValid] = useState({
    distance: true,
    weight: true,
  });

  /**
   * get new values from fields and save if valide
   */
  function handleClick() {
    let isFormValid = true;

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
    const weightSelect = document.getElementById(
      "weight-edit"
    ) as HTMLInputElement;
    let weight = leg.weight;
    if (weightSelect != null) {
      weight = parseInt(weightSelect.value);
      if (!isValid.weight) {
        isFormValid = false;
      }
    }

    if (isFormValid) {
      handleSave(distance, weight);
      setShow(false);
    } else {
      setShow(true);
    }
  }

  return (
    <Modal
      className={styles.FreightEditModal}
      data-testid="FreightEditModal"
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
        <FreightFormRow
          currKind={leg.type}
          leg={leg}
          getValidationInfoRow={(distance: boolean, weight: boolean) =>
            setValid({
              distance: distance,
              weight: weight,
            })
          }
        ></FreightFormRow>
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

export default FreightEditModal;