import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { Login } from '../pages/Pages';

describe('Formulario de inicio de sesión', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra los campos de correo y contraseña', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it('rechaza el envío cuando faltan datos obligatorios', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole('button', { name: /iniciar sesión/i })
    );

    expect(localStorage.getItem('usuario')).toBeNull();
  });

  it('guarda el usuario cuando el formulario es válido', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await user.type(
      screen.getByLabelText(/correo electrónico/i),
      'cliente@correo.cl'
    );
    await user.type(
      screen.getByLabelText(/contraseña/i),
      '1234'
    );

    await user.click(
      screen.getByRole('button', { name: /iniciar sesión/i })
    );

    expect(JSON.parse(localStorage.getItem('usuario'))).toEqual({
      email: 'cliente@correo.cl',
    });
  });
});
