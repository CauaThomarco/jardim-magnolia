import { useState } from 'react';
import Footer from '../components/Footer.jsx';

/* ── FAQ accordion ── */
const FAQ_ITEMS = [
  {
    category: 'Pedidos',
    items: [
      {
        q: 'Como faço um pedido?',
        a: 'Navegue pelos produtos, adicione ao carrinho e clique em "Finalizar compra". Você precisará estar logado com uma conta cadastrada para concluir o pedido. Após a confirmação, receberá a notificação por e-mail.',
      },
      {
        q: 'Posso alterar ou cancelar meu pedido?',
        a: 'Sim, mas apenas enquanto o status for "Pendente". Entre em contato pelo formulário de suporte o quanto antes. Pedidos que já estão "Em rota" não podem ser cancelados.',
      },
      {
        q: 'Como acompanho o status do pedido?',
        a: 'Acesse "Minha Conta" → "Histórico de compras". O status é atualizado em tempo real pela nossa equipe: Pendente → Em rota → Entregue.',
      },
      {
        q: 'Os produtos da foto são idênticos ao que recebo?',
        a: 'As imagens são representativas. Flores são produtos naturais, portanto cor, tamanho e formato podem variar levemente conforme disponibilidade e sazonalidade — mantendo sempre a mesma qualidade e beleza.',
      },
    ],
  },
  {
    category: 'Entrega',
    items: [
      {
        q: 'Qual é o prazo de entrega?',
        a: 'Para pedidos feitos até as 14h, entregamos no mesmo dia em regiões atendidas. Para outras localidades, o prazo médio é de 1 a 3 dias úteis. O prazo exato aparece no checkout antes de confirmar.',
      },
      {
        q: 'Entregam no meu endereço?',
        a: 'Atendemos todo o Brasil. Basta informar o CEP no checkout para verificar disponibilidade e calcular o frete. Entregas expressas (até 3 horas) estão disponíveis em cidades selecionadas.',
      },
      {
        q: 'O frete é grátis?',
        a: 'Sim! Pedidos acima de R$200,00 têm frete grátis. Para valores abaixo disso, o frete é de R$19,90 independente da região.',
      },
      {
        q: 'O que acontece se eu não estiver em casa?',
        a: 'Nossa equipe tentará contato pelo telefone informado no pedido. Caso não haja resposta, faremos uma segunda tentativa em até 2 horas. Se não for possível entregar, entraremos em contato para reagendar sem custo adicional.',
      },
    ],
  },
  {
    category: 'Pagamento',
    items: [
      {
        q: 'Quais formas de pagamento são aceitas?',
        a: 'Atualmente aceitamos pagamento em dinheiro na entrega. Estamos trabalhando para adicionar Pix, cartão de crédito e débito em breve.',
      },
      {
        q: 'O pagamento é seguro?',
        a: 'Sim. Todas as informações são trafegadas com criptografia. Nunca solicitamos dados de cartão por telefone, e-mail ou mensagem.',
      },
    ],
  },
  {
    category: 'Devoluções',
    items: [
      {
        q: 'Posso devolver um produto?',
        a: 'Aceitamos solicitações de devolução em até 24 horas após a entrega, caso as flores estejam danificadas ou o pedido esteja incorreto. Acesse "Minha Conta" → "Histórico de compras" e clique em "Solicitar devolução".',
      },
      {
        q: 'Como funciona o reembolso?',
        a: 'Após análise da solicitação (até 2 dias úteis), o reembolso é processado pelo mesmo meio de pagamento. Para pagamentos em dinheiro, realizamos depósito bancário ou crédito para próxima compra.',
      },
      {
        q: 'E se as flores chegarem murchas?',
        a: 'Pedimos que tire uma foto imediatamente e entre em contato pelo suporte em até 2 horas após o recebimento. Trabalharemos para resolver com reenvio ou reembolso total.',
      },
    ],
  },
  {
    category: 'Conta',
    items: [
      {
        q: 'Como crio uma conta?',
        a: 'Clique em "Entrar" na barra de navegação e depois em "Criar conta". Preencha nome, e-mail e senha. Após o cadastro, você já pode fazer pedidos e salvar endereços.',
      },
      {
        q: 'Esqueci minha senha, o que faço?',
        a: 'No momento, entre em contato pelo formulário de suporte informando seu e-mail de cadastro. Nossa equipe redefinirá sua senha manualmente. Em breve teremos recuperação automática por e-mail.',
      },
      {
        q: 'Posso ter mais de um endereço salvo?',
        a: 'Sim! Em "Minha Conta" → "Meus Endereços" você pode cadastrar e gerenciar quantos endereços quiser. No checkout, basta selecionar o destino de entrega desejado.',
      },
    ],
  },
];

function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  const toggle = (key) => setOpen((prev) => (prev === key ? null : key));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              border: '1px solid',
              borderColor: isOpen ? '#1B3A2D' : '#e2e8e0',
              borderRadius: 10,
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
          >
            <button
              onClick={() => toggle(i)}
              style={{
                width: '100%', textAlign: 'left', padding: '14px 18px',
                background: isOpen ? '#f0faf3' : '#fafaf8',
                border: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontSize: 14, fontWeight: 600, color: '#1a1a1a', gap: 12,
              }}
            >
              <span>{item.q}</span>
              <span style={{ fontSize: 18, color: '#1B3A2D', flexShrink: 0 }}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div style={{ padding: '12px 18px 16px', background: '#fff', fontSize: 14, color: '#444', lineHeight: 1.7 }}>
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Page content definitions ── */
function PageAjuda({ onNavigate }) {
  return (
    <div>
      <p style={{ color: '#555', fontSize: 15, marginBottom: 32, maxWidth: 620, lineHeight: 1.7 }}>
        Encontre respostas para as dúvidas mais comuns. Não encontrou o que precisava?{' '}
        <button
          onClick={() => onNavigate('contact')}
          style={{ background: 'none', border: 'none', color: '#1B3A2D', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: 15, padding: 0 }}
        >
          Fale com nosso suporte.
        </button>
      </p>

      {FAQ_ITEMS.map((group) => (
        <section key={group.category} className="institutional-page__section">
          <h2>{group.category}</h2>
          <Accordion items={group.items} />
        </section>
      ))}
    </div>
  );
}

function PagePrivacidade() {
  return (
    <div>
      <p style={{ color: '#777', fontSize: 13, marginBottom: 28 }}>Última atualização: janeiro de 2026 · Conforme a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</p>

      <section className="institutional-page__section">
        <h2>1. Quem somos</h2>
        <p>A <strong>Jardim Magnólia Floricultura</strong> é responsável pelo tratamento dos seus dados pessoais coletados neste site. Atuamos como controladora dos dados conforme definido pela LGPD. Para dúvidas, entre em contato pelo formulário de suporte disponível no site.</p>
      </section>

      <section className="institutional-page__section">
        <h2>2. Dados que coletamos</h2>
        <p>Coletamos apenas os dados necessários para o funcionamento da loja:</p>
        <ul style={{ paddingLeft: 20, lineHeight: 2, color: '#444', marginTop: 8 }}>
          <li><strong>Identificação:</strong> nome completo e endereço de e-mail</li>
          <li><strong>Acesso:</strong> senha (armazenada com hash criptográfico)</li>
          <li><strong>Entrega:</strong> endereço(s) de entrega e telefone</li>
          <li><strong>Compras:</strong> histórico de pedidos e itens adquiridos</li>
          <li><strong>Navegação:</strong> cookies essenciais para funcionamento do carrinho e sessão</li>
        </ul>
        <p style={{ marginTop: 12 }}>Não coletamos dados de cartão de crédito, documentos de identidade ou dados sensíveis.</p>
      </section>

      <section className="institutional-page__section">
        <h2>3. Finalidade do tratamento</h2>
        <p>Seus dados são utilizados exclusivamente para:</p>
        <ul style={{ paddingLeft: 20, lineHeight: 2, color: '#444', marginTop: 8 }}>
          <li>Processar e entregar seus pedidos</li>
          <li>Identificar você em seu próximo acesso ao site</li>
          <li>Responder a solicitações de suporte, devolução e atendimento</li>
          <li>Cumprir obrigações legais e fiscais</li>
        </ul>
        <p style={{ marginTop: 12 }}>Não utilizamos seus dados para envio de publicidade não solicitada nem os compartilhamos com terceiros para fins comerciais.</p>
      </section>

      <section className="institutional-page__section">
        <h2>4. Compartilhamento de dados</h2>
        <p>Os dados pessoais podem ser compartilhados apenas nas seguintes situações:</p>
        <ul style={{ paddingLeft: 20, lineHeight: 2, color: '#444', marginTop: 8 }}>
          <li><strong>Parceiros de entrega:</strong> somente nome, endereço e telefone, para fins logísticos</li>
          <li><strong>Obrigação legal:</strong> quando exigido por autoridade competente ou determinação judicial</li>
        </ul>
      </section>

      <section className="institutional-page__section">
        <h2>5. Seus direitos (LGPD)</h2>
        <p>Você tem os seguintes direitos em relação aos seus dados:</p>
        <ul style={{ paddingLeft: 20, lineHeight: 2, color: '#444', marginTop: 8 }}>
          <li>Confirmar a existência de tratamento e acessar seus dados</li>
          <li>Solicitar correção de dados incorretos ou desatualizados</li>
          <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários</li>
          <li>Solicitar a exclusão completa da sua conta e dados associados</li>
          <li>Obter informações sobre com quem seus dados foram compartilhados</li>
        </ul>
        <p style={{ marginTop: 12 }}>Para exercer qualquer um desses direitos, utilize o formulário de suporte ou exclua diretamente sua conta em "Minha Conta".</p>
      </section>

      <section className="institutional-page__section">
        <h2>6. Retenção e segurança</h2>
        <p>Seus dados são mantidos enquanto sua conta estiver ativa. Após a exclusão da conta, removemos os dados pessoais em até 30 dias, respeitando obrigações legais de retenção fiscal. Utilizamos criptografia para senhas e conexões HTTPS para todas as comunicações.</p>
      </section>
    </div>
  );
}

function PageCookies() {
  return (
    <div>
      <p style={{ color: '#777', fontSize: 13, marginBottom: 28 }}>Última atualização: janeiro de 2026</p>

      <section className="institutional-page__section">
        <h2>O que são cookies?</h2>
        <p>Cookies são pequenos arquivos de texto armazenados pelo navegador no seu dispositivo. Eles permitem que o site "lembre" informações sobre sua visita, como itens no carrinho ou preferências de navegação, tornando a experiência mais fluida e personalizada.</p>
      </section>

      <section className="institutional-page__section">
        <h2>Cookies que utilizamos</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
          {[
            {
              tipo: 'Essenciais',
              cor: '#d4edda',
              textCor: '#155724',
              desc: 'Necessários para o funcionamento básico do site. Incluem sessão de usuário logado, carrinho de compras e configurações de segurança. Não podem ser desativados.',
              exemplos: 'jm_cliente (sessão do usuário), carrinho temporário',
            },
            {
              tipo: 'Funcionais',
              cor: '#cce5ff',
              textCor: '#004085',
              desc: 'Melhoram a experiência ao lembrar preferências como endereços salvos e histórico de buscas recentes.',
              exemplos: 'Endereço de entrega favorito, filtros de categoria',
            },
            {
              tipo: 'Analíticos',
              cor: '#fff3cd',
              textCor: '#856404',
              desc: 'Utilizados para entender como os visitantes interagem com o site (páginas mais acessadas, tempo de visita). Os dados são agregados e anônimos.',
              exemplos: 'Páginas visitadas, origem do acesso',
            },
          ].map((c) => (
            <div key={c.tipo} style={{ border: '1px solid #e2e8e0', borderRadius: 10, padding: '16px 20px' }}>
              <span style={{ background: c.cor, color: c.textCor, fontSize: 12, fontWeight: 700, borderRadius: 20, padding: '3px 12px' }}>{c.tipo}</span>
              <p style={{ marginTop: 10, color: '#444', fontSize: 14, lineHeight: 1.7 }}>{c.desc}</p>
              <p style={{ fontSize: 12, color: '#888', marginTop: 6 }}><strong>Exemplos:</strong> {c.exemplos}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="institutional-page__section">
        <h2>Como gerenciar cookies</h2>
        <p>Você pode configurar ou desabilitar cookies diretamente no seu navegador. Veja como nas configurações de privacidade do Chrome, Firefox, Safari ou Edge. Note que desabilitar cookies essenciais pode impedir o funcionamento do carrinho e do login.</p>
        <p style={{ marginTop: 12, color: '#555', fontSize: 14 }}>Os cookies de sessão (<code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: 4 }}>jm_cliente</code>) são removidos automaticamente ao fechar o navegador ou ao fazer logout.</p>
      </section>
    </div>
  );
}

function PageTermos({ onNavigate }) {
  return (
    <div>
      <p style={{ color: '#777', fontSize: 13, marginBottom: 28 }}>Última atualização: janeiro de 2026 · Ao usar o site, você concorda com estes termos.</p>

      <section className="institutional-page__section">
        <h2>1. Aceitação dos termos</h2>
        <p>O uso do site <strong>jardimmagnolia.com.br</strong> implica na aceitação integral destes Termos de Uso. Caso não concorde com algum ponto, pedimos que não utilize os serviços. A Jardim Magnólia pode atualizar estes termos a qualquer momento, sendo a versão mais recente sempre publicada nesta página.</p>
      </section>

      <section className="institutional-page__section">
        <h2>2. Cadastro e conta</h2>
        <p>Para realizar compras, é necessário criar uma conta com informações verídicas. Você é responsável por manter a confidencialidade da sua senha e por todas as atividades realizadas em sua conta. Em caso de uso não autorizado, entre em contato imediatamente pelo nosso suporte.</p>
      </section>

      <section className="institutional-page__section">
        <h2>3. Produtos e disponibilidade</h2>
        <p>As fotografias dos produtos são ilustrativas. Por se tratarem de flores naturais, variações de cor, tamanho e formato são inerentes ao produto e não configuram defeito. A disponibilidade dos produtos depende do estoque e da sazonalidade das flores. Reservamo-nos o direito de cancelar pedidos de itens esgotados, com reembolso integral.</p>
      </section>

      <section className="institutional-page__section">
        <h2>4. Preços e pagamento</h2>
        <p>Os preços exibidos são em Reais (R$) e incluem impostos aplicáveis. O frete é calculado no checkout com base no CEP de entrega. Pedidos acima de R$200,00 têm frete grátis. Os preços podem ser alterados sem aviso prévio, mas o valor vigente no momento da finalização do pedido será mantido.</p>
      </section>

      <section className="institutional-page__section">
        <h2>5. Entrega</h2>
        <p>Os prazos de entrega são estimativas e podem variar por fatores externos (clima, trânsito, feriados). A Jardim Magnólia não se responsabiliza por atrasos causados por informações de endereço incorretas fornecidas pelo cliente. Em casos de impossibilidade de entrega, entraremos em contato para reagendamento.</p>
      </section>

      <section className="institutional-page__section">
        <h2>6. Cancelamentos e devoluções</h2>
        <p>O consumidor tem direito ao cancelamento em até 7 dias após a compra (conforme CDC, Art. 49), desde que o produto ainda não tenha sido entregue. Para produtos entregues, aceitamos devolução em até 24 horas em caso de produtos danificados ou divergentes do pedido. Acesse{' '}
          <button onClick={() => onNavigate('minha-conta')} style={{ background: 'none', border: 'none', color: '#1B3A2D', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>
            Minha Conta
          </button>{' '}para solicitar devolução.</p>
      </section>

      <section className="institutional-page__section">
        <h2>7. Propriedade intelectual</h2>
        <p>Todo o conteúdo do site (textos, imagens, logotipos, design) é propriedade da Jardim Magnólia e protegido por direitos autorais. É proibida a reprodução, distribuição ou uso comercial sem autorização expressa por escrito.</p>
      </section>

      <section className="institutional-page__section">
        <h2>8. Limitação de responsabilidade</h2>
        <p>A Jardim Magnólia não se responsabiliza por danos indiretos, perda de dados ou lucros cessantes decorrentes do uso do site. Nossa responsabilidade é limitada ao valor do pedido em questão. Não garantimos disponibilidade ininterrupta do site, podendo ocorrer manutenções programadas.</p>
      </section>

      <section className="institutional-page__section">
        <h2>9. Lei aplicável e foro</h2>
        <p>Estes termos são regidos pela legislação brasileira. Para qualquer litígio, fica eleito o foro da comarca de São Paulo/SP, salvo disposição legal em contrário.</p>
      </section>
    </div>
  );
}

/* ── Main component ── */
export default function InstitutionalPage({ page, onNavigate, cliente }) {
  const titles = {
    ajuda: 'Central de Ajuda',
    'politica-privacidade': 'Política de Privacidade',
    'politica-cookies': 'Política de Cookies',
    termos: 'Termos de Uso',
  };

  const title = titles[page] || 'Informações';

  return (
    <div>
      <div className="institutional-page container">
        <h1>{title}</h1>
        {cliente && page === 'ajuda' && (
          <p className="institutional-page__welcome">Olá, {cliente.nome}! Como podemos ajudar?</p>
        )}

        {page === 'ajuda'                && <PageAjuda onNavigate={onNavigate} />}
        {page === 'politica-privacidade' && <PagePrivacidade />}
        {page === 'politica-cookies'     && <PageCookies />}
        {page === 'termos'               && <PageTermos onNavigate={onNavigate} />}
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
