import React, { FC } from "react";
import styles from "./Teaser.module.scss";
import teaserTravel from "./teaser-travel.png";
import teaserFreight from "./teaser-freight.png";
import teaserHousehold from "./teaser-household.png";
import teaserTravelMobile from "./teaser-travel-mobile.jpg";
import teaserFreightMobile from "./teaser-freight-mobile.jpg";
import teaserHouseholdMobile from "./teaser-household-mobile.jpg";
import { useTranslation } from "react-i18next";

interface TeaserProps {}

const Teaser: FC<TeaserProps> = () => {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={[styles.Teaser, "text-light"].join(" ")}
      data-testid="Teaser"
    >
      <div id="carouselTeaser" className="carousel slide" data-bs-ride="false">
        <div className={`${styles["carousel-inner"]}`}>
          
          <div className="carousel-item active">
            <img
              src={teaserTravel}
              className={`d-none d-md-block ${styles["cm-teaser-img"]}`}
              alt={t("travel")}
            />
            <img
              src={teaserTravelMobile}
              className="d-block d-md-none w-100"
              alt={t("travel")}
            />
            <div className="carousel-caption mb-4">
              <p
                className={`display-5 mb-4 text-uppercase ${styles["cm-carousel-caption-text"]}`}
              >
                {t("teaser-travel-headline")}
              </p>
              <a
                href="#"
                type="button"
                className="btn btn-outline-light cm-btn-full-width-mobile"
              >
                {t("btn-calculate")}
              </a>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src={teaserFreight}
              className={`d-none d-md-block ${styles["cm-teaser-img"]}`}
              alt={t("freight")}
            />
            <img
              src={teaserFreightMobile}
              className="d-block d-md-none w-100"
              alt={t("freight")}
            />
            <div className="carousel-caption mb-4">
              <p
                className={`display-5 mb-4 text-uppercase ${styles["cm-carousel-caption-text"]}`}
              >
                {t("teaser-freight-headline")}
              </p>
              <a
                href="#"
                type="button"
                className="btn btn-outline-light cm-btn-full-width-mobile"
              >
                {t("btn-calculate")}
              </a>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src={teaserHousehold}
              className={`d-none d-md-block ${styles["cm-teaser-img"]}`}
              alt={t("household")}
            />
            <img
              src={teaserHouseholdMobile}
              className="d-block d-md-none w-100"
              alt={t("household")}
            />
            <div className="carousel-caption mb-4">
              <p
                className={`display-5 mb-4 text-uppercase ${styles["cm-carousel-caption-text"]}`}
              >
                {t("teaser-household-headline")}
              </p>
              <a
                href="#"
                type="button"
                className="btn btn-outline-light cm-btn-full-width-mobile"
              >
                {t("btn-calculate")}
              </a>
            </div>
          </div>
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
