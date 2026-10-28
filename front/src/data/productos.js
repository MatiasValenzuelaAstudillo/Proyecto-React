export const productos = [
  { codigo: 'FR001', nombre: 'Manzana Fuji', categoria: 'Frutas Frescas', precio: 1200, stock: 150, unidad: 'kg', descripcion: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o postres.', img: '/assets/img/manzanas-fuji.jpg' },
  { codigo: 'FR002', nombre: 'Naranja Valencia', categoria: 'Frutas Frescas', precio: 1000, stock: 200, unidad: 'kg', descripcion: 'Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes.', img: '/assets/img/naranjas-valencia.jpg' },
  { codigo: 'FR003', nombre: 'Plátano Cavendish', categoria: 'Frutas Frescas', precio: 1000, stock: 250, unidad: 'kg', descripcion: 'Plátanos maduros y dulces, perfectos para el desayuno o como snack energético.', img: '/assets/img/platanos-cavendish.jpg' },
  { codigo: 'VR001', nombre: 'Zanahorias Orgánicas', categoria: 'Verduras Orgánicas', precio: 900, stock: 100, unidad: 'kg', descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra.", img: '/assets/img/zanahorias.jpg' },
  { codigo: 'VR002', nombre: 'Espinacas Frescas', categoria: 'Verduras Orgánicas', precio: 700, stock: 80, unidad: 'bolsa', descripcion: 'Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes.', img: '/assets/img/espinacas.jpg' },
  { codigo: 'VR003', nombre: 'Pimientos Tricolores', categoria: 'Verduras Orgánicas', precio: 1500, stock: 120, unidad: 'kg', descripcion: 'Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos.', img: '/assets/img/pimientos.jpg' },
  { codigo: 'PO001', nombre: 'Miel Orgánica', categoria: 'Productos Orgánicos', precio: 5000, stock: 50, unidad: 'frasco', descripcion: 'Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable.', img: '/assets/img/miel.jpg' },
];

export const categorias = [
  { label: 'Todos', value: 'todos' },
  { label: 'Frutas', value: 'Frutas Frescas' },
  { label: 'Verduras', value: 'Verduras Orgánicas' },
  { label: 'Orgánicos', value: 'Productos Orgánicos' },
];

export const formatoCLP = (valor) => `$${valor.toLocaleString('es-CL')}`;
