import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('submits the name from the popup form', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /open popup/i }));
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Alice' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText(/thanks, alice!/i)).toBeInTheDocument();
});
