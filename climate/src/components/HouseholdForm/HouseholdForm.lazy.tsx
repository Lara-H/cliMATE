import React, { lazy, Suspense } from 'react';

const LazyHouseholdForm = lazy(() => import('./HouseholdForm'));

const HouseholdForm = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyHouseholdForm {...props} />
  </Suspense>
);

export default HouseholdForm;
