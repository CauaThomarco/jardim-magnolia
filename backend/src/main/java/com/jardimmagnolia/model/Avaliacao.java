package com.jardimmagnolia.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "avaliacao")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cliente_id", nullable = false)
    private Long clienteId;

    @NotBlank(message = "Nome do cliente é obrigatório")
    @Column(name = "cliente_nome", nullable = false)
    private String clienteNome;

    @NotBlank(message = "Comentário é obrigatório")
    @Column(nullable = false, length = 1000)
    private String comentario;

    @Min(1)
    @Max(5)
    @Column(nullable = false)
    private Integer nota;

    @Column(name = "produto_nome")
    private String produtoNome;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusAvaliacao status = StatusAvaliacao.PENDENTE;

    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;

    @PrePersist
    protected void onCreate() {
        criadoEm = LocalDateTime.now();
    }
}
