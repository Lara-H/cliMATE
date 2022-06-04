import React, { FC } from "react";
import styles from "./FormSelectorButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { library } from "@fortawesome/fontawesome-svg-core";

interface FormSelectorButtonProps {
  icon: IconProp;
  title: String;
}

const FormSelectorButton: FC<FormSelectorButtonProps> = ({ icon, title }) => (
  <div
    className={styles.FormSelectorButton}
    data-testid="FormSelectorButton"
  >
    <FontAwesomeIcon className={`display-4 mb-3 ${styles["cm-icon"]}`} icon={icon} />
    <p className="text-muted small">{title}</p>
  </div>
);

export default FormSelectorButton;

