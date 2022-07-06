import { setDefaultResultOrder } from "dns";
import React, { FC, useEffect, useState } from "react";
import { Z_ASCII } from "zlib";
import FormLeg, { Leg } from "../FormLeg/FormLeg";
import FormLegStories from "../FormLeg/FormLeg.stories";
import styles from "./FormArea.module.scss";
import { useTranslation } from "react-i18next";

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
            <h2 className="mb-0">{t('travel')}</h2>
          </div>
          <div className="col text-end">
            <a href="#">{t('btn-change')}</a>
          </div>
        </div>
        <hr></hr>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const kindSelect = document.getElementById(
              "kind"
            ) as HTMLInputElement;
            const peopleSelect = document.getElementById( //TODO: Nicht nur für "people" sondern auch für andere Formularfeldtypen verarbeiten
              "people"
            ) as HTMLInputElement;
            const newLeg = {
              id: "" + (legs.length + 1),
              type: kindSelect.value,
              passengers: peopleSelect.value as unknown as number,
              distance: 50,
            };
            const newLegList = legs.concat(newLeg);
            setLegs(newLegList);
          }}
        >
          <div className="row align-items-end">
            <div className="col-12 col-md">
              <label htmlFor="kind" className="form-label">
              {t('travel-transport-mode')}
              </label>
              <select
                className="form-select"
                id="kind"
                onChange={(event) => changeKind(event.target.value)}
                value={currKind}
              >
                <option value="passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na">
                {t('travel-car')}
                </option>
                <option value="passenger_train-route_type_commuter_rail-fuel_source_na">
                {t('travel-train')}
                </option>
                <option value="passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included">
                {t('travel-airport')}
                </option>
                <option value="passenger_ferry-route_type_car_passenger-fuel_source_na">
                {t('travel-ship')}
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
                    <div className="col-6 col-md" dangerouslySetInnerHTML={{ __html: formFields.distance }} />
                    <div className="col-6 col-md" dangerouslySetInnerHTML={{ __html: formFields.vehicles }} />
                  </>
                );
              } else if (
                currKind ==
                "passenger_train-route_type_commuter_rail-fuel_source_na"
              ) {
                return (
                  <>
                    <div className="col-6 col-md" dangerouslySetInnerHTML={{ __html: formFields.distance }} />
                    <div className="col-6 col-md" dangerouslySetInnerHTML={{ __html: formFields.people }} />
                  </>
                );
              } else if (
                currKind ==
                "passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included"
              ) {
                return (
                  <>
                    <div className="col-6 col-md" dangerouslySetInnerHTML={{ __html: formFields.departureAirport }} />
                    <div className="col-6 col-md" dangerouslySetInnerHTML={{ __html: formFields.arrivalAirport }} />
                    <div className="col-6 col-md" dangerouslySetInnerHTML={{ __html: formFields.people }} />
                  </>
                );
              } else if (
                currKind ==
                "passenger_ferry-route_type_car_passenger-fuel_source_na"
              ) {
                return (
                  <>
                    <div className="col-6 col-md" dangerouslySetInnerHTML={{ __html: formFields.distance }} />
                    <div className="col-6 col-md" dangerouslySetInnerHTML={{ __html: formFields.people }} />
                  </>
                );
              }
            })()}

            <div className="col col-md-2 d-grid">
              <button type="submit" className="btn btn-primary text-light">
              {t('btn-add')}
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
              {t('btn-reset')}
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
              {t('btn-evaluate')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO: Styling 
const formFields = {
  distance: `
  <label htmlFor="distance" className="form-label">
  {t('travel-distance')}
  </label><br>
  <input
    type="number"
    className="form-control"
    id="distance"
    defaultValue="2"
    min="1"
  />
  `,
  departureAirport: `
  <label htmlFor="departureAirport" className="form-label">
  {t('travel-departureAirport')}
  </label><br>
  <input
    type="text"
    className="form-control"
    id="departureAirport"
    defaultValue="2"
    min="1"
  />
  `,
  arrivalAirport: `
  <label htmlFor="arrivalAirport" className="form-label">
  {t('travel-arrivalAirport')}
  </label><br>
  <input
    type="text"
    className="form-control"
    id="arrivalAirport"
    defaultValue="2"
    min="1"
  />
  `,
  people: `
  <label htmlFor="people" className="form-label">
  {t('travel-passengerNumber')}
  </label><br>
  <input
    type="number"
    className="form-control"
    id="people"
    defaultValue="2"
    min="1"
  />
  `,
  vehicles: `
  <label htmlFor="vehicles" className="form-label">
  {t('travel-carNumber')}
  </label><br>
  <input
    type="number"
    className="form-control"
    id="vehicles"
    defaultValue="2"
    min="1"
  />
  `,
};

export default FormArea;
