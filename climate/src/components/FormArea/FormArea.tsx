import { setDefaultResultOrder } from "dns";
import React, { FC, useEffect, useState } from "react";
import { Z_ASCII } from "zlib";
import FormLeg, { Leg } from "../FormLeg/FormLeg";
import styles from "./FormArea.module.scss";
import { useTranslation } from "react-i18next";
import FormField from "../FormField/FormField";
import { v4 as uuid } from 'uuid';



interface FormAreaProps {
  result: Array<Object>;
  setResult: Function;
  children: React.ReactNode;
}

const FormArea: FC<FormAreaProps> = ({ result, setResult }) => {
  const { t, i18n } = useTranslation();
  const [legs, setLegs] = useState<Leg[]>([]);
  const [currKind, setCurrKind] = useState(
    "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na"
  );

  /**
   * set new current kind when changing selected value in selectbox
   */
  const changeKind = (newValue: string) => {
    console.log(newValue);
    setCurrKind(newValue);
  };

  /**
   * functionality to delete an item with given id from our legs-state.
   * @param id
   */
  function handleRemoveItem(id: string) {
    const newLegs = legs.filter((item) => item.id !== id);
    setLegs(newLegs);
  }

  /**
   * parse all legs into a JSON-Object and send it as body to the API. If the response is positively, set the result state to the response.
   */
  function handleEvaluation() {
    var evalBody: any[] = [];
    console.log(legs);
    legs.forEach((leg) => {
      const legJson = {
        emission_factor: leg.type,
        parameters: { distance: leg.distance, distance_unit: "km" },
      };
      evalBody.push(legJson);
    });

    //console.log(JSON.stringify(evalBody))

    fetch("https://beta3.api.climatiq.io/batch", {
      method: "POST",
      headers: {
        Authorization: `Bearer VV5MNGFFJ0MF2DN921WJ93W84AQZ`,
      },
      body: JSON.stringify(evalBody),
    })
      .then((res) => res.json())
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
            const kindSelect = document.getElementById(
              "kind"
            ) as HTMLInputElement;
            const peopleSelect = document.getElementById(
              //TODO: Nicht nur für "people" sondern auch für andere Formularfeldtypen verarbeiten
              "people"
            ) as HTMLInputElement;
            const distanceSelect = document.getElementById(
              "distance"
            ) as HTMLInputElement;
            const newLeg = {
              id: uuid(),
              type: kindSelect.value,
              passengers: peopleSelect.value as unknown as number,
              distance: parseInt(distanceSelect.value),
            };
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
                    ></FormField>
                    <FormField
                      label={t("travel-carNumber")}
                      id="vehicles"
                      type="number"
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
                    ></FormField>
                    <FormField
                      label={t("travel-passengerNumber")}
                      id="people"
                      type="number"
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
                    ></FormField>
                    <FormField
                      label={t("travel-arrivalAirport")}
                      id="arrivalAirport"
                      type="text"
                    ></FormField>
                    <FormField
                      label={t("travel-passengerNumber")}
                      id="people"
                      type="number"
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
                    ></FormField>
                    <FormField
                      label={t("travel-passengerNumber")}
                      id="people"
                      type="number"
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
                  <FormLeg
                    leg={leg}
                    key={leg.id}
                    handleRemove={handleRemoveItem}
                  ></FormLeg>
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

export default FormArea;
