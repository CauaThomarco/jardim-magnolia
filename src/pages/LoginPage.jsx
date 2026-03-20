import { useState } from 'react';
import Footer from '../components/Footer.jsx';
import { IMAGES } from '../data/index.js';

export default function LoginPage({ onNavigate }) {
  const [email, setEmail]   = useState('');
  const [pass,  setPass]    = useState('');
  const [admin, setAdmin]   = useState('');

  // Java backend: POST /api/auth/login  { email, password }
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login payload:', { email, password: pass });
    // fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password: pass }) })
  };

  // Java backend: POST /api/auth/admin  { code }
  const handleAdmin = (e) => {
  e.preventDefault();
  if (admin.trim()) {
    onNavigate('admin'); // ← isso estava faltando
  }
 };

  return (
    <div>
      <div className="login-page">
        {/* Left — photo + tagline */}
        <div className="login-page__left">
          <img
            className="login-page__left-bg"
            src={IMAGES.login}
            alt="Flores"
          />
          <div className="login-page__left-overlay" />
          <div className="login-page__left-content">
            <h1 className="login-page__tagline">
              A incrível<br />magia das<br />
              <em>flores</em>
            </h1>
            <p className="login-page__sub">
              Flores colombianas frescas,<br />
              entregues com amor em todo o Brasil.
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div className="login-page__right">
          <div className="login-form">
            <h2 className="login-form__title">Entre na sua conta</h2>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                className="form-input"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-input"
                placeholder="Senha"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <button type="submit" className="btn-login">PRÓXIMO</button>
            </form>

            <div className="form-divider">
              <span>OU</span>
            </div>

            <button
              className="btn-register"
              onClick={() => console.log('Cadastro')}
            >
              CADASTRE-SE
            </button>

            <p className="form-terms">
              By registering, You agree to the Terms, Conditions and Policies
              of Borcelle &amp; Privacy Policy
            </p>

            {/* Admin section */}
            <h3 className="login-form__subtitle">Administrador</h3>

            <form onSubmit={handleAdmin}>
              <input
                type="text"
                className="form-input"
                placeholder="Código de acesso"
                value={admin}
                onChange={(e) => setAdmin(e.target.value)}
              />
              <button type="submit" className="btn-admin">ENTRAR</button>
            </form>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}