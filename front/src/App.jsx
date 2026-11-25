import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import { ProductosProvider } from './context/ProductosContext';
import Rutas from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <ProductosProvider>
        <CartProvider>
          <Header />

          <Rutas />

          <footer className="footer">
            <div className="container">
              <strong>
                Huerto<span>Hogar</span>
              </strong>
              <p>Frescura que llega a tu hogar.</p>
            </div>
          </footer>
        </CartProvider>
      </ProductosProvider>
    </BrowserRouter>
  );
}

