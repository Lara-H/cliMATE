import React, { FC, useEffect, useState } from "react";
import FreightFormLeg, { FreightLeg } from "../FreightFormLeg/FreightFormLeg";
import styles from './FreightForm.module.scss';
import { useTranslation } from "react-i18next";
import { v4 as uuid } from 'uuid';
import FormField from "../FormField/FormField";

interface FreightFormProps {
  result: Array<Object>;
  setResult: Function;
}

const FreightForm: FC<FreightFormProps> = ({ result, setResult}) => {
  const { t, i18n } = useTranslation();
  const [legs, setLegs] = useState<FreightLeg[]>([]);
  const [currKind, setCurrKind] = useState(
    // set initial state to car-emission.
    "freight_vehicle-vehicle_type-hgv_refrig-fuel_source_diesel-vehicle_weight_na-percentage_load_100"
  );
  const [valide, setValide] = useState({
    people: true,
    distance: true,
    vehicles: true,
  });

  /**
   * set new current kind when changing selected value in selectbox
   */
  const changeKind = (newValue: string) => {
    // TODO: console.log() entfernen.
    //console.log(newValue);
    // set the State Value currKind to newValue.
    setCurrKind(newValue);
  };

  /**
   * functionality to delete an item with given id from our legs-state.
   * @param id
   */
  function handleRemoveItem(id: string) {
    const newLegs = legs.filter((item) => item.id !== id);
    // set the State Value legs to newLegs.
    setLegs(newLegs);
  }

  /**
   * returns a Leg-Object, based on all input-fields.
   * 
   * @returns Leg
   */
  function createNewLeg() {
    // collect all our Input-Fields to handle them as variables.
    const kindSelect = document.getElementById(
      "kind"
    ) as HTMLInputElement;
    const weightInput = document.getElementById(
      "weight"
    ) as HTMLInputElement;
    const distanceInput = document.getElementById(
      "distance"
    ) as HTMLInputElement;
                
    let newLeg:FreightLeg;
    // Switch: Which kind of Leg is being chosen?
    switch (kindSelect.value) {
      case "freight_vehicle-vehicle_type-hgv_refrig-fuel_source_diesel-vehicle_weight_na-percentage_load_100":
        // Case: Freight by car.
        newLeg = {
          id: uuid(),
          type: kindSelect.value,
          distance: parseInt(distanceInput.value),
          weight: parseInt(weightInput.value)
        };
        break;
      case "freight_train-route_type_domestic-fuel_type_diesel":
        // Case: Freight by train.
        newLeg = {
          id: uuid(),
          type: kindSelect.value,
          weight: parseInt(weightInput.value),
          distance: parseInt(distanceInput.value)
        };
        break;
      case "freight_flight-route_type_domestic-distance_gt_1000km_lt_3500km-weight_gt_100t-rf_included":
        // Case: Freight by flight.
        newLeg = {
          id: uuid(),
          type: kindSelect.value,
          weight: parseInt(weightInput.value),
          distance: parseInt(distanceInput.value)
        };
        break;
      case "sea_freight-vessel_type_bulk_carrier-route_type_na-vessel_length_na-tonnage_gt_100000dwt_lt_199999dwt-fuel_source_na":
        // Case: Freight by ship.
        newLeg = {
          id: uuid(),
          type: kindSelect.value,
          weight: parseInt(weightInput.value),
          distance: parseInt(distanceInput.value)
        };
        break;
      default:
        // default to an init state.
        newLeg = {
          id: uuid(),
          type: "",
          weight: 0,
          distance: 0
        };
        break;
    }
    
    return newLeg;
  }

  /**
   * parse all legs into a JSON-Object and send it as body to the API. If the response is positively, set the result state to the response.
   */
  function handleEvaluation() {
    var evalBody: any[] = [];
    // TODO: console.log() entfernen.
    //console.log(legs);
    legs.forEach((leg) => {
      // parse the leg-object into a fitting format for the Climatiq-API.
      const legJson = {
        emission_factor: leg.type,
        parameters: { distance: leg.distance, distance_unit: "km", weight: leg.weight, weight_unit: "t" },
      };
      // Add it to evalBody
      evalBody.push(legJson);
    });
    // fetch from the Climatiq-Batch-Endpoint
    fetch("https://beta3.api.climatiq.io/batch", {
      method: "POST",
      headers: {
        Authorization: `Bearer VV5MNGFFJ0MF2DN921WJ93W84AQZ`,
      },
      // transfer our evalBody-Array via body to Climatiq.
      body: JSON.stringify(evalBody),
    })
      // transform the response to json...
      .then((res) => res.json())
      // ...and set the State-Variable result to data.results.
      .then((data) => 
        setResult(data.results)
      );
      
  }

  /**
   * check if valide
   */
   function handleValidation(id: string, isValide: boolean) {

    console.log("ID", id); 
    console.log("VALIDE", isValide); 

    switch (id) {
      case "person":
        setValide({
          people: isValide,
          distance: valide.distance,
          vehicles: valide.vehicles,
        });
        break;
      case "distance":
        setValide({
          people: valide.people,
          distance: isValide,
          vehicles: valide.vehicles,
        });
        break;
      case "vehicles":
        setValide({
          people: valide.people,
          distance: valide.distance,
          vehicles: isValide,
        });
        break;
      default: setValide({
        people: valide.people,
        distance: valide.distance,
        vehicles: valide.people,
      });
    }
    
  }

  return (
    <div
      className={[styles.FormArea, "bg-light"].join(" ")}
      data-testid="FormArea"
    >
      <span className="cm-anchor" id="FormArea"></span>
      <div className="container">
        <div className="row align-items-baseline">
          <div className="col">
            <h2 className="mb-0">{t("freight")}</h2>
          </div>
          <div className="col text-end">
            <a href="#FormSelector">{t("btn-change")}</a>
          </div>
        </div>
        <hr></hr>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            // initialize a newLeg-Variable
            let newLeg = createNewLeg();
            
            const newLegList = legs.concat(newLeg);
            setLegs(newLegList);
          }}
        >
          <div className="row align-items-end">
            <div className="col-12 col-md-4">
              <label htmlFor="kind" className="form-label">
                {t("freight-transport-mode")}
              </label>
              <select
                className="form-select"
                id="kind"
                onChange={(event) => changeKind(event.target.value)}
                value={currKind}
              >
                <option value="freight_vehicle-vehicle_type-hgv_refrig-fuel_source_diesel-vehicle_weight_na-percentage_load_100">
                  {t("freight-car")}
                </option>
                <option value="freight_train-route_type_domestic-fuel_type_diesel">
                  {t("freight-train")}
                </option>
                <option value="freight_flight-route_type_domestic-distance_gt_1000km_lt_3500km-weight_gt_100t-rf_included">
                  {t("freight-airport")}
                </option>
                <option value="sea_freight-vessel_type_bulk_carrier-route_type_na-vessel_length_na-tonnage_gt_100000dwt_lt_199999dwt-fuel_source_na">
                  {t("freight-ship")}
                </option>
              </select>
            </div>
            <>
              <FormField
                label={t("freight-distance")}
                id="distance"
                type="number"
                initValue="1"
                getValidationInfoField={handleValidation}
              ></FormField>
              <FormField
                label={t("freight-weight")}
                id="weight"
                type="number"
                initValue="1"
                getValidationInfoField={handleValidation}
              ></FormField>
            </>

            <div className="col col-md-2 d-grid">
              <button type="submit" className="btn btn-primary text-light">
                {t("btn-add")}
              </button>
            </div>
          </div>
        </form>

        <div className="row mt-3">
          <div className="col">
            <table className="table table-striped mb-0">
              <tbody>
                {legs.map((leg) => (
                  <FreightFormLeg
                    leg={leg}
                    key={leg.id}
                    handleRemove={handleRemoveItem}
                  ></FreightFormLeg>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(event) => {
                event.preventDefault();
                setLegs([]);
              }}
            >
              {t("btn-reset")}
            </button>
          </div>
          <div className="col text-end">
            <button
              type="button"
              className="btn btn-primary text-light"
              onClick={(event) => {
                event.preventDefault();
                const resultHeading =
                  window.document.getElementById("resultHeading");
                if (resultHeading !== null) {
                  resultHeading.scrollIntoView();
                }
                handleEvaluation();
              }}
            >
              {t("btn-evaluate")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreightForm;
