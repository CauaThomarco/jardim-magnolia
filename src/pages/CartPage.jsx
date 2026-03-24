import { useMemo, useState } from 'react';
import Footer from '../components/Footer.jsx';
import { API } from '../hooks/useProdutos.js';

const fmt = (n) => 'R$' + n.toFixed(2).replace('.', ',');

function CartEmpty({ onNavigate }) {
  return (
    <div className="cart-empty">
      <div className="cart-empty__icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </div>
      <h2 className="cart-empty__title">Seu carrinho está vazio</h2>
      <p className="cart-empty__sub">Adicione flores e presentes especiais para continuar.</p>
      <button className="cart-empty__btn" onClick={() => onNavigate('home')}>Ver produtos</button>
    </div>
  );
}

function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item__img"><img src={item.img} alt={item.name} onError={(e) => { e.currentTarget.style.display = 'none'; }} /></div>
      <div className="cart-item__info">
        <p className="cart-item__source">Flores Online</p>
        <h3 className="cart-item__name">{item.name}</h3>
        <p className="cart-item__delivery">🚚 Entrega amanhã</p>
      </div>
      <div className="cart-item__qty">
        <button className="cart-item__qty-btn" onClick={() => onQtyChange(item.id, -1)}>−</button>
        <span className="cart-item__qty-val">{item.qty}</span>
        <button className="cart-item__qty-btn" onClick={() => onQtyChange(item.id, 1)}>+</button>
      </div>
      <div className="cart-item__price">{fmt(item.price * item.qty)}</div>
      <button className="cart-item__remove" onClick={() => onRemove(item.id)} title="Remover">✕</button>
    </div>
  );
}

function CheckoutForm({ cliente, onChange }) {
  return (
    <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
      <input className="form-input" placeholder="Nome completo" value={cliente.nome} onChange={(e) => onChange('nome', e.target.value)} required />
      <input className="form-input" type="email" placeholder="E-mail" value={cliente.email} onChange={(e) => onChange('email', e.target.value)} required />
      <input className="form-input" placeholder="Telefone" value={cliente.telefone} onChange={(e) => onChange('telefone', e.target.value)} required />
      <input className="form-input" placeholder="Endereço de entrega" value={cliente.endereco} onChange={(e) => onChange('endereco', e.target.value)} required />
      <div className="cart-summary__tag" style={{ marginTop: 2 }}>
        Pagamento: <strong>Dinheiro na hora da entrega</strong>
      </div>
    </div>
  );
}

function OrderSummary({ items, cliente, onClienteChange, onCheckout, loading, error }) {
  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const shipping = subtotal > 200 ? 0 : 19.90;
  const total = subtotal + shipping;

  return (
    <div className="cart-summary">
      <h2 className="cart-summary__title">Resumo do pedido</h2>
      <div className="cart-summary__rows">
        <div className="cart-summary__row"><span>Subtotal ({items.reduce((a, i) => a + i.qty, 0)} itens)</span><span>{fmt(subtotal)}</span></div>
        <div className="cart-summary__row"><span>Frete</span><span className={shipping === 0 ? 'cart-summary__free' : ''}>{shipping === 0 ? 'Grátis' : fmt(shipping)}</span></div>
      </div>
      <div className="cart-summary__divider" />
      <div className="cart-summary__total"><span>Total</span><span>{fmt(total)}</span></div>

      <CheckoutForm cliente={cliente} onChange={onClienteChange} />

      <button className="cart-summary__checkout" onClick={() => onCheckout({ subtotal, shipping, total })} disabled={loading}>
        {loading ? 'Enviando pedido...' : 'Finalizar compra'}
      </button>

      {error && <p style={{ color: '#9f1239', marginTop: 8, fontSize: 13 }}>{error}</p>}

      <div className="cart-summary__payments">
        <span className="cart-summary__pay-label">Aceitamos</span>
        <div className="cart-summary__pay-icons">
          <div className="cart-summary__pay-chip">Dinheiro na entrega</div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage({ cart, onNavigate, onQtyChange, onRemove, onOrderFinished, cliente }) {
  const [ordered, setOrdered] = useState(false);
  const [pedidoId, setPedidoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dadosCliente, setDadosCliente] = useState({
    nome: cliente?.nome || '',
    email: cliente?.email || '',
    telefone: '',
    endereco: '',
  });

  const total = useMemo(() => {
    const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
    return subtotal + (subtotal > 200 ? 0 : 19.90);
  }, [cart]);

  const updateCliente = (field, value) => setDadosCliente((prev) => ({ ...prev, [field]: value }));

  const handleCheckout = async () => {
    setError('');

    if (!dadosCliente.nome || !dadosCliente.email || !dadosCliente.telefone || !dadosCliente.endereco) {
      setError('Preencha todos os dados para finalizar o pedido.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        clienteNome: dadosCliente.nome,
        clienteEmail: dadosCliente.email,
        clienteTelefone: dadosCliente.telefone,
        enderecoEntrega: dadosCliente.endereco,
        metodoPagamento: 'DINHEIRO_NA_ENTREGA',
        total,
      };

      const res = await fetch(`${API}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Não foi possível finalizar o pedido.');

      setPedidoId(data.id);
      setOrdered(true);
      onOrderFinished?.();
    } catch (err) {
      setError(err.message || 'Erro inesperado ao criar pedido.');
    } finally {
      setLoading(false);
    }
  };

  if (ordered) {
    return (
      <div>
        <div className="cart-success">
          <div className="cart-success__icon">✅</div>
          <h2 className="cart-success__title">Pedido realizado!</h2>
          <p className="cart-success__sub">
            Pedido #{pedidoId || '—'} aguardando aprovação do pagamento em dinheiro.<br />
            Após aprovação, a administração marcará como <strong>Em rota</strong> e depois <strong>Entregue</strong>.
          </p>
          <button className="cart-success__btn" onClick={() => onNavigate('home')}>Continuar comprando</button>
        </div>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div>
      <div className="cart-page">
        <div className="cart-page__header">
          <h1 className="cart-page__title">Meu carrinho</h1>
          <button className="cart-page__back" onClick={() => onNavigate('home')}>← Continuar comprando</button>
        </div>

        {cart.length === 0 ? (
          <CartEmpty onNavigate={onNavigate} />
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              <div className="cart-items__head"><span>Produto</span><span>Quantidade</span><span>Total</span></div>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} onQtyChange={onQtyChange} onRemove={onRemove} />
              ))}
            </div>
            <OrderSummary
              items={cart}
              cliente={dadosCliente}
              onClienteChange={updateCliente}
              onCheckout={handleCheckout}
              loading={loading}
              error={error}
            />
          </div>
        )}
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
