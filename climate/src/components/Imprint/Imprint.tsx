import React, { FC } from "react";
import styles from "./Imprint.module.scss";
import { useTranslation } from "react-i18next";

interface ImprintProps {}

const Imprint: FC<ImprintProps> = () => {
  const { t, i18n } = useTranslation();

  return (
  <div className={styles.Imprint} data-testid="Imprint">
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mb-4">{t('imprint-headline')}</h1>
          <p>
            {t('imprint-text')}
          </p>
        </div>
      </div>
    </div>
  </div>
);
};

export default Imprint;
