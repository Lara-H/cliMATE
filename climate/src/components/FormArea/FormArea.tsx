import React, { FC } from "react";
import FormLeg from "../FormLeg/FormLeg";
import styles from "./FormArea.module.scss";

interface FormAreaProps {}

const FormArea: FC<FormAreaProps> = () => (
  <div
    className={[styles.FormArea, "bg-light"].join(" ")}
    data-testid="FormArea"
  >
    <div className="container">
      <div className="row align-items-baseline">
        <div className="col">
          <h2 className="mb-0">Personenreise</h2>
        </div>
        <div className="col text-end">
          <a href="#">Ändern</a>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="col-12 col-md">
          <label htmlFor="people" className="form-label">
            Anzahl Personen
          </label>
          <input
            type="number"
            className="form-control mb-3"
            id="people"
            placeholder="2"
            min="1"
          />
        </div>
        <div className="col-12 col-md">
          <label htmlFor="kind" className="form-label">
            Art
          </label>
          <div className="input-group mb-3">
            <select className="form-select" id="kind">
              <option value="train">Zugfahrt</option>
              <option value="car">Autofahrt</option>
              <option value="airplane">Flug</option>
            </select>
            <button type="button" className="btn btn-primary text-light">
              Hinzufügen
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-striped mb-0">
            <tbody>
              <FormLeg></FormLeg>
              <FormLeg></FormLeg>
              <FormLeg></FormLeg>
            </tbody>
          </table>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-secondary">
            Zurücksetzen
          </button>
        </div>
        <div className="col text-end">
          <button type="button" className="btn btn-primary text-light">
            Auswerten
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default FormArea;
