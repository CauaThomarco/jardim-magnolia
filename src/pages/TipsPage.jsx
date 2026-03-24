import Footer from '../components/Footer.jsx';

const TIPS = [
  { title: 'Troque a água diariamente', text: 'Use água limpa e fresca para manter flores vivas por mais tempo.' },
  { title: 'Corte as hastes na diagonal', text: 'Um corte de cerca de 2 cm melhora a absorção de água e nutrientes.' },
  { title: 'Evite sol direto', text: 'Flores e plantas preferem luz indireta e ambientes arejados.' },
  { title: 'Remova folhas submersas', text: 'Folhas dentro da água aceleram proliferação de bactérias.' },
  { title: 'Adube com equilíbrio', text: 'Use adubação adequada para cada espécie, sem exagero.' },
  { title: 'Observe o solo', text: 'Nunca deixe encharcado; mantenha umidade equilibrada.' },
];

export default function TipsPage({ onNavigate }) {
  return (
    <div>
      <div className="institutional-page container">
        <h1>Dicas e Cuidados</h1>
        <p className="institutional-page__welcome">Guia rápido para manter suas flores e plantas sempre bonitas e saudáveis.</p>

        <div className="tips-grid">
          {TIPS.map((tip) => (
            <article key={tip.title} className="tips-card">
              <h3>{tip.title}</h3>
              <p>{tip.text}</p>
            </article>
          ))}
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
