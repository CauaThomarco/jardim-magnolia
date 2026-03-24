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

export default function ClientePage({ cliente, onNavigate, onLogout }) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

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

  useEffect(() => {
    carregarPedidos();
  }, [cliente?.id]);

  const totalGasto = useMemo(() => pedidos.reduce((acc, p) => acc + Number(p.total || 0), 0), [pedidos]);

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
        <p className="institutional-page__welcome">Olá, {cliente.nome}! Aqui você acompanha compras e gerencia seus direitos como cliente.</p>

        <div className="cliente-page__metrics">
          <div className="cliente-card"><strong>{pedidos.length}</strong><span>Pedidos realizados</span></div>
          <div className="cliente-card"><strong>{currency(totalGasto)}</strong><span>Total em compras</span></div>
          <div className="cliente-card"><strong>{pedidos.filter((p) => p.status === 'ENTREGUE').length}</strong><span>Pedidos entregues</span></div>
        </div>

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
