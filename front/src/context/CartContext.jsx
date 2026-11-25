import { createContext, useContext, useMemo, useState } from 'react';
import { useProductos } from './ProductosContext';

const CartContext = createContext(null);

function leerCarrito() {
  try {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const { productos } = useProductos();
  const [carrito, setCarrito] = useState(leerCarrito);

  const guardar = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const agregar = (codigo) => {
    const producto = productos.find(p => p.codigo === codigo);

    if (!producto) {
      return { ok: false, message: 'Producto no encontrado.' };
    }

    const existente = carrito.find(p => p.codigo === codigo);

    if (producto.stock <= 0 ||
        (existente && existente.cantidad >= producto.stock)) {
      return { ok: false, message: 'No hay suficiente stock.' };
    }

    const nuevo = existente
      ? carrito.map(p =>
          p.codigo === codigo
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        )
      : [...carrito, { codigo, cantidad: 1 }];

    guardar(nuevo);

    return {
      ok: true,
      message: `${producto.nombre} se agregó al carrito.`
    };
  };

  const cambiarCantidad = (codigo, delta) => {
    const item = carrito.find(p => p.codigo === codigo);
    const producto = productos.find(p => p.codigo === codigo);

    if (!item || !producto) return;

    const cantidad = item.cantidad + delta;

    if (cantidad < 1 || cantidad > producto.stock) return;

    guardar(carrito.map(p =>
      p.codigo === codigo ? { ...p, cantidad } : p
    ));
  };

  const eliminar = (codigo) => {
    guardar(carrito.filter(p => p.codigo !== codigo));
  };

  const vaciar = () => guardar([]);

  const items = useMemo(() =>
    carrito
      .map(item => ({
        ...item,
        producto: productos.find(
          p => p.codigo === item.codigo
        )
      }))
      .filter(item => item.producto),
    [carrito, productos]
  );

  const total = items.reduce(
    (suma, item) =>
      suma + item.producto.precio * item.cantidad,
    0
  );

  const cantidadTotal = items.reduce(
    (suma, item) => suma + item.cantidad,
    0
  );

  return (
    <CartContext.Provider value={{
      carrito,
      items,
      total,
      cantidadTotal,
      agregar,
      cambiarCantidad,
      eliminar,
      vaciar
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
