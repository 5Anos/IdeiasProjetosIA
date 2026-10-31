import React from 'react';
import { ShieldCheck, Eye, Sparkles, BookOpen, ExternalLink, HeartHandshake, CheckCircle } from 'lucide-react';
import { ToolIcon } from './ToolIcon';

export const PedagogicalGuide: React.FC = () => {
  const principles = [
    {
      icon: '🛡️',
      title: 'Privacidade e Segurança de Dados',
      desc: 'Nunca inserir dados pessoais, moradas, fotos de alunos ou nomes completos nos chatbots. Optar por contas institucionais ou ferramentas anónimas como Duck.ai.',
    },
    {
      icon: '🔍',
      title: 'Detetives de Informação e Rigor',
      desc: 'Os modelos de IA podem ter "alucinações" e inventar factos falsos. Toda a resposta factual deve ser confrontada com manuais escolares ou fontes oficiais.',
    },
    {
      icon: '🧠',
      title: 'A IA é Matéria-Prima, Não o Trabalho Final',
      desc: 'O texto ou imagem gerado pela máquina é apenas o ponto de partida. O valor pedagógico reside na capacidade do aluno de analisar, reescrever, criticar e compor.',
    },
    {
      icon: '💬',
      title: 'A Importância do Diálogo e da Oralidade',
      desc: 'As atividades foram planeadas para incentivar o debate cara a cara, a gravação de voz com expressividade e a reflexão em equipa.',
    },
  ];

  return (
    <section id="sobre" className="py-14 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-12 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inovação Pedagógica</span>
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading mb-4 leading-tight">
              Código de Boas Práticas e Enquadramento Educativo
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
              Estas 20 atividades foram pensadas para responder aos desafios atuais da educação, promovendo as competências do Perfil dos Alunos à Saída da Escolaridade Obrigatória: criatividade, pensamento crítico, literacia digital e cooperação.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-xs border border-white/20">
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Alinhado ao Perfil dos Alunos à Saída da Escolaridade Obrigatória</span>
              </span>
            </div>
          </div>

          {/* Decorative graphic element */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
            <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
              <path d="M45,-60C58,-52,68,-39,72,-24C77,-9,75,8,69,24C63,40,53,55,39,63C25,71,8,72,-9,70C-26,68,-44,63,-56,51C-68,39,-75,20,-74,1C-73,-18,-64,-36,-51,-45C-38,-54,-19,-54,-1,-53C17,-52,33,-68,45,-60Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {principles.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
            >
              <span className="text-3xl block mb-3">{item.icon}</span>
              <h3 className="font-bold text-slate-900 text-base mb-2 font-heading">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Scientific Validation & Rigor Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl">
              🔬
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                Validação Científica das Atividades
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Confronto rigoroso com os factos da Biologia, Geologia, Matemática e História
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Ciências Naturais */}
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Ciências Naturais & Terra
              </span>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li>
                  <strong className="text-emerald-950 font-bold">✓ Pistas Biológicas:</strong> Pinguins (*Spheniscidae*) têm penas impermeáveis e asas adaptadas ao mergulho no Hemisfério Sul; golfinhos respiram por espiráculo e comunicam por ecolocalização.
                </li>
                <li>
                  <strong className="text-emerald-950 font-bold">✓ Extinção K-Pg:</strong> Há 66 milhões de anos, o impacto do asteroide de Chicxulub e o vulcanismo (*Deccan Traps*) extinguiram os dinossauros não-avianos. O *Triceratops* viveu exatamente nesse período.
                </li>
                <li>
                  <strong className="text-emerald-950 font-bold">✓ Ciclo da Água e Clima:</strong> O aquecimento global intensifica a taxa de evaporação e a capacidade de retenção de vapor atmosférico (~7% por °C), agravando a seca no Sul de Portugal.
                </li>
              </ul>
            </div>

            {/* Column 2: Matemática */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Matemática & Geometria
              </span>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li>
                  <strong className="text-blue-950 font-bold">✓ Poliedros vs Corpos Redondos:</strong> Cubos e pirâmides são poliedros (faces poligonais planas, arestas e vértices). Cumprem o Teorema de Euler ($V - A + F = 2$).
                </li>
                <li>
                  <strong className="text-blue-950 font-bold">✓ Correção de Rigor:</strong> Esferas e cilindros são *não-poliedros* delimitados por superfícies curvas; não têm faces poligonais nem vértices.
                </li>
                <li>
                  <strong className="text-blue-950 font-bold">✓ Equações:</strong> A equação $4x + 12 = 60$ resulta em $x = 12$, adequada a contextos reais do dia a dia dos alunos.
                </li>
              </ul>
            </div>

            {/* Column 3: Limites & O que a IA Não Sabe */}
            <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-5 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Limites da IA & O que Não Sabemos
              </span>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li>
                  <strong className="text-amber-950 font-bold">⚠️ A IA Não "Pensa":</strong> Modela probabilidades estatísticas de palavras (tokens). Não possui memória consciente nem verificação científica infalível.
                </li>
                <li>
                  <strong className="text-amber-950 font-bold">⚠️ Risco de Alucinação:</strong> Em dados históricos precisos ou contagens espaciais, a IA pode inventar detalhes convincentes que exigem confirmação em manuais escolares.
                </li>
                <li>
                  <strong className="text-amber-950 font-bold">⚠️ Incerteza Científica:</strong> A velocidade exata de transição de ecossistemas paleoclimáticos e os limites de raciocínio de modelos neuronais autorregressivos continuam sob ativa investigação científica.
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
