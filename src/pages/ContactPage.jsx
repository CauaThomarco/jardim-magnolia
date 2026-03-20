import { useState } from 'react';
import Footer from '../components/Footer.jsx';
import { IMAGES } from '../data/index.js';

export default function ContactPage({ onNavigate }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Java backend: POST /api/contact  { name, email, message }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact payload:', form);
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form),
    // });
  };

  return (
    <div>
      <div className="contact-page">
        {/* Left — photo + tagline */}
        <div className="contact-page__left">
          <img
            className="contact-page__left-bg"
            src={IMAGES.contact}
            alt="Flores"
          />
          <div className="contact-page__left-overlay" />
          <div className="contact-page__left-content">
            <h1 className="contact-page__tagline">
              Vamos<br />
              <em>florescer</em><br />
              juntos
            </h1>
            <p className="contact-page__sub">
              Não sabe quais flores escolher?
              Fale com nossos floristas e encontre
              o arranjo perfeito.
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div className="contact-page__right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Nome</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                className="form-input"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">E-mail</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                className="form-input"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-msg">Sua mensagem</label>
              <textarea
                id="contact-msg"
                name="message"
                className="form-input"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-send">Enviar</button>

            <p className="form-privacy">
              Seu nome de perfil no Canva não será compartilhado. Nunca envie senhas.
            </p>
          </form>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}