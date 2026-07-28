import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('opens the popup when the button is clicked', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /open popup/i }));

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByText(/welcome to my popup/i)).toBeInTheDocument();
});
