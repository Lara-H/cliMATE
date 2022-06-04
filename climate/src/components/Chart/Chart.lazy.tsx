import React, { lazy, Suspense } from 'react';

const LazyChart = lazy(() => import('./Chart'));

const Chart = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyChart {...props} />
  </Suspense>
);

export default Chart;
