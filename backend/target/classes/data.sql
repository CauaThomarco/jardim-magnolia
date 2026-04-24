-- Seed inicial — só insere se o produto ainda não existir no banco
INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Buquê com 6 Rosas Colombianas Vermelhas',
       'Elegante buquê de rosas colombianas vermelhas com seis rosas grandes, embrulhadas em papel de ceda branco com laço de cetim.',
       149.90, 28, true, 'BUQUES', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Buquê com 6 Rosas Colombianas Vermelhas');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Buquê de Rosas Pink Plantation Para Entrega',
       'Buquê exclusivo com rosas pink colombianas de alta qualidade.',
       189.90, 15, true, 'BUQUES', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Buquê de Rosas Pink Plantation Para Entrega');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Buquê de Rosas Brasileiras Coloridas',
       'Buquê vibrante com rosas brasileiras em tons variados.',
       159.90, 20, true, 'BUQUES', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Buquê de Rosas Brasileiras Coloridas');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Buquê de 30 Rosas Colombianas Para Entrega',
       'Buquê luxuoso com 30 rosas colombianas selecionadas.',
       349.90, 5, true, 'BUQUES', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Buquê de 30 Rosas Colombianas Para Entrega');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Orquídea Phalaenopsis Pink Plantada Para Entrega',
       'Orquídea phalaenopsis plantada em vaso elegante.',
       179.41, 0, false, 'ORQUIDEAS', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Orquídea Phalaenopsis Pink Plantada Para Entrega');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Arranjo de Orquídeas com Bowl de Vidro Para Entrega',
       'Arranjo sofisticado com orquídeas em bowl de vidro.',
       205.00, 8, true, 'ORQUIDEAS', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Arranjo de Orquídeas com Bowl de Vidro Para Entrega');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Orquídea Branca em Cachepô Dourado',
       'Orquídea branca elegante em cachepô dourado.',
       220.00, 6, true, 'ORQUIDEAS', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Orquídea Branca em Cachepô Dourado');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Cesta de Presentes com Buquê de Margaridas',
       'Cesta completa com flores frescas e itens especiais para presentear.',
       210.00, 8, true, 'CESTAS', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Cesta de Presentes com Buquê de Margaridas');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Cesta Café da Manhã com Flores',
       'Cesta especial com café da manhã e flores frescas.',
       278.00, 10, true, 'ANIVERSARIO', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Cesta Café da Manhã com Flores');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Colorado Apetitoso com Bowl de Vidro',
       'Presente completo com flores e itens gourmets.',
       330.00, 4, true, 'ANIVERSARIO', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Colorado Apetitoso com Bowl de Vidro');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Arranjo de 36 Rosas Vermelhas em Vaso',
       'Arranjo luxuoso com 36 rosas colombianas vermelhas em vaso.',
       478.36, 3, true, 'ROSAS', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Arranjo de 36 Rosas Vermelhas em Vaso');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Buquê de 14 Rosas Vermelhas',
       'Buquê romântico com 14 rosas vermelhas colombianas.',
       153.39, 18, true, 'ROSAS', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Buquê de 14 Rosas Vermelhas');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Buquê de 24 Rosas Colombianas Mistas',
       'Buquê com 24 rosas colombianas em cores variadas.',
       378.88, 7, true, 'ROSAS', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Buquê de 24 Rosas Colombianas Mistas');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Buquê de Flores do Campo Coloridas',
       'Buquê rústico e charmoso com flores silvestres coloridas.',
       197.11, 12, true, 'CAMPO', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Buquê de Flores do Campo Coloridas');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Arranjo de Flores Mistas Campestres',
       'Arranjo descontraído com flores do campo em tons terrosos.',
       171.44, 9, true, 'CAMPO', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Arranjo de Flores Mistas Campestres');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Vasinho de Suculentas Decorativo',
       'Conjunto de suculentas variadas em vasinho decorativo.',
       89.90, 25, true, 'PLANTAS', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Vasinho de Suculentas Decorativo');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Kit de Presentes com Vela e Flores',
       'Kit especial com vela aromática, flores secas e cartão.',
       145.00, 15, true, 'PRESENTES', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Kit de Presentes com Vela e Flores');

INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em)
SELECT 'Caixa Surpresa com Rosas e Chocolate',
       'Caixa especial com rosas frescas e chocolates artesanais.',
       249.90, 10, true, 'PRESENTES', null, NOW()
    WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Caixa Surpresa com Rosas e Chocolate');