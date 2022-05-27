import React, { FC } from 'react';
import FormSelectorButton from '../FormSelectorButton/FormSelectorButton';
import { library } from "@fortawesome/fontawesome-svg-core";
import styles from './FormSelector.module.scss';
import {faCoffee, faPersonWalkingLuggage, faPeopleCarryBox, faPeopleRoof} from '@fortawesome/free-solid-svg-icons'

interface FormSelectorProps {}

library.add(faCoffee);

const FormSelector: FC<FormSelectorProps> = () => (
  <div className={styles.FormSelector} data-testid="FormSelector">
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Lorem Ipsum</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <FormSelectorButton icon={faPersonWalkingLuggage} title={"Personenreise"}></FormSelectorButton>
          <FormSelectorButton icon={faPeopleCarryBox} title={"Frachtsendung"}></FormSelectorButton>
          <FormSelectorButton icon={faPeopleRoof} title={"Haushalt"}></FormSelectorButton>
        </div>
      </div>
    </div>
  </div>
);

export default FormSelector;
