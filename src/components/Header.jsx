import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cantidadTotal } = useCart();
  const linkClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';
  return <header className="site-header"><nav className="navbar container">
    <Link to="/" className="logo">Huerto<span>Hogar</span></Link>
    <div className="nav-links">
      <NavLink end to="/" className={linkClass}>Inicio</NavLink>
      <NavLink to="/productos" className={linkClass}>Productos</NavLink>
      <NavLink to="/nosotros" className={linkClass}>Nosotros</NavLink>
      <NavLink to="/carrito" className={linkClass}>Carrito <span className="cart-count">{cantidadTotal}</span></NavLink>
      <NavLink to="/login" className={linkClass}>Iniciar sesión</NavLink>
    </div>
  </nav></header>;
}
