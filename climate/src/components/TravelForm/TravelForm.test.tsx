import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TravelForm from './TravelForm';

describe('<TravelForm />', () => {
  test('it should mount', () => {
    render(<TravelForm />);
    
    const travelForm = screen.getByTestId('TravelForm');

    expect(travelForm).toBeInTheDocument();
  });
});