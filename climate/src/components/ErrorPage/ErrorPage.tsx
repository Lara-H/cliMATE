import React, { FC } from "react";
import styles from "./ErrorPage.module.scss";
import img from "./errorpage.jpg";
import { useTranslation } from "react-i18next";

interface ErrorPageProps {}

const ErrorPage: FC<ErrorPageProps> = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.ErrorPage} data-testid="ErrorPage">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md">
            <h1 className="mb-4">{t("errorpage-headline")}</h1>
            <p className="mb-4">{t("errorpage-text")}</p>
            <a
              className={`btn btn-primary text-light ${styles["cm-btn"]}`}
              href="/"
            >
              {t("btn-home")}
            </a>
          </div>
          <div className="col-12 col-md">
            <img src={img} alt="just a stock-pic to signify an error" className="img-fluid"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
