package com.example.demo.dto;

public record VehiculoResponse(
        Integer idVehiculo,
        String patente,
        String color,
        Integer idCategoria,
        String nombreCategoria) {
}
