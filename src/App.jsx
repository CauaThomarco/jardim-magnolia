import { useState } from 'react';
import NavBar        from './components/NavBar.jsx';
import HomePage      from './pages/HomePage.jsx';
import ProductPage   from './pages/ProductPage.jsx';
import LoginPage     from './pages/LoginPage.jsx';
import ContactPage   from './pages/ContactPage.jsx';
import CartPage      from './pages/CartPage.jsx';
import AdminPage     from './pages/AdminPage.jsx';
import PresentesPage from './pages/PresentesPage.jsx';

export default function App() {
  const [page,           setPage]           = useState('home');
  const [pageParams,     setPageParams]     = useState({});
  const [cart,           setCart]           = useState([]);

  const cartCount = cart.reduce((acc, i) => acc + i.qty, 0);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + (item.qty ?? 1) } : i);
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  // navigate aceita params opcionais: navigate('presentes', { categoria: 'ROSAS' })
  const navigate = (target, params = {}) => {
    setPage(target);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (page === 'admin') {
    return <AdminPage onNavigate={navigate} />;
  }

  return (
    <div>
      <NavBar currentPage={page} onNavigate={navigate} cartCount={cartCount} />

      {page === 'home'      && <HomePage      onNavigate={navigate} onAddToCart={addToCart} />}
      {page === 'product'   && <ProductPage   onNavigate={navigate} onAddToCart={addToCart} />}
      {page === 'login'     && <LoginPage     onNavigate={navigate} />}
      {page === 'contact'   && <ContactPage   onNavigate={navigate} />}
      {page === 'cart'      && <CartPage      cart={cart} onNavigate={navigate} onQtyChange={changeQty} onRemove={removeItem} />}
      {page === 'presentes' && <PresentesPage onNavigate={navigate} onAddToCart={addToCart} initialCategoria={pageParams.categoria} />}
    </div>
  );
}