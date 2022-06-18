import React, { lazy, Suspense } from 'react';

const LazyNavigation = lazy(() => import('./Navigation'));

const Navigation = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyNavigation handleClick={function (modeName: string): void {
      throw new Error('Function not implemented.');
    } } {...props} />
  </Suspense>
);

export default Navigation;
