import React, { lazy, Suspense } from 'react';

const LazyFormSelector = lazy(() => import('./FormSelector'));

const FormSelector = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFormSelector currentMode={''} handleClick={function (modeName: string): void {
      throw new Error('Function not implemented.');
    } } {...props} />
  </Suspense>
);

export default FormSelector;
