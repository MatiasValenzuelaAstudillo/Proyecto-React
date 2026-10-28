package com.example.demo.services;

import com.example.demo.dto.CategoriaRequest;
import com.example.demo.dto.CategoriaResponse;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.models.entities.Categoria;
import com.example.demo.repositories.CategoriaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoriaService {
    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<CategoriaResponse> listar() {
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    public CategoriaResponse crear(CategoriaRequest request) {
        Categoria categoria = new Categoria();
        categoria.setNombre_categoria(request.nombreCategoria().trim());
        return toResponse(repository.save(categoria));
    }

    public CategoriaResponse obtener(Integer id) {
        return toResponse(repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada: " + id)));
    }

    public CategoriaResponse actualizar(Integer id, CategoriaRequest request) {
        Categoria categoria = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada: " + id));
        categoria.setNombre_categoria(request.nombreCategoria().trim());
        return toResponse(repository.save(categoria));
    }

    public void eliminar(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Categoría no encontrada: " + id);
        }
        repository.deleteById(id);
    }

    private CategoriaResponse toResponse(Categoria categoria) {
        return new CategoriaResponse(categoria.getId_categoria(), categoria.getNombre_categoria());
    }
}
