import { setDefaultResultOrder } from "dns";
import React, { FC, useEffect, useState } from "react";
import FormLeg, { Leg } from "../FormLeg/FormLeg";
import FormLegStories from "../FormLeg/FormLeg.stories";
import styles from "./FormArea.module.scss";

interface FormAreaProps {
  result: Array<Object>,
  setResult: Function,
  children: React.ReactNode;
}

const FormArea: FC<FormAreaProps> = ({
  result,
  setResult
}) => {
  const [legs, setLegs] = useState<Leg[]>([]);


  /**
   * functionality to delete an item with given id from our legs-state.
   * @param id 
   */
  function handleRemoveItem(id:string) {
    const newLegs = legs.filter((item) => item.id !== id);
    setLegs(newLegs);
  }

  /**
   * parse all legs into a JSON-Object and send it as body to the API. If the response is positively, set the result state to the response.
   */
  function handleEvaluation() {
    var evalBody:any[] = [];
    legs.forEach(leg => {
      const legJson = {"emission_factor": leg.type, "parameters" :{"distance": leg.distance, "distance_unit": "km"}}
      evalBody.push(legJson);
    });

    //console.log(JSON.stringify(evalBody))

    fetch("https://beta3.api.climatiq.io/batch", {
      method: "POST",
      headers: {
        Authorization: `Bearer VV5MNGFFJ0MF2DN921WJ93W84AQZ`,
      },
      body: JSON.stringify(evalBody)
    })
  .then((res) => res.json())
  .then((data) =>
  setResult(data.results))
  }

  return(
  <div
    className={[styles.FormArea, "bg-light"].join(" ")}
    data-testid="FormArea"
  >
    <span className="cm-anchor" id="FormArea"></span>
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
        const kindSelect = (document.getElementById("kind") as HTMLInputElement);
        const peopleSelect = (document.getElementById("people") as HTMLInputElement);
        const newLeg={
          id: ""+(legs.length+1),
          type: kindSelect.value,
          passengers: (peopleSelect.value as unknown as number),
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
              defaultValue="2"
              min="1"
            />
          </div>
          <div className="col-12 col-md">
            <label htmlFor="kind" className="form-label">
              Art
            </label>
            <div className="input-group mb-3">
              <select className="form-select" id="kind">
                <option value="passenger_train-route_type_commuter_rail-fuel_source_na">Zugfahrt</option>
                <option value="passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na">Autofahrt</option>
                <option value="passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included">Flug</option>
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
            const resultHeading = window.document.getElementById("resultHeading");
            if(resultHeading !== null) {
              resultHeading.scrollIntoView();
            }
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