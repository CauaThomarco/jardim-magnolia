package com.jardimmagnolia.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${app.admin.code}")
    private String adminCode;

    // POST /api/auth/admin  — Body: { "code": "JARDIM@2026" }
    @PostMapping("/admin")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> body) {
        String code = body.getOrDefault("code", "");

        if (!code.equals(adminCode)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("ok", false, "message", "Código de acesso inválido."));
        }

        return ResponseEntity.ok(Map.of(
                "ok",      true,
                "message", "Autenticado com sucesso."
        ));
    }

    // POST /api/auth/login  — Body: { "email": "...", "password": "..." }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        // TODO: integrar com tabela de usuários / JWT
        String email = body.getOrDefault("email", "");

        return ResponseEntity.ok(Map.of(
                "ok",      true,
                "message", "Login realizado. (JWT em breve)",
                "email",   email
        ));
    }
}