package com.example.demo.controller;

import com.example.demo.dto.ProductoRequest;
import com.example.demo.dto.ProductoResponse;
import com.example.demo.services.ProductoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/productos") @CrossOrigin(origins = "*")
public class ProductoController {
    private final ProductoService service;
    public ProductoController(ProductoService service) { this.service = service; }
    @GetMapping public List<ProductoResponse> listar() { return service.listar(); }
    @GetMapping("/{id}") public ProductoResponse obtener(@PathVariable Integer id) { return service.obtener(id); }
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public ProductoResponse crear(@Valid @RequestBody ProductoRequest r) { return service.crear(r); }
    @PutMapping("/{id}") public ProductoResponse actualizar(@PathVariable Integer id, @Valid @RequestBody ProductoRequest r) { return service.actualizar(id, r); }
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void eliminar(@PathVariable Integer id) { service.eliminar(id); }
}
