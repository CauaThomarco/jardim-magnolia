package com.jardimmagnolia.controller;

import com.jardimmagnolia.model.Cliente;
import com.jardimmagnolia.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${app.admin.code}")
    private String adminCode;

    private final ClienteRepository clienteRepository;

    public AuthController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Login do administrador por código
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> payload) {
        String code = payload.get("code");

        if (code != null && adminCode.equals(code.trim())) {
            return ResponseEntity.ok().body(Map.of("message", "Login autorizado"));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Código inválido"));
    }

    // Cadastro do cliente
    @PostMapping("/clientes/register")
    public ResponseEntity<?> cadastrarCliente(@RequestBody Map<String, String> payload) {
        String nome = value(payload.get("nome"));
        String email = value(payload.get("email")).toLowerCase();
        String senha = value(payload.get("senha"));

        if (nome.isBlank() || email.isBlank() || senha.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Nome, e-mail e senha são obrigatórios."));
        }

        if (clienteRepository.existsByEmailIgnoreCase(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "E-mail já cadastrado."));
        }

        Cliente cliente = Cliente.builder()
                .nome(nome)
                .email(email)
                .senhaHash(hashSenha(senha))
                .build();

        Cliente salvo = clienteRepository.save(cliente);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "id", salvo.getId(),
                "nome", salvo.getNome(),
                "email", salvo.getEmail(),
                "message", "Cadastro realizado com sucesso"
        ));
    }

    // Login do cliente por e-mail + senha
    @PostMapping("/clientes/login")
    public ResponseEntity<?> loginCliente(@RequestBody Map<String, String> payload) {
        String email = value(payload.get("email")).toLowerCase();
        String senha = value(payload.get("senha"));

        if (email.isBlank() || senha.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "E-mail e senha são obrigatórios."));
        }

        return clienteRepository.findByEmailIgnoreCase(email)
                .map(cliente -> {
                    if (!cliente.getSenhaHash().equals(hashSenha(senha))) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Credenciais inválidas."));
                    }

                    return ResponseEntity.ok(Map.of(
                            "id", cliente.getId(),
                            "nome", cliente.getNome(),
                            "email", cliente.getEmail(),
                            "message", "Login realizado com sucesso"
                    ));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Credenciais inválidas.")));
    }

    private String value(String raw) {
        return raw == null ? "" : raw.trim();
    }

    private String hashSenha(String senha) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(senha.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : hash) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Falha ao processar senha", e);
        }
    }
}
