package com.jardimmagnolia.controller;

import com.jardimmagnolia.model.Avaliacao;
import com.jardimmagnolia.model.StatusAvaliacao;
import com.jardimmagnolia.model.StatusPedido;
import com.jardimmagnolia.repository.AvaliacaoRepository;
import com.jardimmagnolia.repository.ClienteRepository;
import com.jardimmagnolia.repository.PedidoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AvaliacaoController {

    private final AvaliacaoRepository avaliacaoRepository;
    private final ClienteRepository clienteRepository;
    private final PedidoRepository pedidoRepository;

    public AvaliacaoController(
            AvaliacaoRepository avaliacaoRepository,
            ClienteRepository clienteRepository,
            PedidoRepository pedidoRepository
    ) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.clienteRepository = clienteRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @GetMapping("/avaliacoes")
    public List<Avaliacao> listarAprovadas() {
        return avaliacaoRepository.findByStatusOrderByCriadoEmDesc(StatusAvaliacao.APROVADA);
    }

    @GetMapping("/admin/avaliacoes")
    public List<Avaliacao> listarTodas() {
        return avaliacaoRepository.findAllByOrderByCriadoEmDesc();
    }

    @PostMapping("/avaliacoes")
    public ResponseEntity<?> criar(@RequestBody Map<String, String> body) {
        Long clienteId;
        try {
            clienteId = Long.parseLong(value(body.get("clienteId")));
        } catch (NumberFormatException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Faça login para enviar uma avaliação."));
        }

        if (!clienteRepository.existsById(clienteId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Faça login para enviar uma avaliação."));
        }

        boolean comprou = pedidoRepository.existsByClienteIdAndStatusNot(clienteId, StatusPedido.CANCELADO);
        if (!comprou) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Somente clientes que já compraram podem avaliar."));
        }

        String comentario = value(body.get("comentario"));
        String nomeCliente = value(body.get("nomeCliente"));
        String produtoNome = value(body.get("produtoNome"));
        int nota;
        try {
            nota = Integer.parseInt(value(body.get("nota")));
        } catch (NumberFormatException ex) {
            nota = 0;
        }

        if (comentario.isBlank() || nomeCliente.isBlank() || nota < 1 || nota > 5) {
            return ResponseEntity.badRequest().body(Map.of("message", "Preencha nome, comentário e nota válida (1 a 5)."));
        }

        Avaliacao salva = avaliacaoRepository.save(Avaliacao.builder()
                .clienteId(clienteId)
                .clienteNome(nomeCliente)
                .comentario(comentario)
                .produtoNome(produtoNome)
                .nota(nota)
                .status(StatusAvaliacao.PENDENTE)
                .build());

        return ResponseEntity.status(HttpStatus.CREATED).body(salva);
    }

    @PatchMapping("/admin/avaliacoes/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String statusRaw = value(body.get("status"));
        StatusAvaliacao status;
        try {
            status = StatusAvaliacao.valueOf(statusRaw.toUpperCase());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("message", "Status inválido."));
        }

        return avaliacaoRepository.findById(id)
                .map(av -> {
                    av.setStatus(status);
                    return ResponseEntity.ok(avaliacaoRepository.save(av));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private String value(String raw) {
        return raw == null ? "" : raw.trim();
    }
}
