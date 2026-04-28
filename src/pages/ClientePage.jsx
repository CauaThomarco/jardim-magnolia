import { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer.jsx';
import { API } from '../hooks/useProdutos.js';

const STATUS_LABEL = {
  PENDENTE: 'Pendente',
  EM_ROTA: 'Em rota',
  ENTREGUE: 'Entregue',
  CANCELADO: 'Cancelado',
};

const currency = (v) => Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const ENDERECO_VAZIO = { apelido: '', cep: '', rua: '', bairro: '', numero: '', complemento: '', cidade: '', uf: '' };

export default function ClientePage({ cliente, onNavigate, onLogout }) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  // Avaliação
  const [showFormAvaliacao, setShowFormAvaliacao] = useState(false);
  const [formAvaliacao, setFormAvaliacao] = useState({ nota: 5, comentario: '', produtoNome: '' });
  const [salvandoAvaliacao, setSalvandoAvaliacao] = useState(false);
  const [erroAvaliacao, setErroAvaliacao] = useState('');
  const [avaliacaoEnviada, setAvaliacaoEnviada] = useState(false);

  // Endereços
  const [enderecos, setEnderecos] = useState([]);
  const [showFormEndereco, setShowFormEndereco] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formEndereco, setFormEndereco] = useState(ENDERECO_VAZIO);
  const [salvandoEndereco, setSalvandoEndereco] = useState(false);
  const [erroEndereco, setErroEndereco] = useState('');
  const [cepLoading, setCepLoading] = useState(false);
  const [ultimoCepBuscado, setUltimoCepBuscado] = useState('');

  const carregarPedidos = async () => {
    if (!cliente?.id) return;
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API}/pedidos/cliente/${cliente.id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Não foi possível carregar seus pedidos.');
      setPedidos(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar pedidos.');
    } finally {
      setLoading(false);
    }
  };

  const carregarEnderecos = async () => {
    if (!cliente?.id) return;
    try {
      const res = await fetch(`${API}/clientes/${cliente.id}/enderecos`);
      if (res.ok) setEnderecos(await res.json());
    } catch {}
  };

  useEffect(() => {
    carregarPedidos();
    carregarEnderecos();
  }, [cliente?.id]);

  const totalGasto = useMemo(() => pedidos.reduce((acc, p) => acc + Number(p.total || 0), 0), [pedidos]);
  const temCompra = pedidos.some((p) => p.status !== 'CANCELADO');

  const enviarAvaliacao = async (e) => {
    e.preventDefault();
    setSalvandoAvaliacao(true);
    setErroAvaliacao('');
    try {
      const res = await fetch(`${API}/avaliacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteId: String(cliente.id),
          nomeCliente: cliente.nome,
          comentario: formAvaliacao.comentario,
          produtoNome: formAvaliacao.produtoNome,
          nota: String(formAvaliacao.nota),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Não foi possível enviar avaliação.');
      setAvaliacaoEnviada(true);
      setShowFormAvaliacao(false);
    } catch (err) {
      setErroAvaliacao(err.message || 'Erro ao enviar avaliação.');
    } finally {
      setSalvandoAvaliacao(false);
    }
  };

  // CEP auto-preenchimento (mesmo padrão do CartPage)
  const buscarCep = async (cepValue = formEndereco.cep) => {
    const cepDigits = (cepValue || '').replace(/\D/g, '');
    if (cepDigits.length !== 8) return;
    try {
      setCepLoading(true);
      setErroEndereco('');
      const res = await fetch(`${API}/cep/${cepDigits}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'CEP não encontrado.');
      setFormEndereco((prev) => ({
        ...prev,
        cep: data.cep || prev.cep,
        rua: data.logradouro || prev.rua,
        bairro: data.bairro || prev.bairro,
        cidade: data.localidade || prev.cidade,
        uf: (data.uf || prev.uf || '').toUpperCase(),
      }));
      setUltimoCepBuscado(cepDigits);
    } catch (err) {
      setErroEndereco(err.message || 'CEP não encontrado.');
    } finally {
      setCepLoading(false);
    }
  };

  const updateCampo = (field, value) => {
    if (field === 'cep') {
      const mask = value.replace(/\D/g, '').slice(0, 8).replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
      setFormEndereco((prev) => ({ ...prev, cep: mask }));
      const digits = mask.replace(/\D/g, '');
      if (digits.length === 8 && digits !== ultimoCepBuscado) {
        buscarCep(mask);
      }
      return;
    }
    setFormEndereco((prev) => ({ ...prev, [field]: value }));
  };

  const abrirFormNovo = () => {
    setEditandoId(null);
    setFormEndereco(ENDERECO_VAZIO);
    setUltimoCepBuscado('');
    setErroEndereco('');
    setShowFormEndereco(true);
  };

  const iniciarEdicao = (end) => {
    setEditandoId(end.id);
    setFormEndereco({
      apelido:     end.apelido     || '',
      cep:         end.cep        || '',
      rua:         end.rua        || '',
      bairro:      end.bairro     || '',
      numero:      end.numero     || '',
      complemento: end.complemento || '',
      cidade:      end.cidade     || '',
      uf:          end.uf         || '',
    });
    setUltimoCepBuscado((end.cep || '').replace(/\D/g, ''));
    setErroEndereco('');
    setShowFormEndereco(true);
  };

  const salvarEndereco = async (e) => {
    e.preventDefault();
    setSalvandoEndereco(true);
    setErroEndereco('');
    try {
      const url = editandoId
        ? `${API}/clientes/${cliente.id}/enderecos/${editandoId}`
        : `${API}/clientes/${cliente.id}/enderecos`;
      const method = editandoId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formEndereco),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Não foi possível salvar o endereço.');
      setShowFormEndereco(false);
      setEditandoId(null);
      setFormEndereco(ENDERECO_VAZIO);
      carregarEnderecos();
    } catch (err) {
      setErroEndereco(err.message || 'Erro ao salvar endereço.');
    } finally {
      setSalvandoEndereco(false);
    }
  };

  const removerEndereco = async (id) => {
    if (!window.confirm('Remover este endereço?')) return;
    try {
      const res = await fetch(`${API}/clientes/${cliente.id}/enderecos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao remover endereço.');
      carregarEnderecos();
    } catch (err) {
      setErroEndereco(err.message || 'Não foi possível remover o endereço.');
    }
  };

  const solicitarDevolucao = async (pedidoId) => {
    try {
      setError('');
      setMsg('');
      const res = await fetch(`${API}/pedidos/${pedidoId}/devolucao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clienteId: cliente.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Não foi possível solicitar devolução.');
      setMsg(`Pedido #${pedidoId}: ${data.message || 'solicitação registrada com sucesso.'}`);
      carregarPedidos();
    } catch (err) {
      setError(err.message || 'Falha ao solicitar devolução.');
    }
  };

  const excluirConta = async () => {
    const confirmar = window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');
    if (!confirmar) return;
    try {
      setError('');
      const res = await fetch(`${API}/auth/clientes/${cliente.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Não foi possível excluir sua conta.');
      window.localStorage.removeItem('jm_cliente');
      onLogout?.();
      onNavigate('home');
    } catch (err) {
      setError(err.message || 'Não foi possível excluir conta.');
    }
  };

  if (!cliente?.id) {
    return (
      <div>
        <div className="institutional-page container">
          <h1>Minha Conta</h1>
          <p className="institutional-page__welcome">Faça login para acessar seus pedidos, devoluções e configurações da conta.</p>
          <button className="btn-login" onClick={() => onNavigate('login')}>Entrar na conta</button>
        </div>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div>
      <div className="institutional-page container cliente-page">
        <h1>Minha Conta</h1>
        <p className="institutional-page__welcome">Olá, {cliente.nome}! Aqui você acompanha compras e gerencia seus dados.</p>

        <div className="cliente-page__metrics">
          <div className="cliente-card"><strong>{pedidos.length}</strong><span>Pedidos realizados</span></div>
          <div className="cliente-card"><strong>{currency(totalGasto)}</strong><span>Total em compras</span></div>
          <div className="cliente-card"><strong>{pedidos.filter((p) => p.status === 'ENTREGUE').length}</strong><span>Pedidos entregues</span></div>
        </div>

        {/* Meus Endereços */}
        <section className="institutional-page__section">
          <h2>Meus Endereços</h2>

          {enderecos.length === 0 && !showFormEndereco && (
            <p style={{ color: '#777', fontSize: 14 }}>Nenhum endereço cadastrado ainda.</p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
            {enderecos.map((end) => (
              <div key={end.id} style={{
                background: '#f8f9f4', border: '1px solid #e2e8e0', borderRadius: 10,
                padding: '12px 16px', display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', gap: 12, flexWrap: 'wrap',
              }}>
                <div>
                  {end.apelido && (
                    <span style={{
                      background: '#1B3A2D', color: '#fff', fontSize: 11, fontWeight: 700,
                      borderRadius: 20, padding: '2px 10px', marginBottom: 6, display: 'inline-block',
                    }}>
                      {end.apelido}
                    </span>
                  )}
                  <p style={{ fontWeight: 500, margin: '4px 0 2px' }}>
                    {end.rua}, {end.numero}{end.complemento ? ` – ${end.complemento}` : ''}
                  </p>
                  <p style={{ fontSize: 13, color: '#666', margin: 0 }}>
                    {end.bairro} · {end.cidade}/{end.uf} · CEP {end.cep}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button className="btn-register" style={{ marginTop: 0, padding: '6px 14px', fontSize: 13 }} onClick={() => iniciarEdicao(end)}>
                    Editar
                  </button>
                  <button
                    onClick={() => removerEndereco(end.id)}
                    style={{
                      background: '#fee2e2', color: '#9f1239', border: 'none', borderRadius: 8,
                      padding: '6px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!showFormEndereco && (
            <button className="btn-register" onClick={abrirFormNovo} style={{ marginTop: 4 }}>
              + Adicionar endereço
            </button>
          )}

          {showFormEndereco && (
            <form onSubmit={salvarEndereco} style={{ marginTop: 16, display: 'grid', gap: 10 }}>
              <h3 style={{ margin: '0 0 4px', fontSize: 16 }}>
                {editandoId ? 'Editar endereço' : 'Novo endereço'}
              </h3>

              <input
                className="form-input"
                placeholder="Apelido (ex: Casa, Trabalho)"
                value={formEndereco.apelido}
                onChange={(e) => updateCampo('apelido', e.target.value)}
              />

              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  className="form-input"
                  placeholder="CEP"
                  value={formEndereco.cep}
                  onChange={(e) => updateCampo('cep', e.target.value)}
                  style={{ marginBottom: 0 }}
                />
                <button
                  type="button"
                  className="btn-register"
                  style={{ marginTop: 0, whiteSpace: 'nowrap' }}
                  onClick={() => buscarCep()}
                  disabled={cepLoading}
                >
                  {cepLoading ? 'Buscando...' : 'Buscar CEP'}
                </button>
              </div>

              <input
                className="form-input"
                placeholder="Rua / Logradouro"
                value={formEndereco.rua}
                onChange={(e) => updateCampo('rua', e.target.value)}
                required
              />
              <input
                className="form-input"
                placeholder="Bairro"
                value={formEndereco.bairro}
                onChange={(e) => updateCampo('bairro', e.target.value)}
                required
              />

              <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
                <input
                  className="form-input"
                  placeholder="Número"
                  value={formEndereco.numero}
                  onChange={(e) => updateCampo('numero', e.target.value)}
                  required
                  style={{ marginBottom: 0 }}
                />
                <input
                  className="form-input"
                  placeholder="Complemento (opcional)"
                  value={formEndereco.complemento}
                  onChange={(e) => updateCampo('complemento', e.target.value)}
                  style={{ marginBottom: 0 }}
                />
              </div>

              <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 90px' }}>
                <input
                  className="form-input"
                  placeholder="Cidade"
                  value={formEndereco.cidade}
                  onChange={(e) => updateCampo('cidade', e.target.value)}
                  required
                  style={{ marginBottom: 0 }}
                />
                <input
                  className="form-input"
                  placeholder="UF"
                  value={formEndereco.uf}
                  onChange={(e) => updateCampo('uf', e.target.value.toUpperCase())}
                  required
                  maxLength={2}
                  style={{ marginBottom: 0 }}
                />
              </div>

              {erroEndereco && <p style={{ color: '#9f1239', fontSize: 13, margin: 0 }}>{erroEndereco}</p>}

              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button type="submit" className="btn-login" disabled={salvandoEndereco}>
                  {salvandoEndereco ? 'Salvando...' : editandoId ? 'Salvar alterações' : 'Salvar endereço'}
                </button>
                <button
                  type="button"
                  className="btn-register"
                  onClick={() => { setShowFormEndereco(false); setEditandoId(null); setErroEndereco(''); }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Histórico de compras */}
        <section className="institutional-page__section">
          <h2>Histórico de compras</h2>
          {loading && <p>Carregando pedidos...</p>}
          {!loading && pedidos.length === 0 && <p>Você ainda não realizou compras.</p>}
          <div className="cliente-page__orders">
            {pedidos.map((pedido) => {
              const podeDevolver = pedido.status === 'ENTREGUE' || pedido.status === 'EM_ROTA';
              return (
                <article key={pedido.id} className="cliente-order">
                  <div>
                    <h3>Pedido #{pedido.id}</h3>
                    <p>Status: <strong>{STATUS_LABEL[pedido.status] || pedido.status}</strong></p>
                    <p>Total: {currency(pedido.total)}</p>
                    <p>Entrega: {pedido.enderecoEntrega}</p>
                  </div>
                  <div className="cliente-order__actions">
                    <button className="btn-register" style={{ marginTop: 0 }} onClick={() => onNavigate('contact')}>Suporte</button>
                    <button className="btn-login" onClick={() => solicitarDevolucao(pedido.id)} disabled={!podeDevolver}>
                      Solicitar devolução
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {temCompra && (
          <section className="institutional-page__section">
            <h2>Deixe sua avaliação</h2>
            <p style={{ color: '#777', fontSize: 14, marginBottom: 12 }}>
              Sua opinião ajuda outros clientes e melhora nosso serviço.
            </p>
            {avaliacaoEnviada ? (
              <p style={{ color: '#155724', fontWeight: 600, fontSize: 14 }}>
                ✅ Avaliação enviada! Ela será publicada após aprovação.
              </p>
            ) : !showFormAvaliacao ? (
              <button className="btn-register" onClick={() => setShowFormAvaliacao(true)}>
                Avaliar compra
              </button>
            ) : (
              <form onSubmit={enviarAvaliacao} style={{ display: 'grid', gap: 10, maxWidth: 480 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 8px' }}>Nota</p>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setFormAvaliacao((f) => ({ ...f, nota: n }))}
                        style={{
                          fontSize: 28, background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px',
                          color: formAvaliacao.nota >= n ? '#f59e0b' : '#d1d5db',
                          transition: 'color 0.15s',
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  className="form-input"
                  placeholder="Nome do produto (opcional)"
                  value={formAvaliacao.produtoNome}
                  onChange={(e) => setFormAvaliacao((f) => ({ ...f, produtoNome: e.target.value }))}
                />
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Conte sua experiência..."
                  value={formAvaliacao.comentario}
                  onChange={(e) => setFormAvaliacao((f) => ({ ...f, comentario: e.target.value }))}
                  required
                  style={{ resize: 'vertical', fontFamily: 'inherit' }}
                />
                {erroAvaliacao && <p style={{ color: '#9f1239', fontSize: 13, margin: 0 }}>{erroAvaliacao}</p>}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="submit" className="btn-login" disabled={salvandoAvaliacao}>
                    {salvandoAvaliacao ? 'Enviando...' : 'Enviar avaliação'}
                  </button>
                  <button
                    type="button"
                    className="btn-register"
                    onClick={() => { setShowFormAvaliacao(false); setErroAvaliacao(''); }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </section>
        )}

        <section className="institutional-page__section">
          <h2>Direitos do cliente</h2>
          <ul className="cliente-page__rights">
            <li>Solicitar devolução de pedidos elegíveis diretamente nesta página.</li>
            <li>Acessar histórico completo de compras e status de entrega.</li>
            <li>Solicitar atendimento e suporte da floricultura.</li>
            <li>Excluir conta e dados pessoais quando desejar.</li>
          </ul>
          <button className="cart-item__remove" onClick={excluirConta} style={{ position: 'static', marginTop: 12 }}>
            Excluir minha conta
          </button>
        </section>

        {error && <p className="cep-error">{error}</p>}
        {msg && <p style={{ marginTop: 10, color: '#155724', fontWeight: 600 }}>{msg}</p>}
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
