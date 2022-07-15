import React, { FC } from 'react';
import styles from './EditModal.module.scss';
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

interface EditModalProps {
  title : string,
  show : boolean,
  handleClose: () => void;
}

const EditModal: FC<EditModalProps> = ({title, show, handleClose}) => 
{
  const { t, i18n } = useTranslation();
  return (
    <Modal className={styles.EditModal} data-testid="EditModal" show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>Ich mag Züge</ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={handleClose}>
          {t("btn-close")}
          </button>
          <button className="btn btn-primary text-light" onClick={handleClose}>
          {t("btn-save")}
          </button>
        </ModalFooter>
      </Modal>
);
  };

export default EditModal;
