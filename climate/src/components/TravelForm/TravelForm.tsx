import React, { FC, SetStateAction, useEffect, useState } from "react";
import styles from "./TravelForm.module.scss";
import { useTranslation } from "react-i18next";
import TravelFormLeg, { TravelLeg } from "../TravelFormLeg/TravelFormLeg";
import { v4 as uuid } from "uuid";
import TravelFormRow from "../TravelFormRow/TravelFormRow";
import Alert from "react-bootstrap/Alert";

interface TravelFormProps {
  result: Array<Object>;
  setResult: Function;
}

const TravelForm: FC<TravelFormProps> = ({ result, setResult }) => {
  const { t, i18n } = useTranslation();
  const [legs, setLegs] = useState<TravelLeg[]>([]);
  const [isValid, setValid] = useState({
    people: true,
    distance: true,
    vehicles: true,
  });
  const [show, setShow] = useState(false);

  // API strings for transport-mode
  const carAPIstring =
    "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na";
  const trainAPIstring =
    "passenger_train-route_type_commuter_rail-fuel_source_na";
  const airplaneAPIstring =
    "passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included";
  const shipAPIstring =
    "passenger_ferry-route_type_car_passenger-fuel_source_na";

  const [transportMode, setTransportMode] = useState(carAPIstring);

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
   * add a Leg-Object (based on all input-fields) if form is valid
   */
  function addNewLeg() {
    let isFormValid = true;

    let people = 0;
    const peopleSelect = document.getElementById("people") as HTMLInputElement;
    if (peopleSelect !== null) {
      if (!isValid.people) {
        isFormValid = false;
      } else {
        people = parseInt(peopleSelect.value);
      }
    }
    let distance = 0;
    const distanceSelect = document.getElementById(
      "distance"
    ) as HTMLInputElement;
    if (distanceSelect !== null) {
      if (!isValid.distance) {
        isFormValid = false;
      } else {
        distance = parseInt(distanceSelect.value);
      }
    }
    let vehicles = 0;
    const vehiclesSelect = document.getElementById(
      "vehicles"
    ) as HTMLInputElement;
    if (vehiclesSelect !== null) {
      if (!isValid.vehicles) {
        isFormValid = false;
      } else {
        vehicles = parseInt(vehiclesSelect.value);
      }
    }

    let departureAirport = "";
    const departureAirportInput = document.getElementById(
      "departureAirport"
    ) as HTMLInputElement;
    if (departureAirportInput !== null) {
      // TODO: Validierung implementieren
      //if (!isValid.departureAirport) {
        //isFormValid = false;
      //} else {
        departureAirport = departureAirportInput.value;
      //}
    }

    let arrivalAirport = "";
    const arrivalAirportInput = document.getElementById(
      "arrivalAirport"
    ) as HTMLInputElement;
    if (arrivalAirportInput !== null) {
      //if (!isValid.arrivalAirport) {
      //  isFormValid = false;
      //} else {
        arrivalAirport = arrivalAirportInput.value;
      //}
    }

    if (isFormValid) {
      let newLeg = {
        id: uuid(),
        type: transportMode,
        passengers: people,
        distance: distance,
        vehicles: vehicles,
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport
      };
      const newLegList = legs.concat(newLeg);
      setLegs(newLegList);
      setShow(false);
    } else {
      setShow(true);
    }
  }

  /**
   * parse all legs into a JSON-Object and send it as body to the API. If the response is positively, set the result state to the response.
   */
  function handleEvaluation() {
    var evalBody: any[] = [];
    var evalBodyFlights: any[] = [];

    legs.forEach((leg) => {
      // parse the leg-object into a fitting format for the Climatiq-API.
      switch (leg.type) {
        case carAPIstring:
          const carLegJson = {
            emission_factor: leg.type,
            parameters: { distance: leg.distance, distance_unit: "km", passengers:leg.vehicles },
          };
          // Add it to evalBody
          evalBody.push(carLegJson);
          break;
        case trainAPIstring:
          const trainLegJson = {
            emission_factor: leg.type,
            parameters: { distance: leg.distance, distance_unit: "km", passengers:leg.passengers },
          };
          // Add it to evalBody
          evalBody.push(trainLegJson);
          break;
        case airplaneAPIstring:
          const airplaneLegJson = {
            from: leg.departureAirport, to: leg.arrivalAirport, passengers:leg.passengers,
          };
          // Add it to evalBody
          evalBodyFlights.push(airplaneLegJson);
          break;
        case shipAPIstring:
          const shipLegJson = {
            emission_factor: leg.type,
            parameters: { distance: leg.distance, distance_unit: "km", passengers:leg.passengers },
          };
          // Add it to evalBody
          evalBody.push(shipLegJson);
          break;
        default:
          var legJson = {
            emission_factor: leg.type,
            parameters: { distance: leg.distance, distance_unit: "km" },
          };
          break;
      }
      

    });

    console.log(evalBody);

    if(evalBodyFlights != []){
      // fetch from the Climatiq-Flights-Endpoint
      fetch("https://beta3.api.climatiq.io/travel/flights", {
        method: "POST",
        headers: {
          Authorization: `Bearer VV5MNGFFJ0MF2DN921WJ93W84AQZ`,
        },
        body: '{"legs" :' + JSON.stringify(evalBodyFlights) + '}',
      })
      // transform the response to json...
      .then((res) => res.json())
      // ...and set the State-Variable result to data.results.
      //.then((data) => setResult(data.results));
    }
    
    if(evalBody != []) {
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
  }

  return (
    <div className={`${styles.TravelForm} bg-light`} data-testid="TravelForm">
      <span className="cm-anchor" id="FormArea"></span>

      <div className="container">
        <div className="row align-items-baseline">
          <div className="col-12 col-md">
            <h2 className="mb-0">{t("travel")}</h2>
          </div>
          <div className="col-12 col-md text-md-end">
            <a href="#FormSelector">{t("btn-change")}</a>
          </div>
        </div>
        <hr></hr>

        <Alert
          className={`${show ? "d-block" : "d-none"}`}
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          {t("error-alert")}
        </Alert>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            addNewLeg();
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
                onChange={(event) => setTransportMode(event.target.value)}
                value={transportMode}
              >
                <option value={carAPIstring}>{t("travel-car")}</option>
                <option value={trainAPIstring}>{t("travel-train")}</option>
                <option value={airplaneAPIstring}>{t("travel-airport")}</option>
                <option value={shipAPIstring}>{t("travel-ship")}</option>
              </select>
            </div>
            <div className="col-12 col-md">
              <TravelFormRow
                currKind={transportMode}
                getValidationInfoRow={(
                  people: boolean,
                  distance: boolean,
                  vehicles: boolean
                ) =>
                  setValid({
                    people: people,
                    distance: distance,
                    vehicles: vehicles,
                  })
                }
              ></TravelFormRow>
            </div>
            <div className="col col-md-2 d-grid">
              <button type="submit" className="btn btn-primary text-light mt-4">
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
                setResult([]);
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
