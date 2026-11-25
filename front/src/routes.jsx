import { Routes, Route } from 'react-router-dom';

import {
  Home,
  Productos,
  Carrito,
  Nosotros,
  Login,
  Registro,
  Perfil
} from './pages/Pages';

export default function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
