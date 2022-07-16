import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import FormField from "../FormField/FormField";
import styles from "./TravelFormRow.module.scss";

interface FormRowProps {
  currKind: string;
  handleValidationValues: (
    people: boolean,
    distance: boolean,
    vehicles: boolean
  ) => void;
}

const FormRow: FC<FormRowProps> = ({ currKind, handleValidationValues }) => {
  const { t, i18n } = useTranslation();
  const [valide, setValide] = useState({
    people: true,
    distance: true,
    vehicles: true,
  });

  /**
   * check if valide
   */
  function handleValidation(id: string, isValide: boolean) {
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
      default:
        setValide({
          people: valide.people,
          distance: valide.distance,
          vehicles: valide.people,
        });
    }
    handleValidationValues(valide.people, valide.distance, valide.vehicles);
  }

  return (
    <div className={`${styles.TravelFormRow} row`} data-testid="FormRow">
      {(() => {
        switch (currKind) {
          case "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na":
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
                  label={t("travel-carNumber")}
                  id="vehicles"
                  type="number"
                  initValue="1"
                  handleValidation={handleValidation}
                ></FormField>
              </>
            );
          case "passenger_train-route_type_commuter_rail-fuel_source_na":
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
          case "passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included":
            return (
              <>
                <FormField
                  label={t("travel-departureAirport")}
                  id="departureAirport"
                  type="text"
                  initValue="JFK"
                  handleValidation={handleValidation}
                ></FormField>
                <FormField
                  label={t("travel-arrivalAirport")}
                  id="arrivalAirport"
                  type="text"
                  initValue="NYC"
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
          case "passenger_ferry-route_type_car_passenger-fuel_source_na":
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
    </div>
  );
};

export default FormRow;