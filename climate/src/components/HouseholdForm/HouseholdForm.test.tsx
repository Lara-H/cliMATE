import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HouseholdForm from './HouseholdForm';

function setResult() {
  console.log("TravelFormTest");
}

describe('<HouseholdForm />', () => {
  test('it should mount', () => {
    render(<HouseholdForm result={[]} setResult={setResult} />);
    
    const householdForm = screen.getByTestId('HouseholdForm');

    expect(householdForm).toBeInTheDocument();
  });
});