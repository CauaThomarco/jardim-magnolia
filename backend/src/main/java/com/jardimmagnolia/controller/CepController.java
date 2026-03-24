package com.jardimmagnolia.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/cep")
public class CepController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/{cep}")
    public ResponseEntity<?> buscarCep(@PathVariable String cep) {
        String cepLimpo = cep == null ? "" : cep.replaceAll("\\D", "");

        if (cepLimpo.length() != 8) {
            return ResponseEntity.badRequest().body(Map.of("message", "CEP inválido. Informe 8 números."));
        }

        try {
            String url = "https://viacep.com.br/ws/" + cepLimpo + "/json/";
            Map<?, ?> data = restTemplate.getForObject(url, Map.class);

            if (data == null || Boolean.TRUE.equals(data.get("erro"))) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "CEP não encontrado."));
            }

            return ResponseEntity.ok(data);
        } catch (RestClientException ex) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(Map.of("message", "Falha ao consultar serviço de CEP."));
        }
    }
}
