import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormSelector from './FormSelector';

describe('<FormSelector />', () => {
  test('it should mount', () => {
    render(<FormSelector />);
    
    const formSelector = screen.getByTestId('FormSelector');

    expect(formSelector).toBeInTheDocument();
  });
});