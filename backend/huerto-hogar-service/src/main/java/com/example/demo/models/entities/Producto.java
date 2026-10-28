package com.example.demo.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "producto")
public class Producto {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_producto;
    @Column(nullable = false) private String nombre_producto;
    @Column(nullable = false, precision = 10, scale = 2) private BigDecimal precio;
    @Column(nullable = false) private String unidad;
    @Column(nullable = false) private Integer stock;
    @Column(length = 500) private String imagen;
    @ManyToOne(optional = false) @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;
}
