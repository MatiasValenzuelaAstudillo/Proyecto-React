import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import { obtenerProductos } from '../api/productoApi';

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelado = false;

    obtenerProductos()
      .then((datos) => {
        if (!cancelado) setProductos(datos);
      })
      .catch((err) => {
        if (!cancelado) setError(err.message);
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <ProductosContext.Provider
      value={{ productos, cargando, error }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  const contexto = useContext(ProductosContext);

  if (!contexto) {
    throw new Error('ProductosProvider no encontrado');
  }

  return contexto;
}
