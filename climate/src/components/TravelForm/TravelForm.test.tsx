import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TravelForm from './TravelForm';

function setResult() {
  console.log("TravelFormTest");
}

describe('<TravelForm />', () => {
  test('it should mount', () => {
    render(<TravelForm result={[]} setResult={setResult}/>);
    
    const travelForm = screen.getByTestId('TravelForm');

    expect(travelForm).toBeInTheDocument();
  });
});