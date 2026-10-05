import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { CartProvider } from '../context/CartContext';
import { Productos } from '../pages/Pages';

function renderProductos() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Productos />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('Catálogo de productos', () => {
  it('muestra todos los productos inicialmente', () => {
    renderProductos();

    expect(screen.getByRole('heading', { name: 'Manzana Fuji' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Naranja Valencia' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Miel Orgánica' })).toBeInTheDocument();
  });

  it('filtra los productos por categoría', async () => {
    const user = userEvent.setup();

    renderProductos();

    await user.click(screen.getByRole('button', { name: 'Verduras' }));

    expect(
      screen.getByRole('heading', { name: 'Zanahorias Orgánicas' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Espinacas Frescas' })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: 'Manzana Fuji' })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: 'Miel Orgánica' })
    ).not.toBeInTheDocument();
  });
});
