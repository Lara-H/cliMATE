import React, { FC } from "react";
import styles from "./Chart.module.scss";

interface ChartProps {}

const Chart: FC<ChartProps> = () => (
  <div className={styles.Chart} data-testid="Chart">
    Chart Component
  </div>
);

export default Chart;

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
