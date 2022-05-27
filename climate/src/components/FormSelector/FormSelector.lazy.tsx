import React, { lazy, Suspense } from 'react';

const LazyFormSelector = lazy(() => import('./FormSelector'));

const FormSelector = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFormSelector {...props} />
  </Suspense>
);

export default FormSelector;
