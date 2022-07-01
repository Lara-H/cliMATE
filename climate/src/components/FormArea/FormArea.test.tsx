import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormArea from './FormArea';

function setResult() {
  console.log("FormAreaTest");
}

describe('<FormArea />', () => {
  test('it should mount', () => {
    render(<FormArea result={[]} setResult={setResult} children=""/>);
    
    const formArea = screen.getByTestId('FormArea');

    expect(formArea).toBeInTheDocument();
  });
});