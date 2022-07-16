import React, { FC, SetStateAction, useEffect, useState } from "react";
import styles from "./TravelForm.module.scss";
import { useTranslation } from "react-i18next";
import TravelFormLeg, { TravelLeg } from "../TravelFormLeg/TravelFormLeg";
import FormField from "../FormField/FormField";
import { v4 as uuid } from "uuid";
import FormRow from "../TravelFormRow/TravelFormRow";
import TravelFormRow from "../TravelFormRow/TravelFormRow";

interface TravelFormProps {
  result: Array<Object>;
  setResult: Function;
}

const TravelForm: FC<TravelFormProps> = ({ result, setResult }) => {
  
  const { t, i18n } = useTranslation();

  // API strings for transport-mode
  const carAPIstring =
    "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na";
  const trainAPIstring =
    "passenger_train-route_type_commuter_rail-fuel_source_na";
  const airplaneAPIstring =
    "passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included";
  const shipAPIstring =
    "passenger_ferry-route_type_car_passenger-fuel_source_na";

  // check if fields are valide
  const [valide, setValide] = useState({
    people: true,
    distance: true,
    vehicles: true,
  });

  // current leg list
  const [legs, setLegs] = useState<TravelLeg[]>([]);

  // current transport-mode
  const [currKind, setCurrKind] = useState(carAPIstring);

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
   * add a Leg-Object, based on all input-fields
   */
  function createNewLeg() {
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

  /**
   * parse all legs into a JSON-Object and send it as body to the API. If the response is positively, set the result state to the response.
   */
  function handleEvaluation() {
    var evalBody: any[] = [];

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
      className={[styles.TravelForm, "bg-light"].join(" ")}
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
            createNewLeg();
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
                onChange={(event) => setCurrKind(event.target.value)}
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

            <div className="col">
              <TravelFormRow
                currKind={currKind}
                getValidationInfoRow={(people: boolean,
                  distance: boolean,
                  vehicles: boolean) => setValide({ people: people, distance: distance, vehicles: vehicles })}
              ></TravelFormRow>
            </div>

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
                const resultArea = window.document.getElementById("ResultArea");
                if (resultArea !== null) {
                  resultArea.scrollIntoView();
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
