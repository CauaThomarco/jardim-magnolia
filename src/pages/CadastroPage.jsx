import { useState } from 'react';
import Footer from '../components/Footer.jsx';
import { API } from '../hooks/useProdutos.js';

function PasswordField({ value, onChange, placeholder, visible, onToggle }) {
  return (
    <div className="password-field">
      <input
        type={visible ? 'text' : 'password'}
        className="form-input password-field__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        minLength={6}
      />
      <button type="button" className="password-field__toggle" onClick={onToggle}>
        {visible ? '🙈' : '👁️'}
      </button>
    </div>
  );
}

export default function CadastroPage({ onNavigate, onCadastroRealizado }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setErro('');

    if (senha !== confirmacao) {
      setErro('As senhas não conferem.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/clientes/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Não foi possível cadastrar.');

      setMsg('Cadastro realizado com sucesso!');
      onCadastroRealizado?.(data);
      setTimeout(() => onNavigate('home'), 900);
    } catch (err) {
      const message = err?.message === 'Failed to fetch'
        ? 'Não foi possível conectar ao servidor. Verifique se o backend está rodando e liberado para este domínio.'
        : (err.message || 'Erro inesperado no cadastro.');
      setErro(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ maxWidth: 520, margin: '40px auto', padding: 24 }}>
        <div className="login-form" style={{ border: '1px solid #eee' }}>
          <h2 className="login-form__title">Criar conta</h2>
          <p className="login-form__subtitle" style={{ marginTop: 6, marginBottom: 20 }}>Cadastro de cliente</p>

          <form onSubmit={handleSubmit}>
            <input className="form-input" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
            <input type="email" className="form-input" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <PasswordField
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              visible={showSenha}
              onToggle={() => setShowSenha((prev) => !prev)}
            />
            <PasswordField
              value={confirmacao}
              onChange={(e) => setConfirmacao(e.target.value)}
              placeholder="Confirmar senha"
              visible={showConfirmacao}
              onToggle={() => setShowConfirmacao((prev) => !prev)}
            />

            <button type="submit" className="btn-login" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
          </form>

          {msg && <p style={{ color: '#14532d', marginTop: 12 }}>{msg}</p>}
          {erro && <p style={{ color: '#9f1239', marginTop: 12 }}>{erro}</p>}

          <button className="btn-register" onClick={() => onNavigate('login')} style={{ marginTop: 16 }}>Já tenho conta</button>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
