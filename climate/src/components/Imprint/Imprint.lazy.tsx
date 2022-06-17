import React, { lazy, Suspense } from 'react';

const LazyImprint = lazy(() => import('./Imprint'));

const Imprint = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyImprint {...props} />
  </Suspense>
);

export default Imprint;
