import { createContext, useContext, useMemo, useState } from 'react';
import { productos } from '../data/productos';

const CartContext = createContext(null);

function leerCarrito() {
  try { return JSON.parse(localStorage.getItem('carrito')) || []; } catch { return []; }
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarrito);
  const guardar = (nuevoCarrito) => { setCarrito(nuevoCarrito); localStorage.setItem('carrito', JSON.stringify(nuevoCarrito)); };
  const agregar = (codigo) => {
    const producto = productos.find((item) => item.codigo === codigo);
    if (!producto) return { ok: false, message: 'Producto no encontrado.' };
    const existente = carrito.find((item) => item.codigo === codigo);
    if (existente && existente.cantidad >= producto.stock) return { ok: false, message: 'No hay suficiente stock disponible.' };
    const nuevo = existente
      ? carrito.map((item) => item.codigo === codigo ? { ...item, cantidad: item.cantidad + 1 } : item)
      : [...carrito, { codigo, cantidad: 1 }];
    guardar(nuevo);
    return { ok: true, message: `${producto.nombre} se agregó al carrito.` };
  };
  const cambiarCantidad = (codigo, delta) => {
    const item = carrito.find((entry) => entry.codigo === codigo);
    const producto = productos.find((entry) => entry.codigo === codigo);
    if (!item || !producto) return;
    const cantidad = item.cantidad + delta;
    if (cantidad < 1) return;
    if (cantidad > producto.stock) return;
    guardar(carrito.map((entry) => entry.codigo === codigo ? { ...entry, cantidad } : entry));
  };
  const eliminar = (codigo) => guardar(carrito.filter((item) => item.codigo !== codigo));
  const vaciar = () => guardar([]);
  const items = useMemo(() => carrito.map((item) => ({ ...item, producto: productos.find((p) => p.codigo === item.codigo) })).filter((item) => item.producto), [carrito]);
  const total = items.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
  const cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  return <CartContext.Provider value={{ carrito, items, total, cantidadTotal, agregar, cambiarCantidad, eliminar, vaciar }}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
