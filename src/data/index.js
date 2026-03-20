const U = (id, w = 500, q = 82) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const IMAGES = {
  hero:        U('1487530811015-780f37e7c93b', 900, 88),
  heroMap:     'https://maps.googleapis.com/maps/api/staticmap?center=-23.5505,-46.6333&zoom=13&size=340x220&style=feature:all|element:labels.icon|visibility:off&key=', // placeholder
  product1:    U('1518895949257-7621c3c786d7', 700, 85),
  product2:    U('1548198471-a99ba4f98f70', 700, 85),
  rose6:       U('1548198471-a99ba4f98f70', 400, 80),
  rose10:      U('1490750967868-88df5691cc2f', 400, 80),
  rose12:      U('1508610048-dc41f08ca5c8', 400, 80),
  rose14:      U('1517088553-6bcd9d4eb09c', 400, 80),
  pink:        U('1495908333425-29a1e0918c5f', 400, 80),
  orchid:      U('1526336024174-e58f5cdd8e13', 400, 80),
  mixed:       U('1487530811015-780f37e7c93b', 400, 80),
  basket:      U('1541680760496-42f5571b7e3f', 400, 80),
  campo:       U('1490750967868-88df5691cc2f', 400, 80),
  login:       U('1548469782-1ca0f7d6f296', 600, 85),
  contact:     U('1490750967868-88df5691cc2f', 600, 85),
};

export const BOUQUETS = [
  { id: 1, name: 'Buquê com 6 Rosas Colombianas Vermelhas', price: 149.90, img: IMAGES.rose6 },
  { id: 2, name: 'Buquê de Rosas Pink Plantation Para Entrega', price: 189.90, img: IMAGES.pink },
  { id: 3, name: 'Cesta de Presentes com Buquê de Margaridas', price: 210.00, img: IMAGES.basket },
  { id: 4, name: 'Buquê de 30 Rosas Colombianas Para Entrega', price: 349.90, img: IMAGES.rose10 },
  { id: 5, name: 'Buquê de Rosas Brasileiras Pink Para Entrega', price: 159.90, img: IMAGES.mixed },
];

export const ORCHIDS = [
  { id: 6,  name: 'Orquídea Phalaenopsis Pink Plantada Para Entrega', price: 179.41, img: IMAGES.orchid },
  { id: 7,  name: 'Arranjo de Orquídeas com Bowl de Vidro Para Entrega', price: 205.00, img: IMAGES.mixed },
  { id: 8,  name: 'Arranjo de Orquídea Pink em Vaso de Vidro Para Entrega', price: 220.00, img: IMAGES.pink },
  { id: 9,  name: 'Ex Terra Branca e Trejão Bilique Para Entrega', price: 248.31, img: IMAGES.orchid },
];

export const BIRTHDAY = [
  { id: 10, name: 'Café com Flores Para Entrega', price: 278.00, img: IMAGES.basket },
  { id: 11, name: 'Colorado Apetitoso com Bowl de Vidro', price: 330.00, img: IMAGES.mixed },
  { id: 12, name: 'Ervas & Conservas com Vinho Tinto...', price: 279.50, img: IMAGES.basket },
  { id: 13, name: 'Ervas & Conservas com Vinho Branco...', price: 252.31, img: IMAGES.campo },
  { id: 14, name: 'Ervas & Conservas com Vinho Tinto...', price: 293.02, img: IMAGES.basket },
];

export const ROSES = [
  { id: 15, name: 'Arranjo de 36 Rosas Vermelhas em Vaso', price: 478.36, img: IMAGES.rose14 },
  { id: 16, name: 'Buquê de 36 Rosas Vermelhas', price: 478.36, img: IMAGES.rose10 },
  { id: 17, name: 'Buquê de 24 Rosas Colombianas', price: 378.88, img: IMAGES.rose6 },
  { id: 18, name: 'Buquê de 14 Rosas Vermelhas', price: 153.39, img: IMAGES.rose14 },
  { id: 19, name: 'Buquê de 15 Rosas Brancas', price: 157.71, img: IMAGES.pink },
];

export const CAMPO = [
  { id: 20, name: 'Buquê de Flores do Campo Coloridas', price: 197.11, img: IMAGES.campo },
  { id: 21, name: 'Buquê Colorido de Rosas', price: 145.46, img: IMAGES.mixed },
  { id: 22, name: 'Arranjo de Flores Mistas em Vaso...', price: 725.00, img: IMAGES.campo },
  { id: 23, name: 'Arranjo de Floras Lilás em Vaso...', price: 171.44, img: IMAGES.pink },
  { id: 24, name: 'Arranjo de Flores Mistas em Vaso...', price: 171.44, img: IMAGES.campo },
];

export const RELATED = [
  { id: 25, name: 'Buquê de 10 Rosas Colombianas...', price: 178.90, img: IMAGES.rose10 },
  { id: 26, name: 'Buquê de 14 Rosas Vermelhas', price: 153.39, img: IMAGES.rose14 },
  { id: 27, name: 'Buquê de 12 Rosas Vermelhas Para...', price: 149.49, img: IMAGES.rose12 },
  { id: 28, name: 'Buquê de 6 Rosas Vermelhas...', price: 120.53, img: IMAGES.rose6 },
];

export const HOW_TO = [
  {
    title: 'Rosas Vermelhas',
    person: 'Ana Beatriz',
    date: '22/01/2025',
    text: 'Fiquei encantada com a qualidade das flores! Chegaram frescas, bem embaladas e exatamente como na foto.',
  },
  {
    title: 'Cesta de Flor',
    person: 'Pedro Cruz',
    date: '05/03/2025',
    text: 'Flores tão lindas e o perfume tomou conta da casa. Um presente que a pessoa amou muito.',
  },
  {
    title: 'Vaso com Flor',
    person: 'Mario Julie',
    date: '18/12/2025',
    text: 'Ótima experiência de compra: fácil e rápido. Minhas flores chegaram com pétalas impecáveis.',
  },
  {
    title: 'Arranjo',
    person: 'Lauro M.',
    date: '03/01/2026',
    text: 'Simplesmente maravilhoso! O arranjo é ainda mais lindo pessoalmente. A entrega foi pontual e o cuidado com os detalhes faz toda a diferença.',
  },
];

export const REVIEWS = [
  { name: 'Ubirajara Morais', date: '15/6/2024', text: 'Ótimo. Por favor não envia mais e-mail' },
  { name: 'Jose Lucena Gomes', date: '15/6/2024', text: 'Vocês são 10' },
  {
    name: 'Ivanor Lourete',
    date: '14/6/2024',
    text: 'Muito obrigado, foi maravilhoso, meu amor amou as rosas, dois buquês muito lindos. Estou muito feliz.',
  },
];

export const DELIVERY_DATES = [
  { short: 'Ter', date: '17/03', available: true },
  { short: 'Qua', date: '18/03', available: false },
  { short: 'Qui', date: '19/03', available: false },
  { short: 'Sex', date: '20/03', available: false },
  { short: 'Sáb', date: '21/03', available: false },
];

export const GIFT_CATEGORIES = [
  { label: 'Datas Especiais', emoji: '🗓️' },
  { label: 'Ocasiões', emoji: '🎉' },
  { label: 'Presentes Especiais', emoji: '🎁' },
  { label: 'Flores', emoji: '🌸' },
  { label: 'Produtos Exclusivos', emoji: '⭐' },
  { label: 'Cidades Atendidas', emoji: '📍' },
  { label: 'Cestas', emoji: '🧺' },
  { label: 'Bebidas', emoji: '🍾' },
  { label: 'Chocolates', emoji: '🍫' },
  { label: 'Maternidade', emoji: '👶' },
];