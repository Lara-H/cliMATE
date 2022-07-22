import React, { FC, useEffect, useState } from "react";
import FreightFormLeg, { FreightLeg } from "../FreightFormLeg/FreightFormLeg";
import styles from "./FreightForm.module.scss";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import { Alert } from "react-bootstrap";
import FreightFormRow from "../FreightFormRow/FreightFormRow";

interface FreightFormProps {
  result: Array<Object>;
  setResult: Function;
}

const FreightForm: FC<FreightFormProps> = ({ result, setResult }) => {
  const { t } = useTranslation();
  const localDataLegs = localStorage.getItem("freightLegs");
  const [legs, setLegs] = useState<FreightLeg[]>(
    localDataLegs ? JSON.parse(localDataLegs) : []
  );
  const [isValid, setValid] = useState({
    distance: true,
    weight: true,
  });
  const [show, setShow] = useState(false);

  // API strings for transport-mode
  const carAPIstring =
    "freight_vehicle-vehicle_type-hgv_refrig-fuel_source_diesel-vehicle_weight_na-percentage_load_100";
  const trainAPIstring = "freight_train-route_type_domestic-fuel_type_diesel";
  const airplaneAPIstring =
    "freight_flight-route_type_domestic-distance_gt_1000km_lt_3500km-weight_gt_100t-rf_included";
  const shipAPIstring =
    "sea_freight-vessel_type_bulk_carrier-route_type_na-vessel_length_na-tonnage_gt_100000dwt_lt_199999dwt-fuel_source_na";

  const [transportMode, setTransportMode] = useState(carAPIstring);

  // Update LocalStorage
  useEffect(() => {
    localStorage.setItem("freightLegs", JSON.stringify(legs));
  });

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
   * update leg-list after edit
   * @param leg
   */
  function handleEditItem(leg: FreightLeg) {
    for (let i in legs) {
      if (leg.id === legs[i].id) {
        legs[i] = leg;
      }
    }
    localStorage.setItem("freightLegs", JSON.stringify(legs));
  }

  /**
   * add a Leg-Object (based on all input-fields) if form is valid
   */
  function addNewLeg() {
    let isFormValid = true;

    let weight = 0;
    const weightSelect = document.getElementById("weight") as HTMLInputElement;
    if (weightSelect !== null) {
      if (!isValid.weight) {
        isFormValid = false;
      } else {
        weight = parseInt(weightSelect.value);
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

    if (isFormValid) {
      let newLeg = {
        id: uuid(),
        type: transportMode,
        distance: distance,
        weight: weight,
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
    legs.forEach((leg) => {
      // parse the leg-object into a fitting format for the Climatiq-API.
      const legJson = {
        emission_factor: leg.type,
        parameters: {
          distance: leg.distance,
          distance_unit: "km",
          weight: leg.weight,
          weight_unit: "t",
        },
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
      id="freightFormDiv"
      className={`${styles.FreightForm} bg-light`}
      data-testid="FreightForm"
    >
      <span className="cm-anchor" id="FormArea"></span>

      <div className="container">
        <div className="row align-items-baseline">
          <div className="col-12 col-md">
            <h2 className="mb-0">{t("freight")}</h2>
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
                {t("freight-transport-mode")}
              </label>
              <select
                className="form-select"
                id="kind"
                onChange={(event) => setTransportMode(event.target.value)}
                value={transportMode}
              >
                <option value={carAPIstring}>{t("freight-car")}</option>
                <option value={trainAPIstring}>{t("freight-train")}</option>
                <option value={airplaneAPIstring}>
                  {t("freight-airport")}
                </option>
                <option value={shipAPIstring}>{t("freight-ship")}</option>
              </select>
            </div>

            <div className="col-12 col-md">
              <FreightFormRow
                currKind={transportMode}
                getValidationInfoRow={(distance: boolean, weight: boolean) =>
                  setValid({
                    distance: distance,
                    weight: weight,
                  })
                }
              ></FreightFormRow>
            </div>

            <div className="col col-md-2 d-grid">
              <button
                id="addFreightLegButton"
                type="submit"
                className="btn btn-primary text-light mt-4"
              >
                {t("btn-add")}
              </button>
            </div>
          </div>
        </form>

        <div className="row mt-3">
          <div className="col">
            <table
              id="freightFormLegTable"
              className="table table-striped mb-0"
            >
              <tbody>
                {legs.map((leg) => (
                  <FreightFormLeg
                    leg={leg}
                    key={leg.id}
                    handleRemove={handleRemoveItem}
                    handleEdit={handleEditItem}
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
              id="freightFormResetButton"
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
              id="evaluateFreightButton"
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

export default FreightForm;