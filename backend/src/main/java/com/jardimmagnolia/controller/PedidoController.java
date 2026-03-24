package com.jardimmagnolia.controller;

import com.jardimmagnolia.model.Pedido;
import com.jardimmagnolia.model.StatusPedido;
import com.jardimmagnolia.repository.ClienteRepository;
import com.jardimmagnolia.repository.PedidoRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoRepository repo;
    private final ClienteRepository clienteRepository;

    public PedidoController(PedidoRepository repo, ClienteRepository clienteRepository) {
        this.repo = repo;
        this.clienteRepository = clienteRepository;
    }

    @GetMapping
    public List<Pedido> listar() {
        return repo.findAllByOrderByCriadoEmDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscar(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public List<Pedido> porStatus(@PathVariable StatusPedido status) {
        return repo.findByStatus(status);
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Pedido pedido) {
        if (pedido.getClienteId() == null || !clienteRepository.existsById(pedido.getClienteId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Você precisa estar logado para finalizar a compra."));
        }

        pedido.setStatus(StatusPedido.PENDENTE);
        if (pedido.getMetodoPagamento() == null || pedido.getMetodoPagamento().isBlank()) {
            pedido.setMetodoPagamento("DINHEIRO_NA_ENTREGA");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(repo.save(pedido));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Pedido> atualizarStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        return repo.findById(id).map(p -> {
            p.setStatus(StatusPedido.valueOf(body.get("status").toUpperCase()));
            return ResponseEntity.ok(repo.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/cart/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of(
                "ok",      true,
                "message", "Item adicionado ao carrinho."
        ));
    }
}
