import React, { lazy, Suspense } from 'react';

const LazyFormLeg = lazy(() => import('./FormLeg'));

const newLeg={
  id: "1",
  type: "Test",
  distance: 50,
  handleRemove: handleRemoveItem
}

const FormLeg = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFormLeg {...props} leg={newLeg} handleRemove={handleRemoveItem} />
  </Suspense>
);

function handleRemoveItem(id:string) {
  console.log(id);
}

export default FormLeg;
