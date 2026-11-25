import { act, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from '../App';

describe('App', () => {
  it('renderiza sin errores', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(
      screen.getByRole('heading', {
        name: /Del campo a tu mesa/i
      })
    ).toBeInTheDocument();
  });
});
