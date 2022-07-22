import React, { FC } from "react";
import FormSelectorButton from "../FormSelectorButton/FormSelectorButton";
import styles from "./FormSelector.module.scss";
import { useTranslation } from "react-i18next";
import {
  faPersonWalkingLuggage,
  faPeopleCarryBox,
  faPeopleRoof,
} from "@fortawesome/free-solid-svg-icons";

interface FormSelectorProps {
  currentMode: string;
  handleClick: (modeName: string) => void;
}

const FormSelector: FC<FormSelectorProps> = ({ currentMode, handleClick }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.FormSelector} data-testid="FormSelector">
      <span className="cm-anchor" id="FormSelector"></span>

      <div className="container">
        <div className="row text-md-center">
          <div className="col">
            <div className="col-lg-8 mx-auto">
              <h2 id="FormSelectorHeadline" className="mb-4">
                {t("formSelector-headline")}
              </h2>
              <p className="mb-5">{t("formSelector-text")}</p>
              <div className="row text-center">
                <div className="col border-end">
                  <FormSelectorButton
                    icon={faPersonWalkingLuggage}
                    title={t("travel")}
                    currentMode={currentMode}
                    modeName="travel"
                    handleClick={handleClick}
                  ></FormSelectorButton>
                </div>
                <div className="col border-end">
                  <FormSelectorButton
                    icon={faPeopleCarryBox}
                    title={t("freight")}
                    currentMode={currentMode}
                    modeName="freight"
                    handleClick={handleClick}
                  ></FormSelectorButton>
                </div>
                <div className="col">
                  <FormSelectorButton
                    icon={faPeopleRoof}
                    title={t("household")}
                    currentMode={currentMode}
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
};

export default FormSelector;
