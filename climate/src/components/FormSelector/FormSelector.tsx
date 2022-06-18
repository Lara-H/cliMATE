import React, { FC, useState } from "react";
import FormSelectorButton from "../FormSelectorButton/FormSelectorButton";
import { library } from "@fortawesome/fontawesome-svg-core";
import styles from "./FormSelector.module.scss";
import {
  faPersonWalkingLuggage,
  faPeopleCarryBox,
  faPeopleRoof,
} from "@fortawesome/free-solid-svg-icons";

interface FormSelectorProps {
  handleClick:(modeName: string) => void;
}

const FormSelector: FC<FormSelectorProps> = ({handleClick}) => (
    <div className={styles.FormSelector} data-testid="FormSelector">
      <span className="cm-anchor" id="FormSelector"></span>

      <div className="container">
        <div className="row text-md-center">
          <div className="col">
            <h2 id="FormSelectorHeadline" className="mb-4">
              Lorem ipsum dolor sit amet
            </h2>
            <div className="col-lg-6 mx-auto">
              <p className="mb-5">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <div className="row text-center">
                <div className="col border-end">
                  <FormSelectorButton
                    icon={faPersonWalkingLuggage}
                    title={"Personenreise"}
                    modeName="travel"
                    handleClick={handleClick}
                  ></FormSelectorButton>
                </div>
                <div className="col border-end">
                  <FormSelectorButton
                    icon={faPeopleCarryBox}
                    title={"Frachtsendung"}
                    modeName="freight"
                    handleClick={handleClick}
                  ></FormSelectorButton>
                </div>
                <div className="col">
                  <FormSelectorButton
                    icon={faPeopleRoof}
                    title={"Haushalt"}
                    modeName="household"
                    handleClick={handleClick}
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
