import { act, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ProductosProvider } from '../context/ProductosContext';
import { CartProvider } from '../context/CartContext';

export async function renderTienda(componente) {
  let resultado;

  await act(async () => {
    resultado = render(
      <MemoryRouter>
        <ProductosProvider>
          <CartProvider>
            {componente}
          </CartProvider>
        </ProductosProvider>
      </MemoryRouter>
    );
  });

  return resultado;
}
