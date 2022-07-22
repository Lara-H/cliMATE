import React, { FC } from "react";
import styles from "./Teaser.module.scss";
import teaserTravel from "./teaser-travel.png";
import teaserFreight from "./teaser-freight.png";
import teaserHousehold from "./teaser-household.png";
import teaserTravelMobile from "./teaser-travel-mobile.jpg";
import teaserFreightMobile from "./teaser-freight-mobile.jpg";
import teaserHouseholdMobile from "./teaser-household-mobile.jpg";
import { useTranslation } from "react-i18next";
import CarouselItem from "../CarouselItem/CarouselItem";

interface TeaserProps {
  handleClick: (modeName: string) => void;
  currentMode: string;
}

const Teaser: FC<TeaserProps> = ({ handleClick, currentMode }) => {
  const { t } = useTranslation();

  /**
   * change mode when changing carousel item
   * @param ControlElement
   */
  function handleCarouselControl(ControlElement: string) {
    switch (currentMode) {
      case "travel":
        handleClick(ControlElement === "prev" ? "household" : "freight");
        break;
      case "freight":
        handleClick(ControlElement === "prev" ? "travel" : "household");
        break;
      case "household":
        handleClick(ControlElement === "prev" ? "freight" : "travel");
        break;
    }
  }

  return (
    <div
      className={[styles.Teaser, "text-light"].join(" ")}
      data-testid="Teaser"
    >
      <div id="carouselTeaser" className="carousel slide" data-bs-ride="false">
        <div className={`${styles["carousel-inner"]}`}>
          <CarouselItem
            headline={t("teaser-travel-headline")}
            imageName={teaserTravel}
            imageAlt={t("teaser-travel-headline")}
            imageNameMobile={teaserTravelMobile}
            imageAltMobile={t("teaser-travel-headline")}
            currentMode={currentMode}
            modeName="travel"
          ></CarouselItem>

          <CarouselItem
            headline={t("teaser-freight-headline")}
            imageName={teaserFreight}
            imageAlt={t("teaser-travel-headline")}
            imageNameMobile={teaserFreightMobile}
            imageAltMobile={t("teaser-travel-headline")}
            currentMode={currentMode}
            modeName="freight"
          ></CarouselItem>

          <CarouselItem
            headline={t("teaser-household-headline")}
            imageName={teaserHousehold}
            imageAlt={t("teaser-travel-headline")}
            imageNameMobile={teaserHouseholdMobile}
            imageAltMobile={t("teaser-travel-headline")}
            currentMode={currentMode}
            modeName="household"
          ></CarouselItem>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselTeaser"
          data-bs-slide="prev"
          onClick={() => handleCarouselControl("prev")}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselTeaser"
          data-bs-slide="next"
          onClick={() => handleCarouselControl("next")}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Teaser;