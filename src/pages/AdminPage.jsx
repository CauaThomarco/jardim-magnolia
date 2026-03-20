import { useState, useEffect } from 'react';

// ─── API base ─────────────────────────────────────────────────────────────────
const API = 'http://localhost:8080/api';

const fmt = (n = 0) =>
  'R$' + Number(n).toFixed(2).replace('.', ',');

// ─── Mock data (usado enquanto o backend não está rodando) ────────────────────
const MOCK = {
  dashboard: {
    vendasMes:      18450.90,
    pedidosMes:     143,
    entregasPendentes: 12,
    lucroMes:       9820.40,
    ticketMedio:    129.03,
    crescimento:    '+14,3%',
  },
  pedidos: [
    { id: '#00143', cliente: 'Ana Beatriz', produto: 'Buquê 6 Rosas', valor: 149.90, status: 'entregue',  data: '18/03/2026' },
    { id: '#00142', cliente: 'Pedro Cruz',  produto: 'Cesta Margaridas', valor: 210.00, status: 'em_rota', data: '18/03/2026' },
    { id: '#00141', cliente: 'Mario Julie', produto: 'Orquídea Pink',  valor: 179.41, status: 'em_rota', data: '17/03/2026' },
    { id: '#00140', cliente: 'Lauro M.',    produto: 'Buquê 30 Rosas', valor: 349.90, status: 'pendente', data: '17/03/2026' },
    { id: '#00139', cliente: 'Carla S.',    produto: 'Arranjo Rosas',  valor: 478.36, status: 'entregue', data: '16/03/2026' },
    { id: '#00138', cliente: 'Fernanda R.', produto: 'Buquê 14 Rosas', valor: 153.39, status: 'cancelado',data: '16/03/2026' },
  ],
  produtos: [
    { id: 1, nome: 'Buquê com 6 Rosas Colombianas Vermelhas', preco: 149.90, estoque: 28, ativo: true,  img: 'https://images.unsplash.com/photo-1548198471-a99ba4f98f70?w=80&q=70' },
    { id: 2, nome: 'Buquê de Rosas Pink Plantation',          preco: 189.90, estoque: 15, ativo: true,  img: 'https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?w=80&q=70' },
    { id: 3, nome: 'Cesta com Buquê de Margaridas',           preco: 210.00, estoque: 8,  ativo: true,  img: 'https://images.unsplash.com/photo-1541680760496-42f5571b7e3f?w=80&q=70' },
    { id: 4, nome: 'Orquídea Phalaenopsis Pink',              preco: 179.41, estoque: 0,  ativo: false, img: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=80&q=70' },
    { id: 5, nome: 'Buquê de 30 Rosas Colombianas',          preco: 349.90, estoque: 5,  ativo: true,  img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc2f?w=80&q=70' },
  ],
};

// ─── Status badge ─────────────────────────────────────────────────────────────
const STATUS_MAP = {
  pendente:  { label: 'Pendente',   color: '#856404', bg: '#fff3cd' },
  em_rota:   { label: 'Em rota',    color: '#155724', bg: '#d4edda' },
  entregue:  { label: 'Entregue',   color: '#0c5460', bg: '#d1ecf1' },
  cancelado: { label: 'Cancelado',  color: '#721c24', bg: '#f8d7da' },
};

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || { label: status, color: '#555', bg: '#eee' };
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: '3px 10px', borderRadius: 20,
      fontSize: 12, fontWeight: 600,
    }}>
      {s.label}
    </span>
  );
}

// ─── Metric card ──────────────────────────────────────────────────────────────
function MetricCard({ icon, label, value, sub, color = '#1B3A2D' }) {
  return (
    <div className="adm-metric">
      <div className="adm-metric__icon" style={{ background: color + '18', color }}>
        {icon}
      </div>
      <div>
        <p className="adm-metric__label">{label}</p>
        <p className="adm-metric__value" style={{ color }}>{value}</p>
        {sub && <p className="adm-metric__sub">{sub}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: Dashboard
// ─────────────────────────────────────────────────────────────────────────────
function TabDashboard() {
  const d = MOCK.dashboard;

  const metrics = [
    { icon: '💰', label: 'Vendas do mês',        value: fmt(d.vendasMes),       sub: d.crescimento + ' vs mês anterior', color: '#1B8A4F' },
    { icon: '📦', label: 'Pedidos do mês',        value: d.pedidosMes,           sub: `Ticket médio ${fmt(d.ticketMedio)}`,  color: '#1B3A2D' },
    { icon: '🚚', label: 'Entregas pendentes',    value: d.entregasPendentes,    sub: 'Hoje',                               color: '#856404' },
    { icon: '📈', label: 'Lucro do mês',          value: fmt(d.lucroMes),        sub: '53,2% de margem',                    color: '#0c5460' },
  ];

  return (
    <div>
      <div className="adm-metrics-grid">
        {metrics.map((m, i) => <MetricCard key={i} {...m} />)}
      </div>

      <div className="adm-section-title" style={{ marginTop: 32 }}>Últimos pedidos</div>
      <OrderTable rows={MOCK.pedidos.slice(0, 4)} compact />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: Pedidos
// ─────────────────────────────────────────────────────────────────────────────
function OrderTable({ rows, compact = false }) {
  return (
    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Status</th>
            {!compact && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id}>
              <td><span className="adm-order-id">{p.id}</span></td>
              <td>{p.cliente}</td>
              <td>{p.produto}</td>
              <td style={{ fontWeight: 600 }}>{fmt(p.valor)}</td>
              <td style={{ color: '#777' }}>{p.data}</td>
              <td><StatusBadge status={p.status} /></td>
              {!compact && (
                <td>
                  <button className="adm-btn-sm adm-btn-outline">Ver</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TabPedidos() {
  const [filter, setFilter] = useState('todos');
  const filtered = filter === 'todos'
    ? MOCK.pedidos
    : MOCK.pedidos.filter((p) => p.status === filter);

  return (
    <div>
      <div className="adm-filter-row">
        {['todos', 'pendente', 'em_rota', 'entregue', 'cancelado'].map((f) => (
          <button
            key={f}
            className={`adm-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'todos' ? 'Todos' : STATUS_MAP[f]?.label}
          </button>
        ))}
      </div>
      <OrderTable rows={filtered} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: Entregas
// ─────────────────────────────────────────────────────────────────────────────
function TabEntregas() {
  const pendentes = MOCK.pedidos.filter((p) => p.status === 'em_rota' || p.status === 'pendente');

  return (
    <div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <MetricCard icon="⏳" label="Pendentes"  value={MOCK.pedidos.filter(p => p.status === 'pendente').length}  color="#856404" />
        <MetricCard icon="🚚" label="Em rota"    value={MOCK.pedidos.filter(p => p.status === 'em_rota').length}   color="#155724" />
        <MetricCard icon="✅" label="Entregues hoje" value={MOCK.pedidos.filter(p => p.status === 'entregue').length} color="#0c5460" />
      </div>

      <div className="adm-section-title">Entregas em aberto</div>
      <div className="adm-deliveries">
        {pendentes.map((p) => (
          <div key={p.id} className="adm-delivery-card">
            <div className="adm-delivery-card__left">
              <span className="adm-order-id">{p.id}</span>
              <div>
                <strong>{p.cliente}</strong>
                <p style={{ fontSize: 13, color: '#666', margin: '2px 0 0' }}>{p.produto}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <StatusBadge status={p.status} />
              <button className="adm-btn-sm adm-btn-green">Confirmar entrega</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB: Produtos
// ─────────────────────────────────────────────────────────────────────────────
const EMPTY_PRODUCT = { nome: '', preco: '', estoque: '', descricao: '', imgFile: null, imgPreview: null };

function TabProdutos() {
  const [produtos, setProdutos] = useState(MOCK.produtos);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, imgFile: file, imgPreview: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleEdit = (p) => {
    setEditing(p.id);
    setForm({ nome: p.nome, preco: p.preco, estoque: p.estoque, descricao: p.descricao || '', imgFile: null, imgPreview: p.img });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Remover este produto?')) return;
    setProdutos((prev) => prev.filter((p) => p.id !== id));
    // Java backend: DELETE /api/produtos/{id}
  };

  const handleToggle = (id) => {
    setProdutos((prev) =>
      prev.map((p) => p.id === id ? { ...p, ativo: !p.ativo } : p)
    );
    // Java backend: PATCH /api/produtos/{id}/toggle
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Java backend: POST /api/produtos (FormData com imagem)
    // const formData = new FormData();
    // formData.append('nome', form.nome);
    // formData.append('preco', form.preco);
    // formData.append('estoque', form.estoque);
    // formData.append('descricao', form.descricao);
    // if (form.imgFile) formData.append('imagem', form.imgFile);
    // await fetch(`${API}/produtos${editing ? '/' + editing : ''}`, {
    //   method: editing ? 'PUT' : 'POST',
    //   body: formData,
    // });

    await new Promise((r) => setTimeout(r, 600)); // simula delay

    if (editing) {
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === editing
            ? { ...p, nome: form.nome, preco: Number(form.preco), estoque: Number(form.estoque), img: form.imgPreview || p.img }
            : p
        )
      );
    } else {
      const novo = {
        id: Date.now(),
        nome: form.nome,
        preco: Number(form.preco),
        estoque: Number(form.estoque),
        ativo: true,
        img: form.imgPreview || '',
      };
      setProdutos((prev) => [novo, ...prev]);
    }

    setSaving(false);
    setShowForm(false);
    setEditing(null);
    setForm(EMPTY_PRODUCT);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 14, color: '#666' }}>{produtos.length} produtos cadastrados</span>
        <button className="adm-btn-green" onClick={() => { setShowForm(true); setEditing(null); setForm(EMPTY_PRODUCT); }}>
          + Novo produto
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="adm-modal-bg">
          <div className="adm-modal">
            <div className="adm-modal__header">
              <h3>{editing ? 'Editar produto' : 'Novo produto'}</h3>
              <button className="adm-modal__close" onClick={() => setShowForm(false)}>✕</button>
            </div>

            <form onSubmit={handleSave} className="adm-form">
              {/* Image upload */}
              <div className="adm-form__img-upload">
                {form.imgPreview
                  ? <img src={form.imgPreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} />
                  : <div className="adm-form__img-placeholder">
                      <span style={{ fontSize: 32 }}>🌹</span>
                      <span style={{ fontSize: 12, color: '#999', marginTop: 6 }}>Clique para adicionar foto</span>
                    </div>
                }
                <input type="file" accept="image/*" onChange={handleImgChange} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
              </div>

              <div className="adm-form__row">
                <div className="adm-form__group adm-form__group--full">
                  <label>Nome do produto *</label>
                  <input name="nome" value={form.nome} onChange={handleChange} required placeholder="Ex: Buquê de Rosas Vermelhas" />
                </div>
              </div>

              <div className="adm-form__row">
                <div className="adm-form__group">
                  <label>Preço (R$) *</label>
                  <input name="preco" type="number" step="0.01" value={form.preco} onChange={handleChange} required placeholder="149.90" />
                </div>
                <div className="adm-form__group">
                  <label>Estoque *</label>
                  <input name="estoque" type="number" value={form.estoque} onChange={handleChange} required placeholder="20" />
                </div>
              </div>

              <div className="adm-form__group adm-form__group--full">
                <label>Descrição</label>
                <textarea name="descricao" value={form.descricao} onChange={handleChange} rows={3} placeholder="Descrição do produto..." />
              </div>

              <div className="adm-form__actions">
                <button type="button" className="adm-btn-outline" onClick={() => setShowForm(false)}>Cancelar</button>
                <button type="submit" className="adm-btn-green" disabled={saving}>
                  {saving ? 'Salvando...' : editing ? 'Salvar alterações' : 'Cadastrar produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id} style={{ opacity: p.ativo ? 1 : 0.55 }}>
                <td>
                  <div style={{ width: 52, height: 44, borderRadius: 8, overflow: 'hidden', background: '#f5f0e4' }}>
                    {p.img && <img src={p.img} alt={p.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                  </div>
                </td>
                <td style={{ fontWeight: 500, maxWidth: 260 }}>{p.nome}</td>
                <td style={{ fontWeight: 600, color: '#1B3A2D' }}>{fmt(p.preco)}</td>
                <td>
                  <span style={{
                    fontWeight: 600,
                    color: p.estoque === 0 ? '#721c24' : p.estoque < 5 ? '#856404' : '#155724',
                  }}>
                    {p.estoque === 0 ? 'Sem estoque' : p.estoque + ' un.'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleToggle(p.id)}
                    style={{
                      background: p.ativo ? '#d4edda' : '#f8d7da',
                      color:      p.ativo ? '#155724' : '#721c24',
                      border: 'none', borderRadius: 20, padding: '3px 12px',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    {p.ativo ? 'Ativo' : 'Inativo'}
                  </button>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="adm-btn-sm adm-btn-outline" onClick={() => handleEdit(p)}>✏️ Editar</button>
                    <button className="adm-btn-sm adm-btn-danger"  onClick={() => handleDelete(p.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin Login
// ─────────────────────────────────────────────────────────────────────────────
const ADMIN_CODE = 'JARDIM@2026'; // Java backend valida: POST /api/auth/admin

function AdminLogin({ onLogin }) {
  const [code,  setCode]  = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Java backend: POST /api/auth/admin  { code }
    // const res = await fetch(`${API}/auth/admin`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ code }),
    // });
    // if (!res.ok) { setError('Código inválido.'); setLoading(false); return; }

    await new Promise((r) => setTimeout(r, 500));

    if (code === ADMIN_CODE) {
      onLogin();
    } else {
      setError('Código de acesso inválido.');
    }
    setLoading(false);
  };

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card">
        <div className="adm-login-logo">
          <svg width="54" height="54" viewBox="0 0 118 118" fill="none">
            <ellipse cx="59" cy="59" rx="55" ry="55" stroke="#1B3A2D" strokeWidth="1.8"/>
            <ellipse cx="59" cy="59" rx="50" ry="50" stroke="#1B3A2D" strokeWidth="0.8"/>
            <text x="59" y="65" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fontWeight="700" fill="#1B3A2D">JM</text>
          </svg>
        </div>
        <h2 className="adm-login-title">Área do Administrador</h2>
        <p className="adm-login-sub">Digite o código de acesso para entrar</p>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            type="password"
            className="adm-login-input"
            placeholder="Código de acesso"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            autoComplete="off"
          />
          {error && <p className="adm-login-error">{error}</p>}
          <button type="submit" className="adm-login-btn" disabled={loading}>
            {loading ? 'Verificando...' : 'Entrar'}
          </button>
        </form>

        <p className="adm-login-hint">
          Código padrão de desenvolvimento: <code>JARDIM@2026</code>
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main AdminPage
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'dashboard', label: '📊 Dashboard'  },
  { id: 'pedidos',   label: '📦 Pedidos'    },
  { id: 'entregas',  label: '🚚 Entregas'   },
  { id: 'produtos',  label: '🌹 Produtos'   },
];

export default function AdminPage({ onNavigate }) {
  const [authed, setAuthed] = useState(false);
  const [tab,    setTab]    = useState('dashboard');

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  return (
    <div className="adm-layout">

      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar__brand">
          <svg width="36" height="36" viewBox="0 0 118 118" fill="none">
            <ellipse cx="59" cy="59" rx="55" ry="55" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8"/>
            <text x="59" y="66" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fontWeight="700" fill="#fff">JM</text>
          </svg>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Jardim Magnólia</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>Painel Admin</div>
          </div>
        </div>

        <nav className="adm-sidebar__nav">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`adm-sidebar__link ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="adm-sidebar__footer">
          <button
            className="adm-sidebar__logout"
            onClick={() => { setAuthed(false); setTab('dashboard'); }}
          >
            ← Sair
          </button>
          <button
            className="adm-sidebar__logout"
            style={{ opacity: 0.7 }}
            onClick={() => onNavigate('home')}
          >
            Ver loja
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="adm-main">
        <div className="adm-main__header">
          <h1 className="adm-main__title">
            {TABS.find((t) => t.id === tab)?.label}
          </h1>
          <span className="adm-main__date">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <div className="adm-main__body">
          {tab === 'dashboard' && <TabDashboard />}
          {tab === 'pedidos'   && <TabPedidos   />}
          {tab === 'entregas'  && <TabEntregas  />}
          {tab === 'produtos'  && <TabProdutos  />}
        </div>
      </main>

    </div>
  );
}