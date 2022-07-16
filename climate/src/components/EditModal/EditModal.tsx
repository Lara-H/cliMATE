import React, { FC, useState } from "react";
import styles from "./EditModal.module.scss";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { Leg } from "../FormLeg/FormLeg";

interface EditModalProps {
  leg: Leg;
  show: boolean;
  handleClose: () => void;
  handleSave: () => void;
}

const EditModal: FC<EditModalProps> = ({
  leg,
  show,
  handleClose,
  handleSave,
}) => {
  const { t, i18n } = useTranslation();

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
      <ModalBody>Distanz={leg.distance}, Personenzahl={leg.passengers}, Fahrzeugzahl={leg.vehicles}</ModalBody>
      <ModalFooter>
        <button className="btn btn-secondary" onClick={handleClose}>
          {t("btn-close")}
        </button>
        <button
          className="btn btn-primary text-light"
          onClick={() => {
            handleClose();
            handleSave();
          }}
        >
          {t("btn-save")}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default EditModal;
