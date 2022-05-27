import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormArea from './FormArea';

describe('<FormArea />', () => {
  test('it should mount', () => {
    render(<FormArea />);
    
    const formArea = screen.getByTestId('FormArea');

    expect(formArea).toBeInTheDocument();
  });
});