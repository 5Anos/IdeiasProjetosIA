import React from 'react';
import { ShieldCheck, Eye, Sparkles, BookOpen, ExternalLink, HeartHandshake, CheckCircle } from 'lucide-react';
import { GENIALLY_BASE_URL } from '../data/activities';
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
              <a
                href={GENIALLY_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md"
              >
                <ToolIcon toolId="genially" size={18} />
                <span>Ver Apresentação Original no Genially</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      </div>
    </section>
  );
};
