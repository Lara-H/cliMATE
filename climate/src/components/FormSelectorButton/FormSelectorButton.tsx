import React, { FC } from "react";
import styles from "./FormSelectorButton.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface FormSelectorButtonProps {
  icon: IconProp;
  title: String;
  currentMode: string;
  modeName: string;
  handleClick: (modeName: string) => void;
}

const FormSelectorButton: FC<FormSelectorButtonProps> = ({
  icon,
  title,
  currentMode,
  modeName,
  handleClick,
}) => {
  
   // check if button has to be active button
  let isActive = false;
  if (currentMode == modeName) {
    isActive = true;
  } else {
    isActive = false;
  }

  /**
   * scroll to form
   */
  function scrollToForm() {
    const FormArea = document.getElementById("FormArea");
    if (FormArea != null) {
      FormArea.scrollIntoView();
    }
  }

  return (
    <div className={styles.FormSelectorButton} data-testid="FormSelectorButton">
      <a
        onClick={() => {
          handleClick(modeName);
          scrollToForm();
        }}
      >
        <FontAwesomeIcon
          className={`${
            isActive
              ? `display-4 mb-3 ${styles["cm-icon"]} ${styles["active"]}`
              : `display-4 mb-3 ${styles["cm-icon"]}`
          }`}
          icon={icon}
        />
        <p className="text-muted small">{title}</p>
      </a>
    </div>
  );
};

export default FormSelectorButton;