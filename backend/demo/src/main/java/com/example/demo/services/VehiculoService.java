package com.example.demo.services;

import com.example.demo.dto.VehiculoRequest;
import com.example.demo.dto.VehiculoResponse;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.models.entities.Categoria;
import com.example.demo.models.entities.Vehiculo;
import com.example.demo.repositories.CategoriaRepository;
import com.example.demo.repositories.VehiculoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class VehiculoService {
    private final VehiculoRepository vehiculoRepository;
    private final CategoriaRepository categoriaRepository;

    public VehiculoService(VehiculoRepository vehiculoRepository, CategoriaRepository categoriaRepository) {
        this.vehiculoRepository = vehiculoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @Transactional(readOnly = true)
    public List<VehiculoResponse> listar() {
        return vehiculoRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public VehiculoResponse obtener(Integer id) {
        return toResponse(vehiculoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado: " + id)));
    }

    public VehiculoResponse crear(VehiculoRequest request) {
        Vehiculo vehiculo = new Vehiculo();
        aplicarCambios(vehiculo, request);
        return toResponse(vehiculoRepository.save(vehiculo));
    }

    public VehiculoResponse actualizar(Integer id, VehiculoRequest request) {
        Vehiculo vehiculo = vehiculoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado: " + id));
        aplicarCambios(vehiculo, request);
        return toResponse(vehiculoRepository.save(vehiculo));
    }

    public void eliminar(Integer id) {
        if (!vehiculoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vehículo no encontrado: " + id);
        }
        vehiculoRepository.deleteById(id);
    }

    private void aplicarCambios(Vehiculo vehiculo, VehiculoRequest request) {
        Categoria categoria = categoriaRepository.findById(request.idCategoria())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada: " + request.idCategoria()));
        vehiculo.setPatente(request.patente().trim());
        vehiculo.setColor(request.color().trim());
        vehiculo.setCategoria(categoria);
    }

    private VehiculoResponse toResponse(Vehiculo vehiculo) {
        Categoria categoria = vehiculo.getCategoria();
        return new VehiculoResponse(
                vehiculo.getId_vehiculo(), vehiculo.getPatente(), vehiculo.getColor(),
                categoria.getId_categoria(), categoria.getNombre_categoria());
    }
}
