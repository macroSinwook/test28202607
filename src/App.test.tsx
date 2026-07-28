import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('loads profile data from the api and displays it', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: 1, name: 'Macro', email: 'macro@example.com' }),
  }) as jest.Mock;

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/macro/i)).toBeInTheDocument();
  });

  expect(screen.getByText(/macro@example.com/i)).toBeInTheDocument();
});

test('submits the name from the popup form', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: /open popup/i }));
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Alice' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText(/thanks, alice!/i)).toBeInTheDocument();
});
