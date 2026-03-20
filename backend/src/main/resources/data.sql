-- Dados iniciais para desenvolvimento (H2)
-- PRODUTOS COM CATEGORIA
INSERT INTO produto (nome, descricao, preco, estoque, ativo, categoria, imagem_url, criado_em) VALUES
  ('Buquê com 6 Rosas Colombianas Vermelhas',
   'Elegante buquê de rosas colombianas vermelhas com seis rosas grandes, embrulhadas em papel de ceda branco com laço de cetim.',
   149.90, 28, true, 'BUQUES', null, NOW()),

  ('Buquê de Rosas Pink Plantation Para Entrega',
   'Buquê exclusivo com rosas pink colombianas de alta qualidade.',
   189.90, 15, true, 'BUQUES', null, NOW()),

  ('Buquê de Rosas Brasileiras Coloridas',
   'Buquê vibrante com rosas brasileiras em tons variados.',
   159.90, 20, true, 'BUQUES', null, NOW()),

  ('Buquê de 30 Rosas Colombianas Para Entrega',
   'Buquê luxuoso com 30 rosas colombianas selecionadas.',
   349.90, 5, true, 'BUQUES', null, NOW()),

  ('Orquídea Phalaenopsis Pink Plantada Para Entrega',
   'Orquídea phalaenopsis plantada em vaso elegante.',
   179.41, 0, false, 'ORQUIDEAS', null, NOW()),

  ('Arranjo de Orquídeas com Bowl de Vidro Para Entrega',
   'Arranjo sofisticado com orquídeas em bowl de vidro.',
   205.00, 8, true, 'ORQUIDEAS', null, NOW()),

  ('Orquídea Branca em Cachepô Dourado',
   'Orquídea branca elegante em cachepô dourado.',
   220.00, 6, true, 'ORQUIDEAS', null, NOW()),

  ('Cesta de Presentes com Buquê de Margaridas',
   'Cesta completa com flores frescas e itens especiais para presentear.',
   210.00, 8, true, 'CESTAS', null, NOW()),

  ('Cesta Café da Manhã com Flores',
   'Cesta especial com café da manhã e flores frescas.',
   278.00, 10, true, 'ANIVERSARIO', null, NOW()),

  ('Colorado Apetitoso com Bowl de Vidro',
   'Presente completo com flores e itens gourmets.',
   330.00, 4, true, 'ANIVERSARIO', null, NOW()),

  ('Arranjo de 36 Rosas Vermelhas em Vaso',
   'Arranjo luxuoso com 36 rosas colombianas vermelhas em vaso.',
   478.36, 3, true, 'ROSAS', null, NOW()),

  ('Buquê de 14 Rosas Vermelhas',
   'Buquê romântico com 14 rosas vermelhas colombianas.',
   153.39, 18, true, 'ROSAS', null, NOW()),

  ('Buquê de 24 Rosas Colombianas Mistas',
   'Buquê com 24 rosas colombianas em cores variadas.',
   378.88, 7, true, 'ROSAS', null, NOW()),

  ('Buquê de Flores do Campo Coloridas',
   'Buquê rústico e charmoso com flores silvestres coloridas.',
   197.11, 12, true, 'CAMPO', null, NOW()),

  ('Arranjo de Flores Mistas Campestres',
   'Arranjo descontraído com flores do campo em tons terrosos.',
   171.44, 9, true, 'CAMPO', null, NOW()),

  ('Vasinho de Suculentas Decorativo',
   'Conjunto de suculentas variadas em vasinho decorativo.',
   89.90, 25, true, 'PLANTAS', null, NOW()),

  ('Kit de Presentes com Vela e Flores',
   'Kit especial com vela aromática, flores secas e cartão.',
   145.00, 15, true, 'PRESENTES', null, NOW()),

  ('Caixa Surpresa com Rosas e Chocolate',
   'Caixa especial com rosas frescas e chocolates artesanais.',
   249.90, 10, true, 'PRESENTES', null, NOW());

-- PEDIDOS DE EXEMPLO
INSERT INTO pedido (cliente_nome, cliente_email, cliente_telefone, endereco_entrega, total, status, criado_em) VALUES
  ('Ana Beatriz',  'ana@email.com',      '(11) 99999-0001', 'Rua das Flores, 100 - SP',     149.90, 'ENTREGUE',  NOW() - INTERVAL '1' DAY),
  ('Pedro Cruz',   'pedro@email.com',    '(11) 99999-0002', 'Av. Central, 200 - SP',         210.00, 'EM_ROTA',   NOW()),
  ('Mario Julie',  'mario@email.com',    '(11) 99999-0003', 'Rua Bela Vista, 55 - SP',       179.41, 'EM_ROTA',   NOW()),
  ('Lauro M.',     'lauro@email.com',    '(11) 99999-0004', 'Rua Verde, 88 - SP',            349.90, 'PENDENTE',  NOW()),
  ('Carla S.',     'carla@email.com',    '(11) 99999-0005', 'Av. Paulista, 1000 - SP',       478.36, 'ENTREGUE',  NOW() - INTERVAL '2' DAY),
  ('Fernanda R.',  'fernanda@email.com', '(11) 99999-0006', 'Rua Ipiranga, 33 - SP',         153.39, 'CANCELADO', NOW() - INTERVAL '2' DAY);

-- ITENS DOS PEDIDOS
INSERT INTO pedido_item (pedido_id, produto_id, quantidade, preco_unitario) VALUES
  (1, 1, 1, 149.90),
  (2, 8, 1, 210.00),
  (3, 5, 1, 179.41),
  (4, 4, 1, 349.90),
  (5, 11, 1, 478.36),
  (6, 2, 1, 153.39);