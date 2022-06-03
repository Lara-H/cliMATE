import React, { FC } from "react";
import styles from "./Teaser.module.scss";
import teaserTravel from "./teaser-travel.jpg";
import teaserFreight from "./teaser-freight.jpg";
import teaserTravelMobile from "./teaser-travel-mobile.jpg";
import teaserFreightMobile from "./teaser-freight-mobile.jpg";

interface TeaserProps {}

const Teaser: FC<TeaserProps> = () => (
  <div
    className={[styles.Teaser, "text-light", "bg-dark"].join(" ")}
    data-testid="Teaser"
  >
    <div id="carouselTeaser" className="carousel slide" data-bs-ride="false">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={teaserTravel} className="d-none d-md-block w-100" alt="Personenreise" />
          <img src={teaserTravelMobile} className="d-block d-md-none w-100" alt="Personenreise" />
          <div className="carousel-caption mb-4">
            <p className={`display-5 mb-4 text-uppercase ${styles["cm-carousel-caption-text"]}`}>
              Wie groß ist der CO²-Fußabdruck deiner Reise?
            </p>
            <button type="button" className="btn btn-outline-light cm-btn-full-width-mobile">
              Jetzt kalkulieren
            </button>
          </div>
        </div>
        <div className="carousel-item">
          <img src={teaserFreight} className="d-none d-md-block w-100" alt="Fracht" />
          <img src={teaserFreightMobile} className="d-block d-md-none w-100" alt="Fracht" />
          <div className="carousel-caption mb-4">
            <p className={`display-5 mb-4 text-uppercase ${styles["cm-carousel-caption-text"]}`}>
              Wie viel CO² verursacht deine Lieferung?
            </p>
            <button type="button" className="btn btn-outline-light cm-btn-full-width-mobile">
              Jetzt kalkulieren
            </button>
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

export default Teaser;
