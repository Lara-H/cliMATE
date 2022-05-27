import React, { lazy, Suspense } from 'react';

const LazyResultAreaText = lazy(() => import('./ResultAreaText'));

const ResultAreaText = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyResultAreaText {...props} value="" label="" />
  </Suspense>
);

export default ResultAreaText;
