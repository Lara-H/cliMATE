import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import FormField from "../FormField/FormField";
import { TravelLeg } from "../TravelFormLeg/TravelFormLeg";
import styles from "./TravelFormRow.module.scss";

interface TravelFormRowProps {
  currKind: string;
  leg?: TravelLeg;
  getValidationInfoRow: (
    people: boolean,
    distance: boolean,
    vehicles: boolean,
    departureAirport: boolean,
    arrivalAirport: boolean
  ) => void;
}

const TravelFormRow: FC<TravelFormRowProps> = ({
  currKind,
  leg,
  getValidationInfoRow,
}) => {
  const { t, i18n } = useTranslation();
  const [isValid, setValid] = useState({
    people: true,
    distance: true,
    vehicles: true,
    departureAirport: true,
    arrivalAirport: true,
  });

  /**
   * sumarize validation-info of seperate fields
   * @param id 
   * @param isValide 
   */
  function generateValidationInfoRow(id: string, isValide: boolean) {
    switch (id) {
      case "people":
      case "people-edit":
        getValidationInfoRow(
          isValide,
          isValid.distance,
          isValid.vehicles,
          isValid.departureAirport,
          isValid.arrivalAirport
        );
        setValid({
          people: isValide,
          distance: isValid.distance,
          vehicles: isValid.vehicles,
          departureAirport: isValid.departureAirport,
          arrivalAirport: isValid.arrivalAirport,
        });
        break;
      case "distance":
      case "distance-edit":
        getValidationInfoRow(
          isValid.people,
          isValide,
          isValid.vehicles,
          isValid.departureAirport,
          isValid.arrivalAirport
        ); // send info if fields of row is valid to top component
        setValid({
          people: isValid.people,
          distance: isValide,
          vehicles: isValid.vehicles,
          departureAirport: isValid.departureAirport,
          arrivalAirport: isValid.arrivalAirport,
        });
        break;
      case "vehicles":
      case "vehicles-edit":
        getValidationInfoRow(
          isValid.people,
          isValid.distance,
          isValide,
          isValid.departureAirport,
          isValid.arrivalAirport
        ); // send info if fields of row is valid to top component
        setValid({
          people: isValid.people,
          distance: isValid.distance,
          vehicles: isValide,
          departureAirport: isValid.departureAirport,
          arrivalAirport: isValid.arrivalAirport,
        });
        break;
      case "departureAirport":
      case "departureAirport-edit":
        getValidationInfoRow(
          isValid.people,
          isValid.distance,
          isValid.vehicles,
          isValide,
          isValid.arrivalAirport
        ); // send info if fields of row is valid to top component
        setValid({
          people: isValid.people,
          distance: isValid.distance,
          vehicles: isValid.vehicles,
          departureAirport: isValide,
          arrivalAirport: isValid.arrivalAirport,
        });
        break;
      case "arrivalAirport":
      case "arrivalAirport-edit":
        getValidationInfoRow(
          isValid.people,
          isValid.distance,
          isValid.vehicles,
          isValid.departureAirport,
          isValide
        ); // send info if fields of row is valid to top component
        setValid({
          people: isValid.people,
          distance: isValid.distance,
          vehicles: isValid.vehicles,
          departureAirport: isValid.departureAirport,
          arrivalAirport: isValide,
        });
        break;
      default:
        setValid({
          people: isValid.people,
          distance: isValid.distance,
          vehicles: isValid.people,
          departureAirport: isValid.departureAirport,
          arrivalAirport: isValid.arrivalAirport,
        });
    }
  }

  return (
    <div className={`${styles.TravelFormRow} row`} data-testid="TravelFormRow">
      {(() => {
        switch (currKind) {
          case "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na":
            return (
              <>
                <FormField
                  label={t("travel-distance-km")}
                  id={leg ? "distance-edit" : "distance"}
                  type="number"
                  initValue={leg ? leg.distance.toString() : "1"}
                  getValidationInfoField={generateValidationInfoRow}
                ></FormField>
                <FormField
                  label={t("travel-carNumber")}
                  id={leg ? "vehicles-edit" : "vehicles"}
                  type="number"
                  initValue={leg ? leg.vehicles.toString() : "1"}
                  getValidationInfoField={generateValidationInfoRow}
                ></FormField>
              </>
            );
          case "passenger_train-route_type_commuter_rail-fuel_source_na":
            return (
              <>
                <FormField
                  label={t("travel-distance-km")}
                  id={leg ? "distance-edit" : "distance"}
                  type="number"
                  initValue={leg ? leg.distance.toString() : "1"}
                  getValidationInfoField={generateValidationInfoRow}
                ></FormField>
                <FormField
                  label={t("travel-passengerNumber")}
                  id={leg ? "people-edit" : "people"}
                  type="number"
                  initValue={leg ? leg.passengers.toString() : "1"}
                  getValidationInfoField={generateValidationInfoRow}
                ></FormField>
              </>
            );
          case "passenger_flight-route_type_domestic-aircraft_type_jet-distance_na-class_na-rf_included":
            return (
              <>
                <FormField
                  label={t("travel-departureAirport")}
                  id={leg ? "departureAirport-edit" : "departureAirport"}
                  type="text"
                  initValue={leg ? leg.departureAirport.toString() : "FRA"}
                  getValidationInfoField={generateValidationInfoRow}
                ></FormField>
                <FormField
                  label={t("travel-arrivalAirport")}
                  id={leg ? "arrivalAirport-edit" : "arrivalAirport"}
                  type="text"
                  initValue={leg ? leg.arrivalAirport.toString() : "DUB"}
                  getValidationInfoField={generateValidationInfoRow}
                ></FormField>
                <FormField
                  label={t("travel-passengerNumber")}
                  id={leg ? "people-edit" : "people"}
                  type="number"
                  initValue={leg ? leg.passengers.toString() : "1"}
                  getValidationInfoField={generateValidationInfoRow}
                ></FormField>
              </>
            );
          case "passenger_ferry-route_type_car_passenger-fuel_source_na":
            return (
              <>
                <FormField
                  label={t("travel-distance-km")}
                  id={leg ? "distance-edit" : "distance"}
                  type="number"
                  initValue={leg ? leg.distance.toString() : "1"}
                  getValidationInfoField={generateValidationInfoRow}
                ></FormField>
                <FormField
                  label={t("travel-passengerNumber")}
                  id={leg ? "people-edit" : "people"}
                  type="number"
                  initValue={leg ? leg.passengers.toString() : "1"}
                  getValidationInfoField={generateValidationInfoRow}
                ></FormField>
              </>
            );
        }
      })()}
    </div>
  );
};

export default TravelFormRow;