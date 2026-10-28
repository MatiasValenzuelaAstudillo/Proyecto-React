package com.example.demo.services;

import com.example.demo.dto.ProductoRequest;
import com.example.demo.dto.ProductoResponse;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.models.entities.Categoria;
import com.example.demo.models.entities.Producto;
import com.example.demo.repositories.CategoriaRepository;
import com.example.demo.repositories.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service @Transactional
public class ProductoService {
    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;
    public ProductoService(ProductoRepository productoRepository, CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository; this.categoriaRepository = categoriaRepository;
    }
    @Transactional(readOnly = true)
    public List<ProductoResponse> listar() { return productoRepository.findAll().stream().map(this::toResponse).toList(); }
    @Transactional(readOnly = true)
    public ProductoResponse obtener(Integer id) { return toResponse(productoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + id))); }
    public ProductoResponse crear(ProductoRequest request) { Producto p = new Producto(); aplicarCambios(p, request); return toResponse(productoRepository.save(p)); }
    public ProductoResponse actualizar(Integer id, ProductoRequest request) { Producto p = productoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado: " + id)); aplicarCambios(p, request); return toResponse(productoRepository.save(p)); }
    public void eliminar(Integer id) { if (!productoRepository.existsById(id)) throw new ResourceNotFoundException("Producto no encontrado: " + id); productoRepository.deleteById(id); }
    private void aplicarCambios(Producto p, ProductoRequest r) {
        Categoria c = categoriaRepository.findById(r.idCategoria()).orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada: " + r.idCategoria()));
        p.setNombre_producto(r.nombreProducto().trim()); p.setPrecio(r.precio()); p.setUnidad(r.unidad().trim()); p.setStock(r.stock()); p.setImagen(r.imagen() == null ? "" : r.imagen().trim()); p.setCategoria(c);
    }
    private ProductoResponse toResponse(Producto p) { Categoria c=p.getCategoria(); return new ProductoResponse(p.getId_producto(), p.getNombre_producto(), p.getPrecio(), p.getUnidad(), p.getStock(), p.getImagen(), c.getId_categoria(), c.getNombre_categoria()); }
}
