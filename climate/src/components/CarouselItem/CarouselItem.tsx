import React, { FC } from "react";
import styles from "./CarouselItem.module.scss";
import { useTranslation } from "react-i18next";

interface CarouselItemProps {
  headline: string;
  imageName: string;
  imageAlt:string;
  imageNameMobile: string;
  imageAltMobile:string;
  currentMode: string;
  modeName: string;
}

const CarouselItem: FC<CarouselItemProps> = ({
  headline,
  imageName,
  imageAlt,
  imageNameMobile,
  imageAltMobile,
  currentMode,
  modeName,
}) => {
  const { t } = useTranslation();

  // check if carousel-item has to be active carousel-item
  let isActive = false;
  if (currentMode === modeName) {
    isActive = true;
  } else {
    isActive = false;
  }

  /**
   * scroll to form
   */
  function scrollToForm() {
    const FormArea = document.getElementById("FormArea");
    if (FormArea != null) {
      FormArea.scrollIntoView();
    }
  }

  return (
    <div className={styles.CarouselItem} data-testid="CarouselItem">
      <div className={`${isActive ? `carousel-item active` : "carousel-item"}`}>
        <img
          src={imageName}
          alt={imageAlt}
          className={`d-none d-md-block ${styles["cm-teaser-img"]}`}
        />
        <img src={imageNameMobile} alt={imageAltMobile} className="d-block d-md-none w-100" />
        <div className="carousel-caption mb-4">
          <p
            className={`display-5 mb-4 text-uppercase ${styles["cm-carousel-caption-text"]}`}
          >
            {headline}
          </p>
          <button
            onClick={() => scrollToForm()}
            type="button"
            className="btn btn-outline-light cm-btn-full-width-mobile"
          >
            {t("btn-calculate")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;