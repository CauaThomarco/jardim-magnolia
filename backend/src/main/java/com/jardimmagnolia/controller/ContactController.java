package com.jardimmagnolia.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    @PostMapping
    public ResponseEntity<?> receberContato(@RequestBody Map<String, String> body) {
        String name    = body.getOrDefault("name",    "");
        String email   = body.getOrDefault("email",   "");
        String message = body.getOrDefault("message", "");
        System.out.printf("[CONTATO] De: %s <%s>%nMensagem: %s%n", name, email, message);

        return ResponseEntity.ok(Map.of(
                "ok",      true,
                "message", "Mensagem recebida! Entraremos em contato em breve."
        ));
    }
}
