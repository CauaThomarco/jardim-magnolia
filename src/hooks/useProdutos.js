import { useState, useEffect } from 'react';

const API = 'http://localhost:8080/api';

// Fallback images por categoria caso o produto não tenha imagem
const FALLBACK = {
  BUQUES:      'https://images.unsplash.com/photo-1548198471-a99ba4f98f70?w=400&q=80',
  ORQUIDEAS:   'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&q=80',
  ANIVERSARIO: 'https://images.unsplash.com/photo-1541680760496-42f5571b7e3f?w=400&q=80',
  ROSAS:       'https://images.unsplash.com/photo-1490750967868-88df5691cc2f?w=400&q=80',
  CAMPO:       'https://images.unsplash.com/photo-1487530811015-780f37e7c93b?w=400&q=80',
  PRESENTES:   'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80',
  CESTAS:      'https://images.unsplash.com/photo-1541680760496-42f5571b7e3f?w=400&q=80',
  PLANTAS:     'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400&q=80',
};

// Normaliza produto da API para o formato usado no frontend
export function normalizeProduto(p) {
  return {
    id:        p.id,
    name:      p.nome,
    price:     parseFloat(p.preco),
    img:       p.imagemUrl
                 ? `${API.replace('/api', '')}${p.imagemUrl}`
                 : FALLBACK[p.categoria] || FALLBACK.BUQUES,
    estoque:   p.estoque,
    ativo:     p.ativo,
    categoria: p.categoria,
    descricao: p.descricao,
  };
}

// Hook para buscar todos os produtos ativos, agrupados por categoria
export function useProdutos() {
  const [grupos,  setGrupos]  = useState({});
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/produtos`);
      if (!res.ok) throw new Error('Erro ao buscar produtos');
      const data = await res.json();

      // Agrupa por categoria
      const grouped = {};
      data.forEach((p) => {
        const cat = p.categoria || 'BUQUES';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(normalizeProduto(p));
      });
      setGrupos(grouped);
    } catch (err) {
      console.warn('Backend indisponível, usando dados estáticos:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProdutos(); }, []);

  return { grupos, loading, error, refetch: fetchProdutos };
}

// Hook para buscar produtos admin (todos, inclusive inativos)
export function useProdutosAdmin() {
  const [produtos, setProdutos] = useState([]);
  const [loading,  setLoading]  = useState(true);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/produtos/admin`);
      if (!res.ok) throw new Error('Erro');
      const data = await res.json();
      setProdutos(data.map(normalizeProduto));
    } catch (err) {
      console.warn('Usando mock data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProdutos(); }, []);

  return { produtos, setProdutos, loading, refetch: fetchProdutos };
}

export const CATEGORIA_LABELS = {
  BUQUES:      'Buquês de Flores',
  ORQUIDEAS:   'Orquídeas',
  ANIVERSARIO: 'Presentes de Aniversário',
  ROSAS:       'Rosas',
  CAMPO:       'Flores do Campo',
  PRESENTES:   'Presentes Especiais',
  CESTAS:      'Cestas',
  PLANTAS:     'Plantas e Vasinhos',
};

export const CATEGORIA_OPTIONS = Object.entries(CATEGORIA_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export { API };