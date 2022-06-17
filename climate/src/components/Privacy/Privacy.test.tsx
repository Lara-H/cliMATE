import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Privacy from './Privacy';

describe('<Privacy />', () => {
  test('it should mount', () => {
    render(<Privacy />);
    
    const privacy = screen.getByTestId('Privacy');

    expect(privacy).toBeInTheDocument();
  });
});