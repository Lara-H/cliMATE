import React, { FC, useState } from "react";
import styles from "./FormField.module.scss";

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  initValue: string;
  handleValidation: (id: string, isValide: boolean) => void;
}

const FormField: FC<FormFieldProps> = ({
  label,
  id,
  type,
  initValue,
  handleValidation,
}) => {
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState("");
  const [valid, setValid] = useState(true);

  function handleChange(newValue: string) {
    setValue(newValue);

    if (type == "number") {
      if (newValue.match(/^[1-9]+[0-9]*$/)) {
        setError("");
        setValid(true)
      } else {
        setValid(false)
        if (newValue.length == 0) {
          setError("Feld darf nicht leer sein");
        } else {
          setError("Zahl muss größer als 0 sein");
        }
      }
    } else if (type == "text") {
      if (newValue.match(/^[A-Z]+[A-Z]+[A-Z]/)) {
        setError("");
        setValid(true)
      } else {
        setValid(false)
        if (newValue.length == 0) {
          setError("Feld darf nicht leer sein");
        } else {
          setError("Code nicht gültig");
        }
      }
    }

    handleValidation(id, valid);
  }

  return (
    <div className={`col-6 col-md ${styles.FormField}`} data-testid="FormField">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <br></br>
      <input
        type={type}
        className={`${
          error ? `form-control is-invalid` : `form-control is-valid`
        }`}
        id={id}
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <small className="">{error}</small>
    </div>
  );
};

export default FormField;
