import { useState } from 'react';
import Stars from '../components/Stars.jsx';
import MiniCard from '../components/MiniCard.jsx';
import Footer from '../components/Footer.jsx';
import { IMAGES, RELATED, REVIEWS, DELIVERY_DATES } from '../data/index.js';

const PRODUCT = {
  id:    1,
  name:  'Buquê com 6 Rosas Colombianas Vermelhas',
  price: 149.90,
  img:   IMAGES.rose6,
};

const THUMBS = [
  IMAGES.product1,
  IMAGES.rose6,
  IMAGES.rose12,
  IMAGES.rose14,
];

const relatedProducts = Array.isArray(RELATED) ? RELATED : [];

export default function ProductPage({ onNavigate, onAddToCart }) {
  const [selectedDate, setSelectedDate] = useState(0);
  const [qty,          setQty]          = useState(1);
  const [activeThumb,  setActiveThumb]  = useState(0);

  const handleBuy = () => {
    // Java backend: POST /api/cart/add  { productId, quantity }
    onAddToCart && onAddToCart({ ...PRODUCT, qty });
    onNavigate('cart');
  };

  const handleAddFromRelated = (item) => {
    onAddToCart && onAddToCart({ ...item, qty: 1 });
  };

  return (
    <div>
      <div className="product-page">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Início</a>
          <span>›</span>
          <a href="#">Buquês</a>
          <span>›</span>
          <span>Buquê com 6 Rosas Colombianas Vermelhas</span>
        </div>

        <div className="product-layout">

          {/* ── LEFT — Gallery + description + reviews ────────────────── */}
          <div>

            {/* Main image */}
            <div className="product-gallery__main">
              <img src={THUMBS[activeThumb]} alt="Buquê de Rosas Colombianas" />
              <div className="product-gallery__badge">
                <div className="product-gallery__badge-stars">
                  <Stars n={5} size={12} />
                </div>
                <div className="product-gallery__badge-name">Forma de Amor</div>
                <div className="product-gallery__badge-reviews">1306 avaliações</div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="product-gallery__thumbs">
              {THUMBS.map((src, i) => (
                <div
                  key={i}
                  className={`product-gallery__thumb ${activeThumb === i ? 'active' : ''}`}
                  onClick={() => setActiveThumb(i)}
                >
                  <img src={src} alt={`foto ${i + 1}`} />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="product-desc">
              <h2 className="product-desc__title">
                Buquê com 6 Rosas Colombianas Vermelhas
              </h2>
              <p className="product-desc__text">
                Elegante buquê de rosas colombianas vermelhas com seis rosas grandes,
                embrulhadas com carinho em papel de ceda branco, com base preta e amarrados
                por um sofisticado laço de cetim. Romântico e delicado, é perfeito para
                surpreender a pessoa amada.
              </p>
              <div className="product-desc__warning">
                <span>⚠️</span>
                <span>
                  A imagem apresentada deste presente é similar ao produto que será oferecido,
                  podendo haver variações em suas características.
                </span>
              </div>
            </div>

            {/* Reviews */}
            <div className="reviews-section">
              <h3 className="reviews-section__title">Avaliações</h3>
              <div className="reviews-section__overall">
                <Stars n={5} size={22} />
                <span>(1306)</span>
              </div>
              <div className="reviews-list">
                {REVIEWS.map((rev, i) => (
                  <div key={i} className="review-item">
                    <div className="review-item__stars">
                      <Stars n={5} size={13} />
                    </div>
                    <p className="review-item__text">{rev.text}</p>
                    <div className="review-item__name">{rev.name}</div>
                    <div className="review-item__date">{rev.date}</div>
                  </div>
                ))}
              </div>
              <div className="reviews-section__all">
                <a href="#">Ver todas as avaliações</a>
              </div>
            </div>

          </div>

          {/* ── RIGHT — Purchase panel ───────────────────────────────── */}
          <div>
            <div className="purchase-panel">

              <div className="purchase-panel__source">
                <Stars n={5} size={13} />
                <span className="purchase-panel__source-count">(1306)</span>
              </div>

              <h1 className="purchase-panel__name">Forma de Amor</h1>

              <div>
                <div className="purchase-panel__price">
                  R$149<sup>,90</sup>
                </div>
                <div className="purchase-panel__price-sub">2x de 74,95</div>
              </div>

              <hr className="panel-divider" />

              {/* Delivery */}
              <div>
                <div className="panel-section__title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"/>
                    <path d="M16 8h4l3 3v5h-7V8z"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                  Informações de entrega
                </div>
                <div className="panel-info-row">✅ Disponível para todo Brasil</div>
                <div className="panel-info-row">⏱️ Entrega em até 3 horas</div>
              </div>

              <hr className="panel-divider" />

              {/* Address */}
              <div>
                <div className="panel-address-header">
                  <div className="panel-section__title" style={{ marginBottom: 0 }}>
                    📍 Endereço de entrega
                  </div>
                  <button className="panel-edit">Editar</button>
                </div>
                <div className="panel-address" style={{ marginTop: 8 }}>
                  Logradouro<br />
                  Bairro - Cidade - UF
                </div>
              </div>

              <hr className="panel-divider" />

              {/* Dates */}
              <div>
                <div className="panel-section__title">📅 Data de entrega</div>
                <div className="dates">
                  {DELIVERY_DATES.map((d, i) => (
                    <button
                      key={i}
                      className={`date-btn ${selectedDate === i ? 'selected' : ''}`}
                      onClick={() => setSelectedDate(i)}
                    >
                      <div className="date-btn__short">{d.short}</div>
                      <div>{d.date}</div>
                      {selectedDate === i && <div className="date-btn__dot" />}
                    </button>
                  ))}
                  <button className="date-more">+</button>
                </div>
              </div>

              <hr className="panel-divider" />

              {/* Quantity */}
              <div className="quantity" style={{ marginBottom: 16 }}>
                <span className="quantity__label">Quantidade:</span>
                <div className="quantity__control">
                  <button className="quantity__btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <span className="quantity__value">{qty}</span>
                  <button className="quantity__btn" onClick={() => setQty((q) => q + 1)}>+</button>
                </div>
              </div>

              {/* CTA */}
              <button className="btn-buy" onClick={handleBuy}>
                Comprar para Amanhã
              </button>

            </div>
          </div>

        </div>

        {/* Related products */}
        <div className="related">
          <h2 className="related__title">Você também pode gostar</h2>
          <div className="related__divider" />
          <div className="related__grid">
            {relatedProducts.map((p) => (
              <MiniCard
                key={p.id}
                item={p}
                onClick={() => onNavigate('product')}
                onAddToCart={handleAddFromRelated}
              />
            ))}
          </div>
        </div>

      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}