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
  const { t, i18n } = useTranslation();

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
            imageNameMobile={teaserTravelMobile}
            currentMode={currentMode}
            modeName="travel"
            handleClick={handleClick}
          ></CarouselItem>

          <CarouselItem
            headline={t("teaser-freight-headline")}
            imageName={teaserFreight}
            imageNameMobile={teaserFreightMobile}
            currentMode={currentMode}
            modeName="freight"
            handleClick={handleClick}
          ></CarouselItem>

          <CarouselItem
            headline={t("teaser-household-headline")}
            imageName={teaserHousehold}
            imageNameMobile={teaserHouseholdMobile}
            currentMode={currentMode}
            modeName="household"
            handleClick={handleClick}
          ></CarouselItem>

        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselTeaser"
          data-bs-slide="prev"
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
