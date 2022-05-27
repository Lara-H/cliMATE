import React, { lazy, Suspense } from 'react';
import {faCoffee} from '@fortawesome/free-solid-svg-icons'

const LazyFormSelectorButton = lazy(() => import('./FormSelectorButton'));

const FormSelectorButton = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFormSelectorButton {...props} icon={faCoffee} title="" />
  </Suspense>
);

export default FormSelectorButton;
