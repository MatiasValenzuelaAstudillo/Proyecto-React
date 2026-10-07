import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CartProvider } from '../context/CartContext';
import { Carrito } from '../pages/Pages';

describe('Compra con el carrito vacío', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('muestra que el carrito está vacío y no permite confirmar la compra', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <CartProvider>
          <Carrito />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Tu carrito está vacío' })).toBeInTheDocument();
    expect(screen.getByText('Aún no has agregado productos.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver productos' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Confirmar compra' })).not.toBeInTheDocument();
    expect(alertMock).not.toHaveBeenCalled();
    expect(localStorage.getItem('carrito')).toBeNull();
  });
});