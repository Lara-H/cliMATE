import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FreightForm from './FreightForm';

describe('<FreightForm />', () => {
  test('it should mount', () => {
    render(<FreightForm />);
    
    const freightForm = screen.getByTestId('FreightForm');

    expect(freightForm).toBeInTheDocument();
  });
});