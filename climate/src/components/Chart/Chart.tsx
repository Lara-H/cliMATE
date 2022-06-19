import React, { FC } from "react";
import styles from "./Chart.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {}

// TODO: Daten später aus Legs
const dataLabel: string[] = [
  "Hund",
  "Katze",
  "Maus",
  "Fledermaus",
  "Ente",
  "Elch",
]
const dataValue: number[] = [
  46,
  93,
  74,
  24,
  52,
  27,
]

export const data = {
  labels: dataLabel,
  datasets: [
    {
      data: dataValue,
      backgroundColor: generateBackgroundColor(dataLabel.length),
      hoverOffset: 5,
    },
  ],
};

export const options = {
  //rotation: 84.6 * Math.PI,
  //circumference: 60 * Math.PI,
};

const Chart: FC<ChartProps> = () => {

return(
  <div className={styles.Chart} data-testid="Chart">
    <Pie data={data} options={options}></Pie>
  </div>
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

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>;
