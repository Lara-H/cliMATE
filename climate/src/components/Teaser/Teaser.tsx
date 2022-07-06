import React, { FC } from "react";
import styles from "./Teaser.module.scss";
import teaserTravel from "./teaser-travel.jpg";
import teaserFreight from "./teaser-freight.jpg";
import teaserTravelMobile from "./teaser-travel-mobile.jpg";
import teaserFreightMobile from "./teaser-freight-mobile.jpg";
import { useTranslation } from "react-i18next";

interface TeaserProps {}

const Teaser: FC<TeaserProps> = () => {
  const { t, i18n } = useTranslation();
  
  return (
  <div
    className={[styles.Teaser, "text-light", "bg-dark"].join(" ")}
    data-testid="Teaser"
  >
    <div id="carouselTeaser" className="carousel slide" data-bs-ride="false">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={teaserTravel} className="d-none d-md-block w-100" alt={t('travel')} />
          <img src={teaserTravelMobile} className="d-block d-md-none w-100" alt={t('travel')} />
          <div className="carousel-caption mb-4">
            <p className={`display-5 mb-4 text-uppercase ${styles["cm-carousel-caption-text"]}`}>
              {t('teaser-travel-headline')}
            </p>
            <a href="#FormArea" type="button" className="btn btn-outline-light cm-btn-full-width-mobile">
              {t('btn-calculate')}
            </a>
          </div>
        </div>
        <div className="carousel-item">
          <img src={teaserFreight} className="d-none d-md-block w-100" alt={t('freight')} />
          <img src={teaserFreightMobile} className="d-block d-md-none w-100" alt={t('freight')} />
          <div className="carousel-caption mb-4">
            <p className={`display-5 mb-4 text-uppercase ${styles["cm-carousel-caption-text"]}`}>
              {t('teaser-freight-headline')}
            </p>
            <a href="" type="button" className="btn btn-outline-light cm-btn-full-width-mobile">
              {t('btn-calculate')}
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
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselTeaser"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
);
};

export default Teaser;
