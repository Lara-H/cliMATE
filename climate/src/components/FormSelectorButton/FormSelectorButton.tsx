import React, { FC } from "react";
import styles from "./FormSelectorButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { library } from "@fortawesome/fontawesome-svg-core";

interface FormSelectorButtonProps {
  icon: IconProp;
  title: String;
  modeName: string;
  handleClick:(modeName: string) => void;
}

const FormSelectorButton: FC<FormSelectorButtonProps> = ({ icon, title, modeName, handleClick }) => (
  <div
    className={styles.FormSelectorButton}
    data-testid="FormSelectorButton"
  >
    <a onClick={() => handleClick(modeName)}>
    <FontAwesomeIcon className={`display-4 mb-3 ${styles["cm-icon"]}`} icon={icon} />
    <p className="text-muted small">{title}</p>
    </a>
  </div>
);

export default FormSelectorButton;

