package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record VehiculoRequest(
        @NotBlank(message = "La patente es obligatoria")
        String patente,
        @NotBlank(message = "El color es obligatorio")
        String color,
        @NotNull(message = "La categoría es obligatoria")
        Integer idCategoria) {
}
