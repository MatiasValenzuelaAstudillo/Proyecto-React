import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { Carrito } from '../pages/Pages';
import { renderTienda } from './renderTienda';

describe('Compra con el carrito vacío', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra que el carrito está vacío y no permite confirmar la compra', async () => {
    await renderTienda(<Carrito />);

    expect(
      screen.getByRole('heading', {
        name: 'Tu carrito está vacío'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: 'Ver productos'
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', {
        name: 'Confirmar compra'
      })
    ).not.toBeInTheDocument();

    expect(localStorage.getItem('carrito')).toBeNull();
  });
});
