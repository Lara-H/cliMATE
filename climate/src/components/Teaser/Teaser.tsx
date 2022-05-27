import React, { FC } from "react";
import styles from "./Teaser.module.scss";
import teaserTravel from "./teaser-travel.jpg";
import teaserFreight from "./teaser-freight.jpg";

interface TeaserProps {}

const Teaser: FC<TeaserProps> = () => (
  <div
    className={[styles.Teaser, "text-light", "bg-dark"].join(" ")}
    data-testid="Teaser"
  >
    <div id="carouselTeaser" className="carousel slide" data-bs-ride="false">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselTeaser"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselTeaser"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselTeaser"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={teaserTravel} className="d-block w-100" alt="Reise" />
          <div className="carousel-caption d-none d-md-block mb-5">
            <p className="display-5 mb-4">
              Wie groß ist der CO²-Fußabdruck deiner Reise?
            </p>
            <button type="button" className="btn btn-outline-light">
              Jetzt kalkulieren
            </button>
          </div>
        </div>
        <div className="carousel-item">
          <img src={teaserFreight} className="d-block w-100" alt="Fracht" />
          <div className="carousel-caption d-none d-md-block mb-5">
            <p className="display-5 mb-4">
              Wie viel CO² verursacht deine Lieferung?
            </p>
            <button type="button" className="btn btn-outline-light">
              Jetzt kalkulieren
            </button>
          </div>
        </div>
        <div className="carousel-item">
          <img src={teaserTravel} className="d-block w-100" alt="Lorem" />
          <div className="carousel-caption d-none d-md-block mb-5">
            <p className="display-5 mb-4">Lorem ipsum dolor sit amet</p>
            <button type="button" className="btn btn-outline-light">
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
