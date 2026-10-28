package com.example.demo.controller;

import com.example.demo.dto.VehiculoRequest;
import com.example.demo.dto.VehiculoResponse;
import com.example.demo.services.VehiculoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehiculos")
public class VehiculoController {
    private final VehiculoService service;

    public VehiculoController(VehiculoService service) {
        this.service = service;
    }

    @GetMapping
    public List<VehiculoResponse> listar() { return service.listar(); }

    @GetMapping("/{id}")
    public VehiculoResponse obtener(@PathVariable Integer id) { return service.obtener(id); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VehiculoResponse crear(@Valid @RequestBody VehiculoRequest request) { return service.crear(request); }

    @PutMapping("/{id}")
    public VehiculoResponse actualizar(@PathVariable Integer id, @Valid @RequestBody VehiculoRequest request) {
        return service.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Integer id) { service.eliminar(id); }
}
