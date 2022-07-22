import React, { FC, useState } from "react";
import styles from "./QuoteArea.module.scss";
import woman from "./woman.png";
import man from "./man.png";
import { useTranslation } from "react-i18next";

interface QuoteAreaProps {}

const QuoteArea: FC<QuoteAreaProps> = () => {
  const { t } = useTranslation();
  const [state, setState] = useState(true);

  return (
    <div className={`${styles.QuoteArea}`} data-testid="QuoteArea">
      <div className="bg-dark">
        <div className="container pt-4">
          <div className="row">
            <div className="col-12 col-lg-5 col-xl-6">
              <blockquote
                className={`blockquote mb-4 ${styles["cm-blockquote"]}`}
              >
                <p className="mb-4 lead text-light">
                  {state ? t("quote-woman") : t("quote-man")}
                </p>
                <footer className="blockquote-footer">
                  <span className="small">
                    {state ? t("quote-woman-name") : t("quote-man-name")}
                  </span>
                </footer>
              </blockquote>
              <button
                className={`btn btn-primary text-light ${styles["cm-btn"]}`}
                onClick={() => setState((state) => !state)}
              >
                {state ? t("btn-man") : t("btn-woman")}
              </button>
            </div>
            <div className="col-12 col-lg">
              <div className="row align-items-baseline">
                <div className="col">
                  <img
                    onClick={() => setState(true)}
                    src={woman}
                    alt="a random woman"
                    className={`${
                      state
                        ? `img-fluid ${styles["cm-img-in"]}`
                        : `img-fluid ${styles["cm-img-out"]}`
                    }`}
                  ></img>
                </div>
                <div className="col">
                  <img
                    onClick={() => setState(false)}
                    src={man}
                    alt="a random man"
                    className={`${
                      state
                        ? `img-fluid ${styles["cm-img-out"]}`
                        : `img-fluid ${styles["cm-img-in"]}`
                    }`}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteArea;