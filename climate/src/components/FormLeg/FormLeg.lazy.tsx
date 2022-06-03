import React, { lazy, Suspense } from 'react';

const LazyFormLeg = lazy(() => import('./FormLeg'));

const newLeg={
  id: 1,
  type: "Test",
  distance: 50
}

const FormLeg = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFormLeg {...props} leg={newLeg} />
  </Suspense>
);

export default FormLeg;
