import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatoCLP } from '../data/productos';

export default function ProductCard({ producto }) {
  const { agregar } = useCart();
  const [mensaje, setMensaje] = useState('');
  const handleAdd = () => { const result = agregar(producto.codigo); setMensaje(result.message); window.setTimeout(() => setMensaje(''), 2200); };
  return <article className="product-card">
    <div className="product-image-wrap"><img src={producto.img} alt={producto.nombre} className="product-image" /></div>
    <div className="product-info">
      <span className="product-category">{producto.categoria}</span>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <div className="product-meta"><span>Stock: {producto.stock} {producto.unidad}</span><strong>{formatoCLP(producto.precio)}</strong></div>
      <button className="btn btn-primary btn-full" onClick={handleAdd}>Agregar al carrito</button>
      {mensaje && <small className="toast-inline">{mensaje}</small>}
    </div>
  </article>;
}
