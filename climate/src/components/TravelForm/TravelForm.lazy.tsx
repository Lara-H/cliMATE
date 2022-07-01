import React, { lazy, Suspense } from 'react';

const LazyTravelForm = lazy(() => import('./TravelForm'));

function setResult() {
  console.log("TravelFormLazy");
}

const TravelForm = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTravelForm {...props} result={[]} setResult={setResult} />
  </Suspense>
);

export default TravelForm;
