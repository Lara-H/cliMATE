import React, { lazy, Suspense } from 'react';

const LazyFormArea = lazy(() => import('./FormArea'));

const FormArea = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFormArea {...props} />
  </Suspense>
);

export default FormArea;
