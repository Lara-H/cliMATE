import React, { lazy, Suspense } from 'react';

const LazyFormArea = lazy(() => import('./FormArea'));

function setResult() {
  console.log("LazyFormArea");
}


const FormArea = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFormArea {...props} result={[]} setResult={setResult} children=""/>
  </Suspense>
);

export default FormArea;
