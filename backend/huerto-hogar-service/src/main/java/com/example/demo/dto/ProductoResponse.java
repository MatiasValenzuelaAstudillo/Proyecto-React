package com.example.demo.dto;

import java.math.BigDecimal;

public record ProductoResponse(Integer idProducto, String nombreProducto, BigDecimal precio,
        String unidad, Integer stock, String imagen, Integer idCategoria, String nombreCategoria) {}
