import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import FormField from "../FormField/FormField";
import { FreightLeg } from "../FreightFormLeg/FreightFormLeg";
import styles from "./FreightFormRow.module.scss";

interface FreightFormRowProps {
  currKind: string;
  leg?: FreightLeg;
  getValidationInfoRow: (distance: boolean, weight: boolean) => void;
}

const FreightFormRow: FC<FreightFormRowProps> = ({
  currKind,
  leg,
  getValidationInfoRow,
}) => {
  const { t, i18n } = useTranslation();
  const [isValid, setValid] = useState({
    distance: true,
    weight: true,
  });

  /*
   * sumarize validation-info of seperate fields
   */
  function generateValidationInfoRow(id: string, isValide: boolean) {
    // send info if fields of row is valid to top component
    switch (id) {
      case "distance":
      case "distance-edit":
        getValidationInfoRow(isValide, isValid.weight); // send info if fields of row is valid to top component
        setValid({
          distance: isValide,
          weight: isValid.weight,
        });
        break;
      case "weight":
      case "weight-edit":
        getValidationInfoRow(isValid.distance, isValide); // send info if fields of row is valid to top component
        setValid({
          distance: isValid.distance,
          weight: isValide,
        });
        break;
      default:
        setValid({
          distance: isValid.distance,
          weight: isValid.weight,
        });
    }
  }

  return (
    <div
      className={`${styles.FreightFormRow} row`}
      data-testid="FreightFormRow"
    >
      <FormField
        label={t("freight-distance")}
        id={leg ? "distance-edit" : "distance"}
        type="number"
        initValue={leg ? leg.distance.toString() : "1"}
        getValidationInfoField={generateValidationInfoRow}
      ></FormField>
      <FormField
        label={t("freight-weight")}
        id={leg ? "weight-edit" : "weight"}
        type="number"
        initValue={leg ? leg.weight.toString() : "1"}
        getValidationInfoField={generateValidationInfoRow}
      ></FormField>
    </div>
  );
};

export default FreightFormRow;
