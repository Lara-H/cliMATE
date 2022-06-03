import React, { FC } from "react";
import FormSelectorButton from "../FormSelectorButton/FormSelectorButton";
import { library } from "@fortawesome/fontawesome-svg-core";
import styles from "./FormSelector.module.scss";
import {
  faPersonWalkingLuggage,
  faPeopleCarryBox,
  faPeopleRoof,
} from "@fortawesome/free-solid-svg-icons";

interface FormSelectorProps {}

const FormSelector: FC<FormSelectorProps> = () => (
  <div className={styles.FormSelector} data-testid="FormSelector">
    <div className="container">
      <div className="row text-md-center">
        <div className="col">
          <h2 id="FormSelectorHeadline">Lorem ipsum dolor sit amet</h2>
          <div className="col-lg-6 mx-auto">
            <p className="mb-5">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </p>
            <div className="row justify-content-sm-center text-center">
              <div className="col border-end">
                <FormSelectorButton
                  icon={faPersonWalkingLuggage}
                  title={"Personenreise"}
                ></FormSelectorButton>
              </div>
              <div className="col border-end">
                <FormSelectorButton
                  icon={faPeopleCarryBox}
                  title={"Frachtsendung"}
                ></FormSelectorButton>
              </div>
              <div className="col">
                <FormSelectorButton
                  icon={faPeopleRoof}
                  title={"Haushalt"}
                ></FormSelectorButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FormSelector;
