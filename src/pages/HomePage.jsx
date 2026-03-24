import Carousel from '../components/Carousel.jsx';
import Stars from '../components/Stars.jsx';
import Footer from '../components/Footer.jsx';
import { useProdutos, CATEGORIA_LABELS } from '../hooks/useProdutos.js';
import { HOW_TO, GIFT_CATEGORIES, IMAGES } from '../data/index.js';

const CAROUSEL_ORDER = ['BUQUES', 'ORQUIDEAS', 'ANIVERSARIO', 'ROSAS', 'CAMPO', 'PRESENTES', 'CESTAS', 'PLANTAS'];

export default function HomePage({ onNavigate, onAddToCart, searchTerm = '' }) {
  const { grupos, loading } = useProdutos();

  const termo = searchTerm.trim().toLowerCase();
  const gruposFiltrados = CAROUSEL_ORDER.reduce((acc, cat) => {
    const items = grupos[cat] || [];
    acc[cat] = !termo ? items : items.filter((item) => item.name.toLowerCase().includes(termo));
    return acc;
  }, {});

  const totalResultados = Object.values(gruposFiltrados).reduce((sum, list) => sum + list.length, 0);

  return (
    <div className="home">
      <div className="hero">
        <div className="hero__content">
          <span className="hero__tag">Presentes Únicos</span>
          <h1 className="hero__title">
            Presentes para quem você ama<br />
            <em>entregues hoje em todo o Brasil</em>
          </h1>
          <p className="hero__sub">Flores colombianas frescas • Entrega em até 3 horas</p>
          <button className="hero__btn" onClick={() => onNavigate('product')}>
            Confira
          </button>
        </div>
        <div className="hero__map">
          <img
            src={IMAGES.hero}
            alt="Entrega de flores"
            style={{ filter: 'brightness(0.45) saturate(0.6)' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(27,58,45,0.9) 0%, rgba(27,58,45,0.1) 60%)',
          }} />
        </div>
      </div>

      <div className="container">
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-500)' }}>
            <div className="home-loading-spinner" />
            <p style={{ marginTop: 12, fontSize: 14 }}>Carregando produtos...</p>
          </div>
        )}

        {!loading && termo && (
          <p style={{ color: 'var(--gray-500)', marginBottom: 18 }}>
            Resultados para <strong>"{searchTerm}"</strong>: {totalResultados}
          </p>
        )}

        {!loading && CAROUSEL_ORDER.map((cat) => {
          const items = gruposFiltrados[cat];
          if (!items || items.length === 0) return null;
          return (
            <Carousel
              key={cat}
              title={CATEGORIA_LABELS[cat] || cat}
              items={items}
              onItemClick={() => onNavigate('product')}
              onAddToCart={onAddToCart}
            />
          );
        })}

        {!loading && termo && totalResultados === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--gray-500)', margin: '20px 0 32px' }}>
            Nenhum produto encontrado com esse termo.
          </div>
        )}

        <div className="section">
          <div className="section__header">
            <h2 className="section__title">Como é comprar com a gente?</h2>
          </div>
          <p style={{ color: 'var(--gray-500)', fontSize: 14, marginBottom: 20 }}>
            Avaliações de clientes reais
          </p>
          <div className="reviews-grid">
            {HOW_TO.map((h, i) => (
              <div key={i} className="review-card">
                <div className="review-card__stars">
                  <Stars n={5} size={13} />
                </div>
                <p className="review-card__text">{h.text}</p>
                <div className="review-card__name">{h.person}</div>
                <div className="review-card__date">{h.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section__header">
            <h2 className="section__title">Presentes Online</h2>
            <button
              className="section__ver-todos"
              onClick={() => onNavigate('presentes')}
            >
              Ver todos →
            </button>
          </div>
          <div className="gifts-grid">
            {GIFT_CATEGORIES.map((g, i) => (
              <div
                key={i}
                className="gift-item"
                onClick={() => onNavigate('presentes', { categoria: g.categoria })}
              >
                <div className="gift-item__emoji">{g.emoji}</div>
                <div className="gift-item__label">{g.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
