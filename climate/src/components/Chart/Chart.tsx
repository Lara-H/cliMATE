import React, { useRef, FC } from "react";
import styles from "./Chart.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { createNoSubstitutionTemplateLiteral } from "typescript";

ChartJS.register(ArcElement, Tooltip, Legend);

type Result = {
  [key: string]: any;
}

interface ChartProps {
  result: Array<Result>
}

export const data = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: generateBackgroundColor(10),
      hoverOffset: 5,
    },
  ],
};

export const options = {
  //rotation: 84.6 * Math.PI,
  //circumference: 60 * Math.PI,
};

const Chart: FC<ChartProps> = (
  result
) => {
  // define a reference to the Chart.
  const chartRef = useRef<ChartJS<"pie", number[], string>>(null);

  // Hook to trigger the update function on every change to our result state.
  React.useEffect(() => {
    console.log(result);
    const chart = chartRef.current;
    calculateResult(result, chart);
  },[result]);

return(
  <>
  <div className={styles.Chart} data-testid="Chart">
    <Pie data={data} redraw={true} options={options} ref={chartRef}></Pie>
  </div>
  </>
);

}

export default Chart;

function generateBackgroundColor(size: number) {
  const colorPalette: string[] = [
    "rgba(0, 179, 133, 1)", // Grün
    "orange",
    "purple",
    "cornflowerblue",
    "gold",
    "tomato",
    "turquoise",
    "orchid",
    "navy",
    "darkgoldenrod",
    "yellowgreen",
    "mediumvioletred",
    "deepskyblue",
    "salmon",
    "darkred"
  ];
  let backgroundColor: string[] = [
    colorPalette[0],
  ];
  let j = 1;
  for (let i = 0; i < size; i++) {
    backgroundColor.push(colorPalette[j])
    if (j < colorPalette.length-1) {
      j++;
    } else {
      j = 0;
    }
  }
  return backgroundColor;
}

/**
 * Injects the result of the API-request into the Chart.
 * 
 * @param props The props that house the API-results.
 * @param chart a reference to the Chart which data is supposed to be altered.
 */
function calculateResult(props:ChartProps, chart:ChartJS<"pie", number[], string> | null) {
  resetChart(chart);
  props.result.forEach(leg => {
    chart?.data.labels?.push(leg.emission_factor.category);
    chart?.data.datasets.forEach(dataset => {
      dataset.data.push(leg.co2e);
    });
  });
  chart?.update();
}

/**
 * Reset the Chart to have no data and no labels, so its invisible.
 * 
 * @param chart a reference to the Chart which data is supposed to be altered.
 */
function resetChart(chart:ChartJS<"pie", number[], string> | null) {
  if(chart !== null && chart.data.labels !== null) {
    chart.data.labels = [];
    chart.data.datasets.forEach(dataset => {
      dataset.data = [];
    });
  }
}

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>;
