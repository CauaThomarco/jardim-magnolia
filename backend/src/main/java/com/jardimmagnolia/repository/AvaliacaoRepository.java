package com.jardimmagnolia.repository;

import com.jardimmagnolia.model.Avaliacao;
import com.jardimmagnolia.model.StatusAvaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    List<Avaliacao> findAllByOrderByCriadoEmDesc();
    List<Avaliacao> findByStatusOrderByCriadoEmDesc(StatusAvaliacao status);
}
