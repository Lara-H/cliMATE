import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormSelectorButton from './FormSelectorButton';
import {faCoffee} from '@fortawesome/free-solid-svg-icons'

describe('<FormSelectorButton />', () => {
  test('it should mount', () => {
    render(<FormSelectorButton icon={faCoffee} title=""/>);
    
    const formSelectorButton = screen.getByTestId('FormSelectorButton');

    expect(formSelectorButton).toBeInTheDocument();
  });
});