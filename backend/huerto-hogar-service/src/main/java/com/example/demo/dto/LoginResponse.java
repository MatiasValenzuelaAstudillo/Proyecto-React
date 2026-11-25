package com.example.demo.dto;

public record LoginResponse(
    Integer id,
    String nombre,
    String email,
    String rol
) {}
