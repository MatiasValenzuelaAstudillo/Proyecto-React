const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos`);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  const datos = await respuesta.json();

  if (!Array.isArray(datos)) {
    throw new Error('Formato de productos inválido');
  }

  return datos.map((producto) => ({
    codigo:     String(producto.idProducto),
    nombre:     producto.nombreProducto,
    categoria:  producto.nombreCategoria,
    precio:     Number(producto.precio),
    stock:      Number(producto.stock),
    unidad:     producto.unidad,
    img:        producto.imagen || '/assets/img/manzanas-fuji.jpg',
    descripcion: ''
  }));
}
