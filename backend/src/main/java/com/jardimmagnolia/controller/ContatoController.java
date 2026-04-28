package com.jardimmagnolia.controller;

import com.jardimmagnolia.model.Contato;
import com.jardimmagnolia.model.StatusContato;
import com.jardimmagnolia.repository.ContatoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContatoController {

    private final ContatoRepository repo;

    public ContatoController(ContatoRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/contato")
    public ResponseEntity<?> enviar(@RequestBody Map<String, String> body) {
        String nome     = v(body.get("nome"));
        String email    = v(body.get("email"));
        String assunto  = v(body.get("assunto"));
        String mensagem = v(body.get("mensagem"));

        if (nome.isBlank() || email.isBlank() || assunto.isBlank() || mensagem.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Preencha todos os campos obrigatórios."));
        }

        Contato salvo = repo.save(Contato.builder()
                .nome(nome)
                .email(email)
                .assunto(assunto)
                .numeroPedido(v(body.get("numeroPedido")))
                .mensagem(mensagem)
                .build());

        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @GetMapping("/admin/contatos")
    public List<Contato> listar() {
        return repo.findAllByOrderByCriadoEmDesc();
    }

    @PatchMapping("/admin/contatos/{id}/status")
    public ResponseEntity<?> atualizarStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        StatusContato novo;
        try {
            novo = StatusContato.valueOf(v(body.get("status")).toUpperCase());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("message", "Status inválido."));
        }

        return repo.findById(id).map(c -> {
            c.setStatus(novo);
            return ResponseEntity.ok(repo.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    private String v(String s) {
        return s == null ? "" : s.trim();
    }
}
