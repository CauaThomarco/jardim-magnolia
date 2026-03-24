package com.jardimmagnolia.controller;

import com.jardimmagnolia.model.Pedido;
import com.jardimmagnolia.model.StatusPedido;
import com.jardimmagnolia.repository.PedidoRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoRepository repo;

    public PedidoController(PedidoRepository repo) {
        this.repo = repo;
    }

    // GET /api/pedidos
    @GetMapping
    public List<Pedido> listar() {
        return repo.findAllByOrderByCriadoEmDesc();
    }

    // GET /api/pedidos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscar(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/pedidos/status/{status}
    @GetMapping("/status/{status}")
    public List<Pedido> porStatus(@PathVariable StatusPedido status) {
        return repo.findByStatus(status);
    }

    // POST /api/pedidos  — criar pedido (checkout)
    @PostMapping
    public ResponseEntity<Pedido> criar(@RequestBody Pedido pedido) {
        pedido.setStatus(StatusPedido.PENDENTE);
        if (pedido.getMetodoPagamento() == null || pedido.getMetodoPagamento().isBlank()) {
            pedido.setMetodoPagamento("DINHEIRO_NA_ENTREGA");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(repo.save(pedido));
    }

    // PATCH /api/pedidos/{id}/status  — Body: { "status": "EM_ROTA" }
    @PatchMapping("/{id}/status")
    public ResponseEntity<Pedido> atualizarStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        return repo.findById(id).map(p -> {
            p.setStatus(StatusPedido.valueOf(body.get("status").toUpperCase()));
            return ResponseEntity.ok(repo.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    // POST /api/cart/add — Body: { "productId": 1, "quantity": 2 }
    @PostMapping("/cart/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of(
                "ok",      true,
                "message", "Item adicionado ao carrinho."
        ));
    }
}