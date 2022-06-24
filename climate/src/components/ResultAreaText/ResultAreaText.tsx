import React, { FC, useState } from "react";
import { Value } from "sass";
import styles from "./ResultAreaText.module.scss";
import AnimatedNumber from "animated-number-react";

interface ResultAreaTextProps {
  value: number;
  label: String;
}

const ResultAreaText: FC<ResultAreaTextProps> = ({ value, label }) => {
  const [counter, setCounter] = useState(0);

  return (
    <div className={styles.ResultAreaText} data-testid="ResultAreaText">
      <AnimatedNumber className="display-5" value={counter} formatValue={(num: number) => num.toFixed(0)}></AnimatedNumber>
      <p className="text-muted small">{label}</p>
      <button onClick={() => setCounter(value)}>Count</button> {/*/ TODO: Später bei Klick auf Auswerten-Button aus FormArea starten */}
    </div>
  );
};

export default ResultAreaText;
