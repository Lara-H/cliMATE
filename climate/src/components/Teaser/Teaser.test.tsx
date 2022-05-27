import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Teaser from './Teaser';

describe('<Teaser />', () => {
  test('it should mount', () => {
    render(<Teaser />);
    
    const teaser = screen.getByTestId('Teaser');

    expect(teaser).toBeInTheDocument();
  });
});