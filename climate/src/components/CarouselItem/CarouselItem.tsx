import React, { FC } from "react";
import styles from "./CarouselItem.module.scss";
import { useTranslation } from "react-i18next";

interface CarouselItemProps {
  headline: string;
  imageName: string;
  imageNameMobile: string;
  currentMode: string;
  modeName: string;
  handleClick: (modeName: string) => void;
}

const CarouselItem: FC<CarouselItemProps> = ({
  headline,
  imageName,
  imageNameMobile,
  currentMode,
  modeName,
  handleClick,
}) => {
  const { t, i18n } = useTranslation();

  let isActive = false;
  if (currentMode == modeName) {
    isActive = true;
  } else {
    isActive = false;
  }

  return (
    <div className={styles.CarouselItem} data-testid="CarouselItem">
      <div className={`${isActive ? `carousel-item active` : "carousel-item"}`}>
        <img
          src={imageName}
          className={`d-none d-md-block ${styles["cm-teaser-img"]}`}
        />
        <img
          src={imageNameMobile}
          className="d-block d-md-none w-100"
        />
        <div className="carousel-caption mb-4">
          <p
            className={`display-5 mb-4 text-uppercase ${styles["cm-carousel-caption-text"]}`}
          >
            {headline}
          </p>
          <a
            onClick={() => handleClick(modeName)}
            type="button"
            className="btn btn-outline-light cm-btn-full-width-mobile"
          >
            {t("btn-calculate")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
