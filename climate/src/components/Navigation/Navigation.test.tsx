import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navigation from './Navigation';

describe('<Navigation />', () => {
  test('it should mount', () => {
    render(<Navigation handleClick={function (modeName: string): void {
      throw new Error('Function not implemented.');
    } } currentMode={''} />);
    
    const navigation = screen.getByTestId('Navigation');

    expect(navigation).toBeInTheDocument();
  });
});