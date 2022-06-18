import React, { lazy, Suspense } from 'react';

const LazyNavigationLink = lazy(() => import('./NavigationLink'));

const NavigationLink = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyNavigationLink title={''} currentMode={''} modeName={''} handleClick={function (modeName: string): void {
      throw new Error('Function not implemented.');
    } } {...props} />
  </Suspense>
);

export default NavigationLink;
