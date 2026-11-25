
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('../api/productoApi', async () => {
  const { productos } = await import('../data/productos');

  return {
    obtenerProductos: vi.fn().mockResolvedValue(productos)
  };
});
