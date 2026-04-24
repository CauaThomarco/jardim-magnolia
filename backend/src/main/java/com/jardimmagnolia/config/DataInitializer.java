package com.jardimmagnolia.config;

import com.jardimmagnolia.model.CategoriaProduto;
import com.jardimmagnolia.model.Produto;
import com.jardimmagnolia.repository.ProdutoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.math.BigDecimal;

@Configuration
@Profile("dev")
public class DataInitializer {

    @Bean
    CommandLineRunner seedProdutos(ProdutoRepository repo) {
        return args -> {
            // So executa se o banco estiver vazio (primeira vez)
            if (repo.count() > 0) return;

            repo.save(p("Buque com 6 Rosas Colombianas Vermelhas",
                    "Elegante buque de rosas colombianas vermelhas com seis rosas grandes, embrulhadas em papel de ceda branco com laco de cetim.",
                    "149.90", 28, CategoriaProduto.BUQUES));

            repo.save(p("Buque de Rosas Pink Plantation Para Entrega",
                    "Buque exclusivo com rosas pink colombianas de alta qualidade.",
                    "189.90", 15, CategoriaProduto.BUQUES));

            repo.save(p("Buque de Rosas Brasileiras Coloridas",
                    "Buque vibrante com rosas brasileiras em tons variados.",
                    "159.90", 20, CategoriaProduto.BUQUES));

            repo.save(p("Buque de 30 Rosas Colombianas Para Entrega",
                    "Buque luxuoso com 30 rosas colombianas selecionadas.",
                    "349.90", 5, CategoriaProduto.BUQUES));

            repo.save(p("Orquidea Phalaenopsis Pink Plantada Para Entrega",
                    "Orquidea phalaenopsis plantada em vaso elegante.",
                    "179.41", 0, CategoriaProduto.ORQUIDEAS).toBuilder().ativo(false).build());

            repo.save(p("Arranjo de Orquideas com Bowl de Vidro Para Entrega",
                    "Arranjo sofisticado com orquideas em bowl de vidro.",
                    "205.00", 8, CategoriaProduto.ORQUIDEAS));

            repo.save(p("Orquidea Branca em Cachepo Dourado",
                    "Orquidea branca elegante em cachepo dourado.",
                    "220.00", 6, CategoriaProduto.ORQUIDEAS));

            repo.save(p("Cesta de Presentes com Buque de Margaridas",
                    "Cesta completa com flores frescas e itens especiais para presentear.",
                    "210.00", 8, CategoriaProduto.CESTAS));

            repo.save(p("Cesta Cafe da Manha com Flores",
                    "Cesta especial com cafe da manha e flores frescas.",
                    "278.00", 10, CategoriaProduto.ANIVERSARIO));

            repo.save(p("Colorado Apetitoso com Bowl de Vidro",
                    "Presente completo com flores e itens gourmets.",
                    "330.00", 4, CategoriaProduto.ANIVERSARIO));

            repo.save(p("Arranjo de 36 Rosas Vermelhas em Vaso",
                    "Arranjo luxuoso com 36 rosas colombianas vermelhas em vaso.",
                    "478.36", 3, CategoriaProduto.ROSAS));

            repo.save(p("Buque de 14 Rosas Vermelhas",
                    "Buque romantico com 14 rosas vermelhas colombianas.",
                    "153.39", 18, CategoriaProduto.ROSAS));

            repo.save(p("Buque de 24 Rosas Colombianas Mistas",
                    "Buque com 24 rosas colombianas em cores variadas.",
                    "378.88", 7, CategoriaProduto.ROSAS));

            repo.save(p("Buque de Flores do Campo Coloridas",
                    "Buque rustico e charmoso com flores silvestres coloridas.",
                    "197.11", 12, CategoriaProduto.CAMPO));

            repo.save(p("Arranjo de Flores Mistas Campestres",
                    "Arranjo descontraido com flores do campo em tons terrosos.",
                    "171.44", 9, CategoriaProduto.CAMPO));

            repo.save(p("Vasinho de Suculentas Decorativo",
                    "Conjunto de suculentas variadas em vasinho decorativo.",
                    "89.90", 25, CategoriaProduto.PLANTAS));

            repo.save(p("Kit de Presentes com Vela e Flores",
                    "Kit especial com vela aromatica, flores secas e cartao.",
                    "145.00", 15, CategoriaProduto.PRESENTES));

            repo.save(p("Caixa Surpresa com Rosas e Chocolate",
                    "Caixa especial com rosas frescas e chocolates artesanais.",
                    "249.90", 10, CategoriaProduto.PRESENTES));
        };
    }

    private Produto p(String nome, String descricao, String preco,
                      int estoque, CategoriaProduto categoria) {
        return Produto.builder()
                .nome(nome)
                .descricao(descricao)
                .preco(new BigDecimal(preco))
                .estoque(estoque)
                .ativo(true)
                .categoria(categoria)
                .build();
    }
}