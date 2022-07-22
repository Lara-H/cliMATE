import React, { FC } from "react";
import styles from "./Privacy.module.scss";
import { useTranslation } from "react-i18next";

interface PrivacyProps {}

const Privacy: FC<PrivacyProps> = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.Privacy} data-testid="Privacy">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="mb-4">{t("privacy-headline")}</h1>
            <p>{t("privacy-text")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;