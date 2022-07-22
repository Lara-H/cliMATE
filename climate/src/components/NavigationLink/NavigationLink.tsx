import React, { FC } from "react";
import styles from "./NavigationLink.module.scss";

interface NavigationLinkProps {
  title: string;
  currentMode: string;
  modeName: string;
  handleClick: (modeName: string) => void;
}

const NavigationLink: FC<NavigationLinkProps> = ({
  title,
  currentMode,
  modeName,
  handleClick,
}) => {
  
  // check if nav-item has to be active nav-item
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
    <li
      className={`${styles.NavigationLink} nav-item`}
      data-testid="NavigationLink"
    >
      <a
        onClick={() => {
          handleClick(modeName);
          scrollToForm();
        }}
        className={`${isActive ? `nav-link ${styles["active"]}` : "nav-link"}`}
      >
        {title}
      </a>
    </li>
  );
};

export default NavigationLink;