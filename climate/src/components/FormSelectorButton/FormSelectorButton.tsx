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
    className={[styles.FormSelectorButton, "px-3"].join(" ")}
    data-testid="FormSelectorButton"
  >
    <FontAwesomeIcon className="display-4 mb-3" icon={icon} />
    <p>{title}</p>
  </div>
);

export default FormSelectorButton;
