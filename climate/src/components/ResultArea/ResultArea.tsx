import React, { FC } from "react";
import Chart from "../Chart/Chart";
import ResultAreaText from "../ResultAreaText/ResultAreaText";
import styles from "./ResultArea.module.scss";
import { useTranslation } from "react-i18next";
import { faCloud, faTree } from "@fortawesome/free-solid-svg-icons";

interface ResultAreaProps {
  result: Array<Object>
}

const ResultArea: FC<ResultAreaProps> = ({
  result,
}) => {
  const { t, i18n } = useTranslation();

  return (
  <div className={styles.ResultArea} data-testid="ResultArea">
    <span className="cm-anchor" id="ResultArea"></span>
    <div className="container">
      <div className="row">
        <div className="col-12 col-md">
          <h2 id="resultHeading" className="mb-3">{t('resultArea-headline')}</h2>
          <p>
          {t('resultArea-text')}
          </p>
          <div className="row mt-5">
            <div className={`col-12 col-lg text-md-center border-end ${styles["cm-icon-first"]}`}>
              <ResultAreaText
                value={12345}
                label={t('resultAreaText-kg')}
                result={result}
                type='co2eSum'
                icon={faCloud}
              ></ResultAreaText>
            </div>
            <div className="col-12 col-lg text-md-center">
              <ResultAreaText
                value={12}
                label={t('resultAreaText-tree')}
                result={result}
                type='treeYears'
                icon={faTree}
              ></ResultAreaText>
            </div>
          </div>
        </div>
        <div className="col col-md-6 col-lg-5 col-xl-4 offset-lg-1">
          <Chart result={result}></Chart>
        </div>
      </div>
    </div>
  </div>
);
};

export default ResultArea;
