import { useState } from 'react';
import Carousel from '../components/Carousel.jsx';
import Stars from '../components/Stars.jsx';
import Footer from '../components/Footer.jsx';
import {
  BOUQUETS, ORCHIDS, BIRTHDAY, ROSES, CAMPO,
  HOW_TO, GIFT_CATEGORIES, IMAGES,
} from '../data/index.js';

export default function HomePage({ onNavigate, onAddToCart }) {
  return (
    <div className="home">
      {/* Hero */}
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

        {/* Map placeholder */}
        <div className="hero__map">
          <img
            src={IMAGES.hero}
            alt="Entrega de flores"
            style={{ filter: 'brightness(0.45) saturate(0.6)' }}
          />
          {/* Map overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(27,58,45,0.9) 0%, rgba(27,58,45,0.1) 60%)',
          }} />
        </div>
      </div>

      {/* Carousels */}
      <div className="container">
        <Carousel
          title="Buquês de Flores"
          items={BOUQUETS}
          onItemClick={() => onNavigate('product')}
          onAddToCart={onAddToCart}
        />

        <Carousel
          title="Orquídeas"
          items={ORCHIDS}
          onItemClick={() => onNavigate('product')}
          onAddToCart={onAddToCart}
        />

        <Carousel
          title="Presentes de Aniversário"
          items={BIRTHDAY}
          onItemClick={() => onNavigate('product')}
          onAddToCart={onAddToCart}
        />

        <Carousel
          title="Rosas"
          items={ROSES}
          onItemClick={() => onNavigate('product')}
          onAddToCart={onAddToCart}
        />

        <Carousel
          title="Flores do Campo"
          items={CAMPO}
          onItemClick={() => onNavigate('product')}
          onAddToCart={onAddToCart}
        />

        {/* How to buy */}
        <div className="section">
          <h2 className="section__title text-center">Como é comprar com a gente?</h2>
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', fontSize: 14, marginTop: 4, marginBottom: 20 }}>
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

        {/* Online gifts */}
        <div className="section">
          <h2 className="section__title text-center">Presentes Online</h2>
          <div className="gifts-grid">
            {GIFT_CATEGORIES.map((g, i) => (
              <div key={i} className="gift-item">
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