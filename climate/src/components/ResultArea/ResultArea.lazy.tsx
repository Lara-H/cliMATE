import React, { lazy, Suspense } from 'react';

const LazyResultArea = lazy(() => import('./ResultArea'));

const ResultArea = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyResultArea {...props} />
  </Suspense>
);

export default ResultArea;
