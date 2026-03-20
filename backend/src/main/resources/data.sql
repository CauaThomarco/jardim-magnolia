-- Dados iniciais para desenvolvimento (H2)
INSERT INTO produto (nome, descricao, preco, estoque, ativo, imagem_url, criado_em)
VALUES
  ('Buquê com 6 Rosas Colombianas Vermelhas',
   'Elegante buquê de rosas colombianas vermelhas com seis rosas grandes, embrulhadas em papel de ceda branco com laço de cetim.',
   149.90, 28, true, null, NOW()),

  ('Buquê de Rosas Pink Plantation Para Entrega',
   'Buquê exclusivo com rosas pink colombianas de alta qualidade.',
   189.90, 15, true, null, NOW()),

  ('Cesta de Presentes com Buquê de Margaridas',
   'Cesta completa com flores frescas e itens especiais para presentear.',
   210.00, 8, true, null, NOW()),

  ('Orquídea Phalaenopsis Pink Plantada Para Entrega',
   'Orquídea phalaenopsis plantada em vaso elegante.',
   179.41, 0, false, null, NOW()),

  ('Buquê de 30 Rosas Colombianas Para Entrega',
   'Buquê luxuoso com 30 rosas colombianas selecionadas.',
   349.90, 5, true, null, NOW());

-- Pedidos de exemplo
INSERT INTO pedido (cliente_nome, cliente_email, cliente_telefone, endereco_entrega, total, status, criado_em)
VALUES
  ('Ana Beatriz',  'ana@email.com',     '(11) 99999-0001', 'Rua das Flores, 100 - SP', 149.90, 'ENTREGUE',  NOW() - INTERVAL '1' DAY),
  ('Pedro Cruz',   'pedro@email.com',   '(11) 99999-0002', 'Av. Central, 200 - SP',    210.00, 'EM_ROTA',   NOW()),
  ('Mario Julie',  'mario@email.com',   '(11) 99999-0003', 'Rua Bela Vista, 55 - SP',  179.41, 'EM_ROTA',   NOW()),
  ('Lauro M.',     'lauro@email.com',   '(11) 99999-0004', 'Rua Verde, 88 - SP',       349.90, 'PENDENTE',  NOW()),
  ('Carla S.',     'carla@email.com',   '(11) 99999-0005', 'Av. Paulista, 1000 - SP',  478.36, 'ENTREGUE',  NOW() - INTERVAL '2' DAY),
  ('Fernanda R.',  'fernanda@email.com','(11) 99999-0006', 'Rua Ipiranga, 33 - SP',    153.39, 'CANCELADO', NOW() - INTERVAL '2' DAY);

-- Itens dos pedidos
INSERT INTO pedido_item (pedido_id, produto_id, quantidade, preco_unitario)
VALUES
  (1, 1, 1, 149.90),
  (2, 3, 1, 210.00),
  (3, 4, 1, 179.41),
  (4, 5, 1, 349.90),
  (5, 1, 3, 149.90),
  (6, 2, 1, 153.39);