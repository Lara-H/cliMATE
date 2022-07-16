import React, { FC } from "react";
import styles from "./FormField.module.scss";

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
}

const FormField: FC<FormFieldProps> = ({ label, id, type, value }) => (
  <div className={`col-6 col-md ${styles.FormField}`} data-testid="FormField">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <br></br>
    <input type={type} className="form-control" id={id} defaultValue={value} />
  </div>
);

export default FormField;
