package com.example.demo.dto;

public record RegistroResponse(
    Integer id,
    String nombre,
    String email,
    String rol
) {}
