import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultAreaText from './ResultAreaText';

describe('<ResultAreaText />', () => {
  test('it should mount', () => {
    render(<ResultAreaText result={[]} value={0} label="" type="" />);
    
    const resultAreaText = screen.getByTestId('ResultAreaText');

    expect(resultAreaText).toBeInTheDocument();
  });
});