import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultAreaText from './ResultAreaText';

describe('<ResultAreaText />', () => {
  test('it should mount', () => {
    render(<ResultAreaText value={""} label={""} />);
    
    const resultAreaText = screen.getByTestId('ResultAreaText');

    expect(resultAreaText).toBeInTheDocument();
  });
});