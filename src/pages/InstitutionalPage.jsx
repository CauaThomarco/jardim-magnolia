import Footer from '../components/Footer.jsx';

const CONTENT = {
  'minha-conta': {
    title: 'Minha Conta',
    sections: [
      { h: 'Gerencie seu perfil', p: 'Acesse seus dados de cadastro, endereços salvos e histórico de pedidos em um só lugar.' },
      { h: 'Segurança', p: 'Mantenha seu e-mail atualizado e use senhas fortes para proteger sua conta.' },
    ],
  },
  ajuda: {
    title: 'Central de Ajuda',
    sections: [
      { h: 'Pedidos e entregas', p: 'Entregamos em todo o Brasil. O prazo pode variar conforme cidade, clima e disponibilidade.' },
      { h: 'Trocas e suporte', p: 'Se houver qualquer problema no pedido, entre em contato em até 24h para suporte prioritário.' },
    ],
  },
  'politica-privacidade': {
    title: 'Política de Privacidade',
    sections: [
      { h: 'Dados coletados', p: 'Coletamos dados de identificação, contato, endereço e pedidos para processar compras e entregas.' },
      { h: 'Uso dos dados', p: 'Utilizamos os dados somente para operação da loja, atendimento e comunicações essenciais.' },
      { h: 'Direitos do titular', p: 'Você pode solicitar atualização, correção ou exclusão dos seus dados conforme a LGPD.' },
    ],
  },
  'politica-cookies': {
    title: 'Política de Cookies',
    sections: [
      { h: 'Cookies essenciais', p: 'Utilizamos cookies para manter sessão, carrinho e funcionamento básico do site.' },
      { h: 'Preferências', p: 'Alguns cookies ajudam a lembrar preferências e melhorar sua experiência de navegação.' },
    ],
  },
  termos: {
    title: 'Termos de Uso',
    sections: [
      { h: 'Condições gerais', p: 'Ao utilizar o site, você concorda com as regras de uso, compra e entrega publicadas nesta página.' },
      { h: 'Disponibilidade de produtos', p: 'Imagens são ilustrativas e a disponibilidade pode variar conforme estoque e sazonalidade.' },
    ],
  },
};

export default function InstitutionalPage({ page, onNavigate, cliente }) {
  const data = CONTENT[page] || CONTENT.ajuda;

  return (
    <div>
      <div className="institutional-page container">
        <h1>{data.title}</h1>
        {cliente && <p className="institutional-page__welcome">Olá, {cliente.nome}! Aqui estão as informações da página.</p>}
        {data.sections.map((s) => (
          <section key={s.h} className="institutional-page__section">
            <h2>{s.h}</h2>
            <p>{s.p}</p>
          </section>
        ))}
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
