import React, { FC, useState } from "react";
import FormLeg, { Leg } from "../FormLeg/FormLeg";
import styles from "./FormArea.module.scss";

interface FormAreaProps {}

const FormArea: FC<FormAreaProps> = () => {
  const [legs, setLegs] = useState<Leg[]>([]);

  return(
  <div
    className={[styles.FormArea, "bg-light"].join(" ")}
    data-testid="FormArea"
  >
    <div className="container">
      <div className="row align-baseline">
        <div className="col">
          <h2>Personenreise</h2>
        </div>
        <div className="col text-end">
          <a href="#">Ändern</a>
        </div>
      </div>
      <hr></hr>
      <form onSubmit={(event) => {
        event.preventDefault();
        const newLeg={
          id: 1,
          type: "Test",
          distance: 50
        }
        const newLegList = legs.concat(newLeg);
        setLegs(newLegList);
      }}>
        <div className="row">
          <div className="col-12 col-md">
            <label htmlFor="people" className="form-label">
              Anzahl Personen
            </label>
            <input
              type="number"
              className="form-control"
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
              <button type="submit" className="btn btn-primary text-light">
                Hinzufügen
              </button>
            </div>
          </div>
        </div>
      </form>
      
      <div className="row">
        <div className="col">
          <table className="table table-striped">
            <tbody>
              {
                legs.map((leg) => (
                  <FormLeg leg={leg}></FormLeg>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-secondary" onClick={(event) => {
            event.preventDefault();

            setLegs([]);
          }}>
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
};

export default FormArea;
