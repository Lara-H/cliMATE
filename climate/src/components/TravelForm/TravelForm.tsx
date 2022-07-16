import React, { FC, useEffect, useState } from "react";
import FormArea from '../FormArea/FormArea';
import styles from './TravelForm.module.scss';
import { useTranslation } from "react-i18next";
import TravelFormLeg, { TravelLeg } from "../TravelFormLeg/TravelFormLeg";
import FormField from "../FormField/FormField";
import { v4 as uuid } from 'uuid';



interface TravelFormProps {
  result: Array<Object>,
  setResult: Function,
}

const TravelForm: FC<TravelFormProps> = ({
  result,
  setResult
}) => {
  const { t, i18n } = useTranslation();
  const [legs, setLegs] = useState<TravelLeg[]>([]);
  const [currKind, setCurrKind] = useState(
    // seit initial state to car-emission.
    "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na"
  );

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
    const passengersInput = document.getElementById(
      "people"
    ) as HTMLInputElement;
    const distanceInput = document.getElementById(
      "distance"
    ) as HTMLInputElement;
    const vehiclesInput = document.getElementById(
      "vehicles"
    ) as HTMLInputElement;

                
    let newLeg:TravelLeg;
    // Switch: Which kind of Leg is being chosen?
    switch (kindSelect.value) {
      case "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na":
        // Case: Travel by car.
        newLeg = {
          id: uuid(),
          type: kindSelect.value,
          passengers: 0,
          distance: parseInt(distanceInput.value),
          vehicles: parseInt(vehiclesInput.value)
        };
        break;
      case "passenger_train-route_type_commuter_rail-fuel_source_na":
        // Case: Travel by train.
        newLeg = {
          id: uuid(),
          type: kindSelect.value,
          passengers: parseInt(passengersInput.value),
          distance: parseInt(distanceInput.value),
          vehicles: 0
        };
        break;
      case "passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included":
        // Case: Travel by flight.
        newLeg = {
          id: uuid(),
          type: kindSelect.value,
          passengers: parseInt(passengersInput.value),
          distance: parseInt(distanceInput.value),
          vehicles: 0
        };
        break;
      case "passenger_ferry-route_type_car_passenger-fuel_source_na":
        // Travel by ferry.
        newLeg = {
          id: uuid(),
          type: kindSelect.value,
          passengers: parseInt(passengersInput.value),
          distance: parseInt(distanceInput.value),
          vehicles: 0
        };
        break;
      default:
        // default to an init state.
        newLeg = {
          id: uuid(),
          type: "",
          passengers: 0,
          distance: 0,
          vehicles: 0
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
        parameters: { distance: leg.distance, distance_unit: "km" },
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
      .then((data) => setResult(data.results));
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
            <h2 className="mb-0">{t("travel")}</h2>
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
                {t("travel-transport-mode")}
              </label>
              <select
                className="form-select"
                id="kind"
                onChange={(event) => changeKind(event.target.value)}
                value={currKind}
              >
                <option value="passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na">
                  {t("travel-car")}
                </option>
                <option value="passenger_train-route_type_commuter_rail-fuel_source_na">
                  {t("travel-train")}
                </option>
                <option value="passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included">
                  {t("travel-airport")}
                </option>
                <option value="passenger_ferry-route_type_car_passenger-fuel_source_na">
                  {t("travel-ship")}
                </option>
              </select>
            </div>
    
            {(() => {
              if (
                currKind ==
                "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na"
              ) {
                return (
                  <>
                    <FormField
                      label={t("travel-distance")}
                      id="distance"
                      type="number"
                      value="0"
                    ></FormField>
                    <FormField
                      label={t("travel-carNumber")}
                      id="vehicles"
                      type="number"
                      value="0"
                    ></FormField>
                  </>
                );
              } else if (
                currKind ==
                "passenger_train-route_type_commuter_rail-fuel_source_na"
              ) {
                return (
                  <>
                    <FormField
                      label={t("travel-distance")}
                      id="distance"
                      type="number"
                      value="0"
                    ></FormField>
                    <FormField
                      label={t("travel-passengerNumber")}
                      id="people"
                      type="number"
                      value="0"
                    ></FormField>
                  </>
                );
              } else if (
                currKind ==
                "passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included"
              ) {
                return (
                  <>
                    <FormField
                      label={t("travel-departureAirport")}
                      id="departureAirport"
                      type="text"
                      value="JFK"
                    ></FormField>
                    <FormField
                      label={t("travel-arrivalAirport")}
                      id="arrivalAirport"
                      type="text"
                      value="NYC"
                    ></FormField>
                    <FormField
                      label={t("travel-passengerNumber")}
                      id="people"
                      type="number"
                      value="0"
                    ></FormField>
                  </>
                );
              } else if (
                currKind ==
                "passenger_ferry-route_type_car_passenger-fuel_source_na"
              ) {
                return (
                  <>
                    <FormField
                      label={t("travel-distance")}
                      id="distance"
                      type="number"
                      value="0"
                    ></FormField>
                    <FormField
                      label={t("travel-passengerNumber")}
                      id="people"
                      type="number"
                      value="0"
                    ></FormField>
                  </>
                );
              }
            })()}

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
                  <TravelFormLeg
                    leg={leg}
                    key={leg.id}
                    handleRemove={handleRemoveItem}
                  ></TravelFormLeg>
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
};

export default TravelForm;
