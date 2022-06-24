import React, { lazy, Suspense } from 'react';

const LazyPrivacy = lazy(() => import('./Privacy'));

const Privacy = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPrivacy {...props} />
  </Suspense>
);

export default Privacy;
