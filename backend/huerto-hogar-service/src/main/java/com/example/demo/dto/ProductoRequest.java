package com.example.demo.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record ProductoRequest(
        @NotBlank(message = "El nombre del producto es obligatorio") String nombreProducto,
        @NotNull(message = "El precio es obligatorio") @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0") BigDecimal precio,
        @NotBlank(message = "La unidad es obligatoria") String unidad,
        @NotNull(message = "El stock es obligatorio") @Min(value = 0, message = "El stock no puede ser negativo") Integer stock,
        String imagen,
        @NotNull(message = "La categoría es obligatoria") Integer idCategoria) {}
