import React, { lazy, Suspense } from 'react';

const LazyResultAreaText = lazy(() => import('./ResultAreaText'));

const ResultAreaText = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyResultAreaText {...props} result={[]} value={0} label="" type="" />
  </Suspense>
);

export default ResultAreaText;
