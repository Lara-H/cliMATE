import React, { FC } from "react";
import Chart from "../Chart/Chart";
import ResultAreaText from "../ResultAreaText/ResultAreaText";
import styles from "./ResultArea.module.scss";

interface ResultAreaProps {}

const ResultArea: FC<ResultAreaProps> = () => (
  <div className={styles.ResultArea} data-testid="ResultArea">
    <span className="cm-anchor" id="ResultArea"></span>
    <div className="container">
      <div className="row">
        <div className="col-12 col-md">
          <h2 className="mb-3">Ergebnis</h2>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </p>
          <div className="row pt-3">
            <div className="col col-md">
              <ResultAreaText
                value={12345}
                label={"Kg CO2 werden dabei insgesamt ausgestoßen"}
              ></ResultAreaText>
            </div>
            <div className="col col-md">
              <ResultAreaText
                value={12}
                label={"Bäume müssen dafür ein ganzes Jahr lang arbeiten"}
              ></ResultAreaText>
            </div>
          </div>
        </div>
        <div className="col">
          <Chart></Chart>
        </div>
      </div>
    </div>
  </div>
);

export default ResultArea;
