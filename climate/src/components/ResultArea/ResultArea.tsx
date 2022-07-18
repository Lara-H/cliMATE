import React, { FC } from "react";
import Chart from "../Chart/Chart";
import ResultAreaText from "../ResultAreaText/ResultAreaText";
import styles from "./ResultArea.module.scss";
import { useTranslation } from "react-i18next";

interface ResultAreaProps {
  result: Array<Object>
}

const ResultArea: FC<ResultAreaProps> = ({
  result,
}) => {
  const { t, i18n } = useTranslation();
    // Hook to trigger a check on the result on every change to our result state.
    React.useEffect(() => {
      console.log(result);
      const resultArea = document.getElementById("ResultAreaDiv");
      // If the result is empty (length === 0), make the whole result area hidden.
      if(resultArea !== null) {
        if(result.length === 0) {
          resultArea.hidden = true;
        } else {
          resultArea.hidden = false;
          const resultHeading =
            window.document.getElementById("resultHeading");
          if (resultHeading !== null) {
            resultHeading.scrollIntoView();
          }
        }
      }
    },[result]);

  return (
  <div id="ResultAreaDiv" className={styles.ResultArea} hidden data-testid="ResultArea">
    <span className="cm-anchor" id="ResultArea"></span>
    <div className="container">
      <div className="row">
        <div className="col-12 col-md">
          <h2 id="resultHeading" className="mb-3">{t('resultArea-headline')}</h2>
          <p>
          {t('resultArea-text')}
          </p>
          <div className="row pt-3">
            <div className="col">
              <ResultAreaText
                value={12345}
                label={t('resultAreaText-kg')}
                result={result}
                type='co2eSum'
              ></ResultAreaText>
            </div>
            <div className="col col-md">
              <ResultAreaText
                value={12}
                label={t('resultAreaText-tree')}
                result={result}
                type='treeYears'
              ></ResultAreaText>
            </div>
          </div>
        </div>
        <div className="col col-md-6 col-lg-5 col-xl-4">
          <Chart result={result}></Chart>
        </div>
      </div>
    </div>
  </div>
);
};

export default ResultArea;
