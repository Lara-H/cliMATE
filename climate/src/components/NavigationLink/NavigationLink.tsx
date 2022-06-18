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
  let isActive = false;
  if (currentMode == modeName) {
    isActive = true;
  } else {
    isActive = false;
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
