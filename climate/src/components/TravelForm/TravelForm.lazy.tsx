import React, { lazy, Suspense } from 'react';

const LazyTravelForm = lazy(() => import('./TravelForm'));

const TravelForm = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTravelForm {...props} />
  </Suspense>
);

export default TravelForm;
