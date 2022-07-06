import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CarouselItem from './CarouselItem';

describe('<CarouselItem />', () => {
  test('it should mount', () => {
    render(<CarouselItem headline={''} imageName={''} imageNameMobile={''} currentMode={''} modeName={''} handleClick={function (modeName: string): void {
      throw new Error('Function not implemented.');
    } } />);
    
    const carouselItem = screen.getByTestId('CarouselItem');

    expect(carouselItem).toBeInTheDocument();
  });
});