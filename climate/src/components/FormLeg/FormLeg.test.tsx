import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormLeg from './FormLeg';

describe('<FormLeg />', () => {
  test('it should mount', () => {
    render(<FormLeg />);
    
    const formLeg = screen.getByTestId('FormLeg');

    expect(formLeg).toBeInTheDocument();
  });
});