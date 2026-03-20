package com.jardimmagnolia.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${app.admin.code}")
    private String adminCode;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String code = payload.get("code"); 
        
        // Verifica se a senha existe e remove espaços em branco antes de comparar
        if (code != null && adminCode.equals(code.trim())) {
            return ResponseEntity.ok().body(Map.of("message", "Login autorizado"));
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Código inválido"));
    }
}