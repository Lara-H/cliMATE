import React, { FC } from 'react';
import styles from './FormSelectorButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { library } from "@fortawesome/fontawesome-svg-core";
import {faCoffee} from '@fortawesome/free-solid-svg-icons'

library.add(faCoffee);

interface FormSelectorButtonProps {
  icon: IconProp,
  title: String,
}

const FormSelectorButton: FC<FormSelectorButtonProps> = ({icon, title}) => (
  <div className={[styles.FormSelectorButton, "px-3"].join(' ')} data-testid="FormSelectorButton">
    <FontAwesomeIcon className='display-3' icon={icon} />
    <h3>{title}</h3>
  </div>
);

export default FormSelectorButton;
