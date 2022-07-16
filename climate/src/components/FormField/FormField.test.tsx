import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormField from './FormField';

function handleValidation() {
  console.log("FormField handleValidation");
}

describe('<FormField />', () => {
  test('it should mount', () => {
    render(<FormField label={''} id={''} type={''} initValue={""} handleValidation={handleValidation}/>);
    
    const formField = screen.getByTestId('FormField');

    expect(formField).toBeInTheDocument();
  });
});