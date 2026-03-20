import { useState } from 'react';
import Footer from '../components/Footer.jsx';

// ─── Helpers ────────────────────────────────────────────────────────────────
const fmt = (n) => 'R$' + n.toFixed(2).replace('.', ',');

// ─── Empty state ─────────────────────────────────────────────────────────────
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
      <button className="cart-empty__btn" onClick={() => onNavigate('home')}>
        Ver produtos
      </button>
    </div>
  );
}

// ─── Cart Item Row ────────────────────────────────────────────────────────────
function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item__img">
        <img src={item.img} alt={item.name} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>

      <div className="cart-item__info">
        <p className="cart-item__source">Flores Online</p>
        <h3 className="cart-item__name">{item.name}</h3>
        <p className="cart-item__delivery">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/>
            <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          Entrega amanhã
        </p>
      </div>

      <div className="cart-item__qty">
        <button className="cart-item__qty-btn" onClick={() => onQtyChange(item.id, -1)}>−</button>
        <span className="cart-item__qty-val">{item.qty}</span>
        <button className="cart-item__qty-btn" onClick={() => onQtyChange(item.id, 1)}>+</button>
      </div>

      <div className="cart-item__price">{fmt(item.price * item.qty)}</div>

      <button className="cart-item__remove" onClick={() => onRemove(item.id)} title="Remover">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
        </svg>
      </button>
    </div>
  );
}

// ─── Order Summary ────────────────────────────────────────────────────────────
function OrderSummary({ items, onCheckout }) {
  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const shipping = subtotal > 200 ? 0 : 19.90;
  const total    = subtotal + shipping;

  return (
    <div className="cart-summary">
      <h2 className="cart-summary__title">Resumo do pedido</h2>

      <div className="cart-summary__rows">
        <div className="cart-summary__row">
          <span>Subtotal ({items.reduce((a, i) => a + i.qty, 0)} itens)</span>
          <span>{fmt(subtotal)}</span>
        </div>
        <div className="cart-summary__row">
          <span>Frete</span>
          <span className={shipping === 0 ? 'cart-summary__free' : ''}>
            {shipping === 0 ? 'Grátis' : fmt(shipping)}
          </span>
        </div>
        {shipping === 0 && (
          <div className="cart-summary__tag">
            ✅ Frete grátis para pedidos acima de R$200,00
          </div>
        )}
        {shipping > 0 && (
          <div className="cart-summary__tag cart-summary__tag--info">
            Adicione mais R${(200 - subtotal).toFixed(2).replace('.', ',')} para frete grátis
          </div>
        )}
      </div>

      <div className="cart-summary__divider" />

      <div className="cart-summary__total">
        <span>Total</span>
        <span>{fmt(total)}</span>
      </div>

      <div className="cart-summary__installment">
        em até 3x de {fmt(total / 3)} sem juros
      </div>

      {/* Coupon */}
      <div className="cart-summary__coupon">
        <input type="text" placeholder="Código de desconto" className="cart-summary__coupon-input" />
        <button className="cart-summary__coupon-btn">Aplicar</button>
      </div>

      <button className="cart-summary__checkout" onClick={onCheckout}>
        Finalizar compra
      </button>

      <div className="cart-summary__secure">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        Compra 100% segura
      </div>

      {/* Payment methods */}
      <div className="cart-summary__payments">
        <span className="cart-summary__pay-label">Aceitamos</span>
        <div className="cart-summary__pay-icons">
          {['Visa', 'Master', 'Pix', 'Boleto'].map((m) => (
            <div key={m} className="cart-summary__pay-chip">{m}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main CartPage ────────────────────────────────────────────────────────────
export default function CartPage({ cart, onNavigate, onQtyChange, onRemove }) {
  const [ordered, setOrdered] = useState(false);

  if (ordered) {
    return (
      <div>
        <div className="cart-success">
          <div className="cart-success__icon">✅</div>
          <h2 className="cart-success__title">Pedido realizado!</h2>
          <p className="cart-success__sub">
            Em breve você receberá uma confirmação por e-mail.<br />
            Entrega prevista para <strong>amanhã</strong>.
          </p>
          <button className="cart-success__btn" onClick={() => onNavigate('home')}>
            Continuar comprando
          </button>
        </div>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div>
      <div className="cart-page">
        {/* Header */}
        <div className="cart-page__header">
          <h1 className="cart-page__title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Meu carrinho
            {cart.length > 0 && (
              <span className="cart-page__count">{cart.reduce((a, i) => a + i.qty, 0)} itens</span>
            )}
          </h1>

          <button className="cart-page__back" onClick={() => onNavigate('home')}>
            ← Continuar comprando
          </button>
        </div>

        {cart.length === 0 ? (
          <CartEmpty onNavigate={onNavigate} />
        ) : (
          <div className="cart-layout">
            {/* Left — items list */}
            <div className="cart-items">
              <div className="cart-items__head">
                <span>Produto</span>
                <span>Quantidade</span>
                <span>Total</span>
              </div>

              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQtyChange={onQtyChange}
                  onRemove={onRemove}
                />
              ))}
            </div>

            {/* Right — summary */}
            <OrderSummary items={cart} onCheckout={() => setOrdered(true)} />
          </div>
        )}
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}