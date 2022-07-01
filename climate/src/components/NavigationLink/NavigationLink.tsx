import React, { FC } from "react";
import styles from "./NavigationLink.module.scss";

interface NavigationLinkProps {
  title:string,
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
  // TODO: hier stimmt irgendwas glaube ich nicht, folgender Code wird nicht nur bei Click auf das Element ausgeführt, sondern auch beim Laden der Seite einmal für jedes Element...
  let isActive = false;
  if (currentMode == modeName) {
    isActive = true;
  } else {
    isActive = false;
  }

  // Scroll to the FormSelector with the selected Form.
  const FormSelectorHeadline = document.getElementById('FormSelectorHeadline');
  if(FormSelectorHeadline != null) {
    FormSelectorHeadline.scrollIntoView();
  }

return(
  <li
    className={[styles.NavigationLink, "nav-item"].join(" ")}
    data-testid="NavigationLink"
  >
    <a
      onClick={() => handleClick(modeName)}
      className={`${isActive ? `nav-link ${styles["active"]}` : "nav-link"}`}
    >
      {title}
    </a>
  </li>
);
};

export default NavigationLink;
