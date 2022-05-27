import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultArea from './ResultArea';

describe('<ResultArea />', () => {
  test('it should mount', () => {
    render(<ResultArea />);
    
    const resultArea = screen.getByTestId('ResultArea');

    expect(resultArea).toBeInTheDocument();
  });
});