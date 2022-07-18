import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TravelFormLeg from './TravelFormLeg';

const newLeg={
  id: "1",
  type: "Test",
  passengers: 1,
  distance: 50,
  vehicles: 1,
  departureAirport: "",
  arrivalAirport: ""
}

describe('<TravelFormLeg />', () => {
  test('it should mount', () => {
    render(<TravelFormLeg leg={newLeg} handleRemove={handleRemoveItem}/>);
    
    const formLeg = screen.getByTestId('FormLeg');

    expect(formLeg).toBeInTheDocument();
  });
});

function handleRemoveItem(id:string) {
  console.log(id);
}