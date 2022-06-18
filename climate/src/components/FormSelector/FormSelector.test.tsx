import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormSelector from './FormSelector';

describe('<FormSelector />', () => {
  test('it should mount', () => {
    render(<FormSelector handleClick={function (modeName: string): void {
      throw new Error('Function not implemented.');
    } } />);
    
    const formSelector = screen.getByTestId('FormSelector');

    expect(formSelector).toBeInTheDocument();
  });
});