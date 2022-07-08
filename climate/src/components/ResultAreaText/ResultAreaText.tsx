import React, { FC, useState } from "react";
import { Value } from "sass";
import styles from "./ResultAreaText.module.scss";
import AnimatedNumber from "animated-number-react";

type Result = {
  [key: string]: any;
}

interface ResultAreaTextProps {
  value: number;
  label: String;
  result: Array<Result>;
  type: String;
}

const ResultAreaText: FC<ResultAreaTextProps> = ({ value, label, result, type }) => {
  const [counter, setCounter] = useState(0);

  // Hook to trigger the update function on every change to our result state.
  React.useEffect(() => {
    console.log(result);
    setCounter(calculateResult(result, counter, type));
  },[result]);
  
  return (
    <div className={styles.ResultAreaText} data-testid="ResultAreaText">
      <AnimatedNumber className="display-5" value={counter} formatValue={(num: number) => num.toFixed(1)}></AnimatedNumber>
      <p className="text-muted small">{label}</p>
    </div>
  );
};

function calculateResult(result:Result, counter:Number, type:String){
  let count = 0;
  result.forEach((leg:any) => {
    count += leg.co2e;
  });
  switch (type) {
    case 'co2eSum':
      return count;
      break;
    case 'treeYears':
      count = count / 12.5;
      return count;
    default:
      return count;
      break;
  }
  
}

export default ResultAreaText;
