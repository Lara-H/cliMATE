import React, { FC, useEffect, useState } from "react";
import styles from "./HouseholdForm.module.scss";
import { useTranslation } from "react-i18next";
import FormField from "../FormField/FormField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faTrashAlt, faShirt } from "@fortawesome/free-solid-svg-icons";

interface HouseholdFormProps {
  result: Array<Object>;
  setResult: Function;
}

interface APIResponse {
  co2e: number;
  co2e_unit: string;
  co2e_calculation_method: string;
  co2e_calculation_origin: string;
  emission_factor: {
    activity_id: string;
    uuid: string;
    id: string;
    access_type: string;
    source: string;
    year: string;
    region: string;
    category: string;
    lca_activity: string;
    data_quality_flags: [];
  };
  constituent_gases: {
    co2e_total: number;
    co2e_other: number;
    co2: number;
    ch4: number;
    n2o: number;
  };
}

const HouseholdForm: FC<HouseholdFormProps> = ({ result, setResult }) => {
  const { t, i18n } = useTranslation();
  const [powerConsumptionResult, setPowerConsumptionResult] = useState<
    APIResponse | undefined
  >(undefined);
  const [wasteProductionResult, setWasteProductionResult] = useState<
    APIResponse | undefined
  >(undefined);
  const [clothesBoughtResult, setClothesBoughtResult] = useState<
    APIResponse | undefined
  >(undefined);
  const [valide, setValide] = useState({
    consumption: true,
    waste: true,
    clothing: true,
  });

  /**
   * funcionality to fetch data for Power-Consumption from the API.
   */
  function evalPowerConsumption(isValid : boolean) {
    if (isValid) {
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
          //setPowerConsumptionResult(data.co2e.toFixed(2))
          setPowerConsumptionResult(data)
        );
    }
  }

  /**
   * funcionality to fetch data for Waste-Production from the API.
   */
  function evalWasteProduction(isValid : boolean) {
    if (isValid) {
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
        .then((data) =>
          //setWasteProductionResult(data.co2e.toFixed(2)));
          setWasteProductionResult(data)
        );
    }
  }

  /**
   * funcionality to fetch data for Clothes-Bought from the API.
   */
  function evalClothesBought(isValid : boolean) {
    if (isValid) {
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
        .then((data) =>
          //setClothesBoughtResult(data.co2e.toFixed(2)));
          setClothesBoughtResult(data)
        );
    }
  }

  /**
   * combine all the data on this form and make a Result for ResultArea out of it.
   */
  function handleFinalEvaluation() {
    setResult([
      powerConsumptionResult,
      wasteProductionResult,
      clothesBoughtResult,
    ]);
  }

  /**
   * check if valide
   */
  function handleValidation(id: string, isValide: boolean) {
    switch (id) {
      case "consumption":
        setValide({
          consumption: isValide,
          waste: valide.waste,
          clothing: valide.clothing,
        });
        evalPowerConsumption(isValide);
        break;
      case "waste":
        setValide({
          consumption: valide.consumption,
          waste: isValide,
          clothing: valide.clothing,
        });
        evalWasteProduction(isValide);
        break;
      case "clothing":
        setValide({
          consumption: valide.consumption,
          waste: valide.waste,
          clothing: isValide,
        });
        evalClothesBought(isValide);
        break;
      default:
        setValide({
          consumption: valide.consumption,
          waste: valide.waste,
          clothing: valide.clothing,
        });
    }
  }

  function clearForm(){
    setPowerConsumptionResult(undefined);
    setWasteProductionResult(undefined);
    setClothesBoughtResult(undefined);
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
                    allowNull
                    getValidationInfoField={handleValidation}
                  ></FormField>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item response-area">
                    <div id="power-consumption-response" className="text-end">
                      {powerConsumptionResult?.co2e.toFixed(2)}
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
                    allowNull
                    getValidationInfoField={handleValidation}
                  ></FormField>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div id="waste-response" className="text-end">
                      {wasteProductionResult?.co2e.toFixed(2)}
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
                    allowNull
                    getValidationInfoField={handleValidation}
                  ></FormField>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div id="clothes-bought-response" className="text-end">
                      {clothesBoughtResult?.co2e.toFixed(2)}
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
                clearForm();
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
                if(powerConsumptionResult !== undefined || wasteProductionResult !== undefined || clothesBoughtResult !== undefined) {
                  handleFinalEvaluation();
                }
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
