import React, { FC, useState } from "react";
import styles from "./ResultAreaText.module.scss";
import AnimatedNumber from "animated-number-react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Result = {
  [key: string]: any;
};

interface ResultAreaTextProps {
  value: number;
  label: String;
  result: Array<Result>;
  type: String;
  icon: IconProp;
}

const ResultAreaText: FC<ResultAreaTextProps> = ({
  value,
  label,
  result,
  type,
  icon,
}) => {
  const [counter, setCounter] = useState(0);

  // Hook to trigger the update function on every change to our result state.
  React.useEffect(() => {
    setCounter(calculateResult(result, counter, type));
  }, [result, counter, type]);

  return (
    <div className={styles.ResultAreaText} data-testid="ResultAreaText">
      <FontAwesomeIcon
        className="display-3 mb-3 text-muted"
        icon={icon}
      ></FontAwesomeIcon>{" "}
      <FontAwesomeIcon
        className="display-6 mb-3 text-muted"
        icon={icon}
      ></FontAwesomeIcon>
      <br></br>
      <AnimatedNumber
        className="display-5"
        value={counter}
        formatValue={(num: number) => num.toFixed(1)}
      ></AnimatedNumber>
      <p className="text-muted small">{label}</p>
    </div>
  );
};

/**
 * calculate the sum of co2e and the amount of trees needed, to bind this much co2 in the span of a year.
 * @param result 
 * @param counter 
 * @param type 
 * @returns 
 */
function calculateResult(result: Result, counter: Number, type: String) {
  let count = 0;
  result.forEach((leg: any) => {
    count += leg.co2e;
  });
  switch (type) {
    case "co2eSum":
      return count;
    case "treeYears":
      count = count / 12.5;
      return count;
    default:
      return count;
  }
}

export default ResultAreaText;