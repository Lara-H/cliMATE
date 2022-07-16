import React, { FC, useEffect, useState } from "react";
import styles from './HouseholdForm.module.scss';
import { useTranslation } from "react-i18next";
import FormField from "../FormField/FormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faTrashAlt,
  faShirt
} from "@fortawesome/free-solid-svg-icons";

interface HouseholdFormProps {
  result: Array<Object>;
  setResult: Function;
}

const HouseholdForm: FC<HouseholdFormProps> = ({ result, setResult}) => {
  const { t, i18n } = useTranslation();
  const [powerConsumptionResult, setPowerConsumptionResult] = useState("");
  const [wasteProductionResult, setWasteProductionResult] = useState("");
  const [clothesBoughtResult, setClothesBoughtResult] = useState("");

  const [valide, setValide] = useState({
    people: true,
    distance: true,
    vehicles: true,
  });

  /**
   * funcionality to fetch data for Power-Consumption from the API.
   */
  function evalPowerConsumption() {
    const powerConsumptionInput = document.getElementById(
      "consumption"
    ) as HTMLInputElement;
    
    const powerConsumption = parseInt(powerConsumptionInput.value);

    // parse the leg-object into a fitting format for the Climatiq-API.
    const legJson = {
      emission_factor: "electricity-energy_source_coal_fired_plant",
      parameters: { energy: powerConsumption, energy_unit: "kWh" },
    };
    // fetch from the Climatiq-Batch-Endpoint
    fetch("https://beta3.api.climatiq.io/estimate", {
      method: "POST",
      headers: {
        Authorization: `Bearer VV5MNGFFJ0MF2DN921WJ93W84AQZ`,
      },
      // transfer our evalBody-Array via body to Climatiq.
      body: JSON.stringify(legJson),
    })
      // transform the response to json...
      .then((res) => res.json())
      // ...and set the State-Variable result to data.results.
      .then((data) =>
      setPowerConsumptionResult(data.co2e.toFixed(2))
      );
  }

  /**
   * funcionality to fetch data for Waste-Production from the API.
   */
  function evalWasteProduction() {
    const wasteProductionInput = document.getElementById(
      "waste"
    ) as HTMLInputElement;

    const wasteProduction = parseInt(wasteProductionInput.value);

    // parse the leg-object into a fitting format for the Climatiq-API.
    const legJson = {
      emission_factor: "waste_type_books-disposal_method_closed_loop",
      parameters: { weight: wasteProduction, weight_unit: "kg" },
    };
    // fetch from the Climatiq-Batch-Endpoint
    fetch("https://beta3.api.climatiq.io/estimate", {
      method: "POST",
      headers: {
        Authorization: `Bearer VV5MNGFFJ0MF2DN921WJ93W84AQZ`,
      },
      // transfer our evalBody-Array via body to Climatiq.
      body: JSON.stringify(legJson),
    })
      // transform the response to json...
      .then((res) => res.json())
      // ...and set the State-Variable result to data.results.
      .then((data) => setWasteProductionResult(data.co2e.toFixed(2)));
  }

  /**
   * funcionality to fetch data for Clothes-Bought from the API.
   */
  function evalClothesBought() {
    const clothesPriceInput = document.getElementById(
      "clothing"
    ) as HTMLInputElement;

    const clothesPrice = parseInt(clothesPriceInput.value);

    // parse the leg-object into a fitting format for the Climatiq-API.
    const legJson = {
      emission_factor: "consumer_goods-type_clothing",
      parameters: { money: clothesPrice, money_unit: "eur" },
    };
    // fetch from the Climatiq-Batch-Endpoint
    fetch("https://beta3.api.climatiq.io/estimate", {
      method: "POST",
      headers: {
        Authorization: `Bearer VV5MNGFFJ0MF2DN921WJ93W84AQZ`,
      },
      // transfer our evalBody-Array via body to Climatiq.
      body: JSON.stringify(legJson),
    })
      // transform the response to json...
      .then((res) => res.json())
      // ...and set the State-Variable result to data.results.
      .then((data) => setClothesBoughtResult(data.co2e.toFixed(2)));
  }

  /**
   * combine all the data on this form and make a Result for ResultArea out of it.
   */
  function handleFinalEvaluation() {
    console.log("finalEval clicked");

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
            <h2 className="mb-0">{t("household")}</h2>
          </div>
          <div className="col text-end">
            <a href="#FormSelector">{t("btn-change")}</a>
          </div>
        </div>
        <hr></hr>

        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <form>
                <div className={[styles.cardBody, "cardBody"].join(" ")}>
                  <legend>{t("household-power-consumption")}</legend>
                  <FormField
                    label={t("household-power-consumption-label")}
                    id="consumption"
                    type="number"
                    initValue="0"
                    getValidationInfoField={handleValidation}
                  ></FormField>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <button
                      type="button"
                      className="btn btn-primary text-light"
                      onClick={(event) => {
                        event.preventDefault();
                        evalPowerConsumption();
                      }}
                    >{t("btn-calculate")}</button>
                  </li>
                  <li className="list-group-item response-area">
                    <div id="power-consumption-response" className="text-end">
                      {powerConsumptionResult}
                    </div>
                  </li>
                </ul>
              </form>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
            <form>
                <div className={[styles.cardBody, "cardBody"].join(" ")}>
                  <legend>{t("household-waste")}</legend>
                  <FormField
                    label={t("household-waste-label")}
                    id="waste"
                    type="number"
                    initValue="0"
                    getValidationInfoField={handleValidation}
                  ></FormField>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <button
                      type="button"
                      className="btn btn-primary text-light"
                      onClick={(event) => {
                        event.preventDefault();
                        evalWasteProduction();
                      }}
                    >{t("btn-calculate")}</button>
                  </li>
                  <li className="list-group-item">
                    <div id="waste-response" className="text-end">
                      {wasteProductionResult}
                    </div>
                  </li>
                </ul>
              </form>
            </div>
          </div>
          <div className="col-sm-4">
          <div className="card">
          <form>
                <div className={[styles.cardBody, "cardBody"].join(" ")}>
                  <legend>{t("household-clothing")}</legend>
                  <FormField
                    label={t("household-clothing-label")}
                    id="clothing"
                    type="number"
                    initValue="0"
                    getValidationInfoField={handleValidation}
                  ></FormField>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <button
                      type="button"
                      className="btn btn-primary text-light"
                      onClick={(event) => {
                        event.preventDefault();
                        evalClothesBought();
                      }}
                    >{t("btn-calculate")}</button>
                  </li>
                  <li className="list-group-item">
                    <div id="clothes-bought-response" className="text-end">
                      {clothesBoughtResult}
                    </div>
                  </li>
                </ul>
              </form>
            </div>
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
                // TODO: clearForm() implementieren
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
                handleFinalEvaluation();
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

export default HouseholdForm;
