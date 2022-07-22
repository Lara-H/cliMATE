import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./FormField.module.scss";
import codeList from "./iata.json";

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  initValue: string;
  allowNull?: boolean;
  getValidationInfoField: (id: string, isValide: boolean) => void;
}

const FormField: FC<FormFieldProps> = ({
  label,
  id,
  type,
  initValue,
  allowNull,
  getValidationInfoField,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState("");

  /**
   * check if value is an iata code
   * @param value
   */
  function isIATAcode(value: string) {
    for (let i in codeList) {
      if (value === codeList[i]) {
        return true;
      }
    }
    return false;
  }

  /**
   * handle value and check if valid while typing
   * @param newValue
   */
  function handleChange(newValue: string) {
    let isValid = true;
    setValue(newValue);
    if (type === "number") {
      if (
        newValue.match(/^[1-9]+[0-9]*$/) ||
        (allowNull && newValue.match(/^[0-9]+[0-9]*$/))
      ) {
        setError("");
      } else {
        isValid = false;
        if (newValue.length === 0) {
          setError(t("error_notEmpty"));
        } else {
          setError(t("error_notNegative"));
        }
      }
    } else if (type === "text") {
      if (isIATAcode(newValue)) {
        // all text inputs must be iata-code (flight)
        setError("");
      } else {
        isValid = false;
        if (newValue.length === 0) {
          setError(t("error_notEmpty"));
        } else {
          setError(t("error_notIATA"));
        }
      }
    }
    getValidationInfoField(id, isValid); // send info if field is valid to top component
  }

  return (
    <div
      className={`col-12 col-md ${styles.FormField}`}
      data-testid="FormField"
    >
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <br></br>
      <input
        type={type}
        className={`${error ? `form-control is-invalid` : `form-control`}`}
        id={id}
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <small className="invalid-feedback">{error}</small>
    </div>
  );
};

export default FormField;