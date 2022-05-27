import React, { lazy, Suspense } from 'react';

const LazyFormLeg = lazy(() => import('./FormLeg'));

const FormLeg = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFormLeg {...props} />
  </Suspense>
);

export default FormLeg;
