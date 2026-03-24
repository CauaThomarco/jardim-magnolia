import { useState } from 'react';
import Footer from '../components/Footer.jsx';
import { API } from '../hooks/useProdutos.js';

export default function AddressLookupPage({ onNavigate }) {
  const [cep, setCep] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const buscarCep = async (e) => {
    e.preventDefault();
    const onlyDigits = cep.replace(/\D/g, '');
    if (onlyDigits.length !== 8) {
      setError('Digite um CEP válido com 8 números.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/cep/${onlyDigits}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'CEP não encontrado.');
      setResult(data);
    } catch (err) {
      setError(err.message || 'Não foi possível consultar o CEP.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="institutional-page container">
        <h1>Buscar endereço por CEP</h1>
        <p className="institutional-page__welcome">Consulte seu endereço de entrega no Brasil usando nosso serviço de CEP.</p>

        <form className="cep-form" onSubmit={buscarCep}>
          <input
            className="form-input"
            placeholder="Ex: 01001000"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            maxLength={9}
          />
          <button className="btn-login" type="submit" disabled={loading}>{loading ? 'Consultando...' : 'Consultar CEP'}</button>
        </form>

        {error && <p className="cep-error">{error}</p>}

        {result && (
          <div className="tips-card" style={{ marginTop: 16 }}>
            <h3>{result.logradouro || 'Logradouro não informado'}</h3>
            <p>{result.bairro || 'Bairro não informado'}</p>
            <p>{result.localidade} - {result.uf}</p>
            <p>CEP: {result.cep}</p>
          </div>
        )}
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
