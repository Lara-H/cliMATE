import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FreightFormLeg from './FreightFormLeg';

const newLeg={
  id: "1",
  type: "Test",
  weight: 1,
  distance: 50
}

describe('<FreightFormLeg />', () => {
  test('it should mount', () => {
    render(<FreightFormLeg leg={newLeg} handleRemove={handleRemoveItem}/>);
    
    const formLeg = screen.getByTestId('FreightFormLeg');

    expect(formLeg).toBeInTheDocument();
  });
});

function handleRemoveItem(id:string) {
  console.log(id);
}