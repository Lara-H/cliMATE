import { setDefaultResultOrder } from "dns";
import React, { FC, useEffect, useState } from "react";
import { Z_ASCII } from "zlib";
import TravelFormLeg, { TravelLeg } from "../TravelFormLeg/TravelFormLeg";
import styles from "./FormArea.module.scss";
import { useTranslation } from "react-i18next";
import FormField from "../FormField/FormField";
import { v4 as uuid, validate } from "uuid";
import { clear } from "console";

interface FormAreaProps {
  result: Array<Object>;
  setResult: Function;
  children: React.ReactNode;
}

const FormArea: FC<FormAreaProps> = ({ result, setResult }) => {
  const carAPIstring =
    "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na";
  const trainAPIstring =
    "passenger_train-route_type_commuter_rail-fuel_source_na";
  const airplaneAPIstring =
    "passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included";
  const shipAPIstring =
    "passenger_ferry-route_type_car_passenger-fuel_source_na";

  const { t, i18n } = useTranslation();
  const [legs, setLegs] = useState<TravelLeg[]>([]);
  const [currKind, setCurrKind] = useState(carAPIstring);
  const [valide, setValide] = useState({
    people: true,
    distance: true,
    vehicles: true,
  });

  /**
   * set new current kind when changing selected value in selectbox
   */
  const changeKind = (newValue: string) => {
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

  /**
   * add legs after validation
   */
  function handleSubmit() {
    let isValide = true;

    let people = 0;
    const peopleSelect = document.getElementById("people") as HTMLInputElement;
    if (peopleSelect !== null) {
      if (!valide.people) {
        isValide = false;
      } else {
        people = parseInt(peopleSelect.value);
      }
    }

    let distance = 0;
    const distanceSelect = document.getElementById(
      "distance"
    ) as HTMLInputElement;
    if (distanceSelect !== null) {
      if (!valide.distance) {
        isValide = false;
      } else {
        distance = parseInt(distanceSelect.value);
      }
    }

    let vehicles = 0;
    const vehiclesSelect = document.getElementById(
      "vehicles"
    ) as HTMLInputElement;
    if (vehiclesSelect !== null) {
      if (!valide.vehicles) {
        isValide = false;
      } else {
        vehicles = parseInt(vehiclesSelect.value);
      }
    }

    if (isValide) {
      let newLeg = {
        id: uuid(),
        type: currKind,
        passengers: people,
        distance: distance,
        vehicles: vehicles,
      };

      const newLegList = legs.concat(newLeg);
      setLegs(newLegList);
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
            handleSubmit();
          }}
        >
          <div className="row align-items-start">
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
                <option value={carAPIstring}>{t("travel-car")}</option>
                <option value={trainAPIstring}>{t("travel-train")}</option>
                <option value={airplaneAPIstring}>{t("travel-airport")}</option>
                <option value={shipAPIstring}>{t("travel-ship")}</option>
              </select>
            </div>

            {(() => {
              if (currKind == carAPIstring) {
                return (
                  <>
                    <FormField
                      label={t("travel-distance-km")}
                      id="distance"
                      type="number"
                      initValue={"2"}
                      handleValidation={handleValidation}
                    ></FormField>
                    <FormField
                      label={t("travel-carNumber")}
                      id="vehicles"
                      type="number"
                      initValue="2"
                      handleValidation={handleValidation}
                    ></FormField>
                  </>
                );
              } else if (currKind == trainAPIstring) {
                return (
                  <>
                    <FormField
                      label={t("travel-distance")}
                      id="distance"
                      type="number"
                      initValue="1"
                      handleValidation={handleValidation}
                    ></FormField>
                    <FormField
                      label={t("travel-passengerNumber")}
                      id="people"
                      type="number"
                      initValue="1"
                      handleValidation={handleValidation}
                    ></FormField>
                  </>
                );
              } else if (currKind == airplaneAPIstring) {
                return (
                  <>
                    <FormField
                      label={t("travel-departureAirport")}
                      id="departureAirport"
                      type="text"
                      initValue="FRA"
                      handleValidation={handleValidation}
                    ></FormField>
                    <FormField
                      label={t("travel-arrivalAirport")}
                      id="arrivalAirport"
                      type="text"
                      initValue="FRA"
                      handleValidation={handleValidation}
                    ></FormField>
                    <FormField
                      label={t("travel-passengerNumber")}
                      id="people"
                      type="number"
                      initValue="1"
                      handleValidation={handleValidation}
                    ></FormField>
                  </>
                );
              } else if (currKind == shipAPIstring) {
                return (
                  <>
                    <FormField
                      label={t("travel-distance")}
                      id="distance"
                      type="number"
                      initValue="1"
                      handleValidation={handleValidation}
                    ></FormField>
                    <FormField
                      label={t("travel-passengerNumber")}
                      id="people"
                      type="number"
                      initValue="1"
                      handleValidation={handleValidation}
                    ></FormField>
                  </>
                );
              }
            })()}

            <div className="col col-md-2 d-grid pt-4">
              <button type="submit" className="btn btn-primary text-light">
                {t("btn-add")}
              </button>
            </div>
          </div>
        </form>

        {(() => {
              if (legs.length > 0) {
                return (

        <div className="row mt-3">
          <div className="col">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>{t("travel-transport-mode")}</th>
                  <th>{t("travel-distance")}</th>
                  <th>{t("travel-number")}</th>
                </tr>
              </thead>
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

);
              }
            })()}


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

export default FormArea;
