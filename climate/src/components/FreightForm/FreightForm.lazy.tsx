import React, { lazy, Suspense } from 'react';

const LazyFreightForm = lazy(() => import('./FreightForm'));

const FreightForm = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFreightForm {...props} />
  </Suspense>
);

export default FreightForm;
