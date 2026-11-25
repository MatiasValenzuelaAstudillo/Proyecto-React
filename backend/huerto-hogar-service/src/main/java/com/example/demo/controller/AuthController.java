package com.example.demo.controller;

import com.example.demo.dto.RegistroRequest;
import com.example.demo.dto.RegistroResponse;
import com.example.demo.services.UsuarioService;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
    @ResponseStatus(HttpStatus.CREATED)
    public RegistroResponse registrar(
            @Valid @RequestBody RegistroRequest request) {

        return usuarioService.registrar(request);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest request) {

        return usuarioService.iniciarSesion(request);
    }

}

