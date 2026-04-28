import { useState } from 'react';
import Footer from '../components/Footer.jsx';
import { API } from '../hooks/useProdutos.js';

const ASSUNTOS = [
  { value: '', label: 'Selecione o assunto...' },
  { value: 'Dúvida sobre pedido', label: '📦 Dúvida sobre pedido' },
  { value: 'Problema na entrega', label: '🚚 Problema na entrega' },
  { value: 'Devolução / Reembolso', label: '↩️ Devolução / Reembolso' },
  { value: 'Produto danificado', label: '🌹 Produto danificado' },
  { value: 'Dúvida antes de comprar', label: '💬 Dúvida antes de comprar' },
  { value: 'Elogio', label: '⭐ Elogio' },
  { value: 'Sugestão', label: '💡 Sugestão' },
  { value: 'Outro', label: '❓ Outro' },
];

const PEDIDO_ASSUNTOS = new Set(['Dúvida sobre pedido', 'Problema na entrega', 'Devolução / Reembolso', 'Produto danificado']);

export default function ContactPage({ onNavigate, cliente }) {
  const [form, setForm] = useState({
    nome: cliente?.nome || '',
    email: cliente?.email || '',
    assunto: '',
    numeroPedido: '',
    mensagem: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.assunto) { setError('Selecione o assunto da sua mensagem.'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/contato`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Não foi possível enviar a mensagem.');
      setSucesso(true);
    } catch (err) {
      setError(err.message || 'Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="contact-page">

        {/* ── Painel esquerdo ── */}
        <div className="contact-page__left">
          <div className="contact-page__left-overlay" />
          <div className="contact-page__left-content">
            <h1 className="contact-page__tagline">
              Estamos<br />
              <em>aqui</em><br />
              por você
            </h1>
            <p className="contact-page__sub">
              Nossa equipe responde em até 24 horas em dias úteis.
              Temos floristas especialistas prontos para ajudar.
            </p>

            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '📧', label: 'E-mail', value: 'contato@jardimmagnolia.com.br' },
                { icon: '📱', label: 'WhatsApp', value: '(11) 9 9999-0000' },
                { icon: '🕐', label: 'Atendimento', value: 'Seg–Sex 8h–18h · Sáb 9h–14h' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Painel direito ── */}
        <div className="contact-page__right">
          {sucesso ? (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <h2 style={{ color: '#1B3A2D', marginBottom: 12 }}>Mensagem enviada!</h2>
              <p style={{ color: '#555', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                Recebemos sua mensagem e retornaremos em até <strong>24 horas</strong> para o e-mail <strong>{form.email}</strong>.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-login" onClick={() => onNavigate('home')}>Voltar à loja</button>
                <button className="btn-register" style={{ marginTop: 0 }} onClick={() => { setSucesso(false); setForm({ nome: cliente?.nome || '', email: cliente?.email || '', assunto: '', numeroPedido: '', mensagem: '' }); }}>
                  Enviar outra mensagem
                </button>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 style={{ fontSize: 22, color: '#1B3A2D', marginBottom: 6 }}>Fale com o suporte</h2>
              <p style={{ color: '#888', fontSize: 13, marginBottom: 24 }}>Preencha o formulário e responderemos em breve.</p>

              <div className="form-group">
                <label htmlFor="c-nome">Nome completo *</label>
                <input
                  id="c-nome"
                  className="form-input"
                  value={form.nome}
                  onChange={(e) => update('nome', e.target.value)}
                  required
                  placeholder="Seu nome"
                />
              </div>

              <div className="form-group">
                <label htmlFor="c-email">E-mail *</label>
                <input
                  id="c-email"
                  type="email"
                  className="form-input"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  required
                  placeholder="seu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="c-assunto">Assunto *</label>
                <select
                  id="c-assunto"
                  className="form-input"
                  value={form.assunto}
                  onChange={(e) => update('assunto', e.target.value)}
                  style={{ cursor: 'pointer' }}
                >
                  {ASSUNTOS.map((a) => (
                    <option key={a.value} value={a.value} disabled={a.value === ''}>{a.label}</option>
                  ))}
                </select>
              </div>

              {PEDIDO_ASSUNTOS.has(form.assunto) && (
                <div className="form-group">
                  <label htmlFor="c-pedido">Número do pedido (opcional)</label>
                  <input
                    id="c-pedido"
                    className="form-input"
                    value={form.numeroPedido}
                    onChange={(e) => update('numeroPedido', e.target.value)}
                    placeholder="Ex: 00042"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="c-msg">Mensagem *</label>
                <textarea
                  id="c-msg"
                  className="form-input"
                  rows={5}
                  value={form.mensagem}
                  onChange={(e) => update('mensagem', e.target.value)}
                  required
                  placeholder="Descreva sua dúvida ou situação com o máximo de detalhes possível..."
                  style={{ resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              {error && <p style={{ color: '#9f1239', fontSize: 13, marginBottom: 8 }}>{error}</p>}

              <button type="submit" className="btn-send" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar mensagem'}
              </button>

              <p style={{ fontSize: 12, color: '#aaa', marginTop: 12 }}>
                Seus dados são usados apenas para responder sua solicitação. Ver{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('politica-privacidade')}
                  style={{ background: 'none', border: 'none', color: '#1B3A2D', textDecoration: 'underline', cursor: 'pointer', fontSize: 12, padding: 0 }}
                >
                  Política de Privacidade
                </button>.
              </p>
            </form>
          )}
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
