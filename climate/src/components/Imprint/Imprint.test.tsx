import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Imprint from './Imprint';

describe('<Imprint />', () => {
  test('it should mount', () => {
    render(<Imprint />);
    
    const imprint = screen.getByTestId('Imprint');

    expect(imprint).toBeInTheDocument();
  });
});