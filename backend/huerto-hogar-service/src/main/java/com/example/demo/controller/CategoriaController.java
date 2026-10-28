package com.example.demo.controller;

import com.example.demo.dto.CategoriaRequest;
import com.example.demo.dto.CategoriaResponse;
import com.example.demo.services.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/categorias") @CrossOrigin(origins = "*")
public class CategoriaController {
    private final CategoriaService service;
    public CategoriaController(CategoriaService service) { this.service = service; }
    @GetMapping public List<CategoriaResponse> listar() { return service.listar(); }
    @GetMapping("/{id}") public CategoriaResponse obtener(@PathVariable Integer id) { return service.obtener(id); }
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public CategoriaResponse crear(@Valid @RequestBody CategoriaRequest r) { return service.crear(r); }
    @PutMapping("/{id}") public CategoriaResponse actualizar(@PathVariable Integer id, @Valid @RequestBody CategoriaRequest r) { return service.actualizar(id, r); }
    @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void eliminar(@PathVariable Integer id) { service.eliminar(id); }
}
