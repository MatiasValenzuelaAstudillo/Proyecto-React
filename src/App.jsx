import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import { Home, Productos, Carrito, Nosotros, Login, Registro, Perfil } from './pages/Pages';

export default function App() { return <BrowserRouter><CartProvider><Header /><Routes><Route path="/" element={<Home />} /><Route path="/productos" element={<Productos />} /><Route path="/carrito" element={<Carrito />} /><Route path="/nosotros" element={<Nosotros />} /><Route path="/login" element={<Login />} /><Route path="/registro" element={<Registro />} /><Route path="/perfil" element={<Perfil />} /><Route path="*" element={<Home />} /></Routes><footer className="footer"><div className="container"><strong>Huerto<span>Hogar</span></strong><p>Frescura que llega a tu hogar.</p></div></footer></CartProvider></BrowserRouter>; }
