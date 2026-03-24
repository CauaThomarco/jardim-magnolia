import { useEffect, useMemo, useState } from 'react';
import Stars from '../components/Stars.jsx';
import MiniCard from '../components/MiniCard.jsx';
import Footer from '../components/Footer.jsx';
import { API } from '../hooks/useProdutos.js';
import { IMAGES, RELATED, DELIVERY_DATES } from '../data/index.js';

const PRODUCT = {
  id:    1,
  name:  'Buquê com 6 Rosas Colombianas Vermelhas',
  price: 149.90,
  img:   IMAGES.rose6,
};

const THUMBS = [IMAGES.product1, IMAGES.rose6, IMAGES.rose12, IMAGES.rose14];
const relatedProducts = Array.isArray(RELATED) ? RELATED : [];

export default function ProductPage({ onNavigate, onAddToCart, cliente }) {
  const [selectedDate, setSelectedDate] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');
  const [envioMsg, setEnvioMsg] = useState('');
  const [envioErro, setEnvioErro] = useState('');

  const carregarAvaliacoes = async () => {
    try {
      const res = await fetch(`${API}/avaliacoes`);
      if (!res.ok) throw new Error('Erro ao buscar avaliações');
      const data = await res.json();
      setAvaliacoes(Array.isArray(data) ? data : []);
    } catch {
      setAvaliacoes([]);
    }
  };

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  const mediaNotas = useMemo(() => {
    if (!avaliacoes.length) return 5;
    const media = avaliacoes.reduce((acc, item) => acc + Number(item.nota || 0), 0) / avaliacoes.length;
    return Math.max(1, Math.min(5, Math.round(media)));
  }, [avaliacoes]);

  const handleBuy = () => {
    onAddToCart?.({ ...PRODUCT, qty });
    onNavigate('cart');
  };

  const handleAddFromRelated = (item) => {
    onAddToCart?.({ ...item, qty: 1 });
  };

  const handleEnviarAvaliacao = async (e) => {
    e.preventDefault();
    setEnvioMsg('');
    setEnvioErro('');

    if (!cliente?.id) {
      setEnvioErro('Faça login para enviar sua avaliação.');
      return;
    }

    if (!comentario.trim()) {
      setEnvioErro('Escreva um comentário para enviar sua avaliação.');
      return;
    }

    try {
      const res = await fetch(`${API}/avaliacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteId: cliente.id,
          nomeCliente: cliente.nome,
          nota,
          comentario,
          produtoNome: PRODUCT.name,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Não foi possível enviar sua avaliação.');

      setComentario('');
      setNota(5);
      setEnvioMsg('Avaliação enviada! Ela ficará visível após aprovação da administração.');
    } catch (err) {
      setEnvioErro(err.message || 'Erro inesperado ao enviar avaliação.');
    }
  };

  return (
    <div>
      <div className="product-page">
        <div className="breadcrumb">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Início</a>
          <span>›</span>
          <a href="#">Buquês</a>
          <span>›</span>
          <span>Buquê com 6 Rosas Colombianas Vermelhas</span>
        </div>

        <div className="product-layout">
          <div>
            <div className="product-gallery__main">
              <img src={THUMBS[activeThumb]} alt="Buquê de Rosas Colombianas" />
              <div className="product-gallery__badge">
                <div className="product-gallery__badge-stars"><Stars n={mediaNotas} size={12} /></div>
                <div className="product-gallery__badge-name">Forma de Amor</div>
                <div className="product-gallery__badge-reviews">{avaliacoes.length} avaliações</div>
              </div>
            </div>

            <div className="product-gallery__thumbs">
              {THUMBS.map((src, i) => (
                <div key={i} className={`product-gallery__thumb ${activeThumb === i ? 'active' : ''}`} onClick={() => setActiveThumb(i)}>
                  <img src={src} alt={`foto ${i + 1}`} />
                </div>
              ))}
            </div>

            <div className="product-desc">
              <h2 className="product-desc__title">Buquê com 6 Rosas Colombianas Vermelhas</h2>
              <p className="product-desc__text">Elegante buquê de rosas colombianas vermelhas com seis rosas grandes, embrulhadas com carinho em papel de ceda branco, com base preta e amarrados por um sofisticado laço de cetim.</p>
            </div>

            <div className="reviews-section">
              <h3 className="reviews-section__title">Avaliações</h3>
              <div className="reviews-section__overall">
                <Stars n={mediaNotas} size={22} />
                <span>({avaliacoes.length})</span>
              </div>

              <form onSubmit={handleEnviarAvaliacao} className="review-form">
                <div className="review-form__row">
                  <label>Nota:</label>
                  <select value={nota} onChange={(e) => setNota(Number(e.target.value))}>
                    {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} estrela{n > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
                <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Conte como foi sua experiência..." rows={3} />
                <button type="submit" className="btn-login">Enviar avaliação</button>
                {envioMsg && <p style={{ color: '#14532d', marginTop: 8, fontSize: 13 }}>{envioMsg}</p>}
                {envioErro && <p style={{ color: '#9f1239', marginTop: 8, fontSize: 13 }}>{envioErro}</p>}
              </form>

              <div className="reviews-list">
                {avaliacoes.map((rev) => (
                  <div key={rev.id} className="review-item">
                    <div className="review-item__stars"><Stars n={Number(rev.nota || 5)} size={13} /></div>
                    <p className="review-item__text">{rev.comentario}</p>
                    <div className="review-item__name">{rev.clienteNome}</div>
                    <div className="review-item__date">{rev.criadoEm ? new Date(rev.criadoEm).toLocaleDateString('pt-BR') : 'Agora'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="purchase-panel">
              <div className="purchase-panel__source"><Stars n={mediaNotas} size={13} /><span className="purchase-panel__source-count">({avaliacoes.length})</span></div>
              <h1 className="purchase-panel__name">Forma de Amor</h1>
              <div><div className="purchase-panel__price">R$149<sup>,90</sup></div><div className="purchase-panel__price-sub">2x de 74,95</div></div>
              <hr className="panel-divider" />
              <div className="panel-info-row">✅ Disponível para todo Brasil</div>
              <div className="panel-info-row">⏱️ Entrega em até 3 horas</div>
              <hr className="panel-divider" />
              <div className="dates">
                {DELIVERY_DATES.map((d, i) => (
                  <button key={i} className={`date-btn ${selectedDate === i ? 'selected' : ''}`} onClick={() => setSelectedDate(i)}>
                    <div className="date-btn__short">{d.short}</div><div>{d.date}</div>
                    {selectedDate === i && <div className="date-btn__dot" />}
                  </button>
                ))}
              </div>
              <hr className="panel-divider" />
              <div className="quantity" style={{ marginBottom: 16 }}>
                <span className="quantity__label">Quantidade:</span>
                <div className="quantity__control">
                  <button className="quantity__btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <span className="quantity__value">{qty}</span>
                  <button className="quantity__btn" onClick={() => setQty((q) => q + 1)}>+</button>
                </div>
              </div>
              <button className="btn-buy" onClick={handleBuy}>Comprar para Amanhã</button>
            </div>
          </div>
        </div>

        <div className="related">
          <h2 className="related__title">Você também pode gostar</h2>
          <div className="related__divider" />
          <div className="related__grid">
            {relatedProducts.map((p) => (
              <MiniCard key={p.id} item={p} onClick={() => onNavigate('product')} onAddToCart={handleAddFromRelated} />
            ))}
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
