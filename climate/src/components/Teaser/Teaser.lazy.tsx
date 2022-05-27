import React, { lazy, Suspense } from 'react';

const LazyTeaser = lazy(() => import('./Teaser'));

const Teaser = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTeaser {...props} />
  </Suspense>
);

export default Teaser;
