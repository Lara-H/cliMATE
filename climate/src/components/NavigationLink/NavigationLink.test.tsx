import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavigationLink from './NavigationLink';

describe('<NavigationLink />', () => {
  test('it should mount', () => {
    render(<NavigationLink currentMode={''} handleClick={function (modeName: string): void {
      throw new Error('Function not implemented.');
    } } modeName={''} title={''} />);
    
    const navigationLink = screen.getByTestId('NavigationLink');

    expect(navigationLink).toBeInTheDocument();
  });
});