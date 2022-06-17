import React, { FC, useEffect, useState } from "react";
import FormLeg, { Leg } from "../FormLeg/FormLeg";
import FormLegStories from "../FormLeg/FormLeg.stories";
import styles from "./FormArea.module.scss";

interface FormAreaProps {}

const FormArea: FC<FormAreaProps> = () => {
  const [legs, setLegs] = useState<Leg[]>([]);

  function handleRemoveItem(id:string) {
    const newLegs = legs.filter((item) => item.id !== id);
    setLegs(newLegs);
  }

  function handleEvaluation() {
    console.log(JSON.stringify(legs));
  }

  return(
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
      <form onSubmit={(event) => {
        event.preventDefault();
        const newLeg={
          id: ""+(legs.length+1),
          type: "passenger_train-route_type_commuter_rail-fuel_source_na",
          passengers: 1,
          distance: 50,
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
              value="2"
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
          <table className="table table-striped mb-0">
            <tbody>
              {
                legs.map((leg) => (
                  <FormLeg leg={leg} key={leg.id} handleRemove={handleRemoveItem}></FormLeg>
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
          <button type="button" className="btn btn-primary text-light" onClick={(event) => {
            event.preventDefault();
            handleEvaluation();
          }}>
            Auswerten
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};


export default FormArea;
