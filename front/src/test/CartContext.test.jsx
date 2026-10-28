import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from '../context/CartContext';

function CartTestComponent() {
  const { cantidadTotal, agregar, eliminar } = useCart();

  return (
    <div>
      <span data-testid="cantidad">{cantidadTotal}</span>
      <button onClick={() => agregar('FR001')}>Agregar manzana</button>
      <button onClick={() => agregar('NO-EXISTE')}>Agregar inexistente</button>
      <button onClick={() => eliminar('FR001')}>Eliminar manzana</button>
    </div>
  );
}

describe('Carrito', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('permite agregar un producto al carrito', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cantidad')).toHaveTextContent('0');

    await user.click(screen.getByRole('button', { name: /agregar manzana/i }));

    expect(screen.getByTestId('cantidad')).toHaveTextContent('1');
    expect(JSON.parse(localStorage.getItem('carrito'))).toEqual([
      { codigo: 'FR001', cantidad: 1 },
    ]);
  });

  it('permite eliminar un producto del carrito', async () => {
    const user = userEvent.setup();

    localStorage.setItem(
      'carrito',
      JSON.stringify([{ codigo: 'FR001', cantidad: 1 }])
    );

    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cantidad')).toHaveTextContent('1');

    await user.click(screen.getByRole('button', { name: /eliminar manzana/i }));

    expect(screen.getByTestId('cantidad')).toHaveTextContent('0');
    expect(JSON.parse(localStorage.getItem('carrito'))).toEqual([]);
  });

  it('rechaza un producto que no existe', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    await user.click(screen.getByRole('button', { name: /agregar inexistente/i }));

    expect(screen.getByTestId('cantidad')).toHaveTextContent('0');
    expect(localStorage.getItem('carrito')).toBeNull();
  });

  it('no permite superar el stock disponible', async () => {
    const user = userEvent.setup();

    localStorage.setItem(
      'carrito',
      JSON.stringify([{ codigo: 'FR001', cantidad: 150 }])
    );

    function StockTest() {
      const { carrito, agregar } = useCart();

      return (
        <>
          <span data-testid="cantidad-stock">{carrito[0]?.cantidad ?? 0}</span>
          <button onClick={() => agregar('FR001')}>Intentar superar stock</button>
        </>
      );
    }

    render(
      <CartProvider>
        <StockTest />
      </CartProvider>
    );

    await user.click(
      screen.getByRole('button', { name: /intentar superar stock/i })
    );

    expect(screen.getByTestId('cantidad-stock')).toHaveTextContent('150');
  });
});
