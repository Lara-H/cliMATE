import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormLeg from './FormLeg';

const newLeg={
  id: 1,
  type: "Test",
  distance: 50
}

describe('<FormLeg />', () => {
  test('it should mount', () => {
    render(<FormLeg leg={newLeg}/>);
    
    const formLeg = screen.getByTestId('FormLeg');

    expect(formLeg).toBeInTheDocument();
  });
});