import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';

import { Productos } from '../pages/Pages';
import { renderTienda } from './renderTienda';

describe('Catálogo de productos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra todos los productos inicialmente', async () => {
    await renderTienda(<Productos />);

    expect(
      screen.getByRole('heading', { name: 'Manzana Fuji' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Naranja Valencia' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Miel Orgánica' })
    ).toBeInTheDocument();
  });

  it('filtra los productos por categoría', async () => {
    const user = userEvent.setup();
    await renderTienda(<Productos />);

    await user.click(
      screen.getByRole('button', {
        name: 'Verduras Orgánicas'
      })
    );

    expect(
      screen.getByRole('heading', {
        name: 'Zanahorias Orgánicas'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Espinacas Frescas'
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', {
        name: 'Manzana Fuji'
      })
    ).not.toBeInTheDocument();
  });
});
