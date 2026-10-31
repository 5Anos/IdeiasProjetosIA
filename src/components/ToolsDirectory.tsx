import React, { useState } from 'react';
import { TOOLS } from '../data/tools';
import { ToolIcon } from './ToolIcon';
import { ExternalLink, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

interface ToolsDirectoryProps {
  onSelectToolForFilter: (toolId: string) => void;
}

export const ToolsDirectory: React.FC<ToolsDirectoryProps> = ({ onSelectToolForFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  const toolsList = Object.values(TOOLS);

  const categories = [
    'todas',
    'Imagem',
    'Texto / Chatbot',
    'Áudio / Voz',
    'Música',
    'Vídeo / Avatar',
    'Pesquisa',
    'Geometria / Dados',
    'Jogos / Interativo',
    'Revisão',
  ];

  const filteredTools = selectedCategory === 'todas'
    ? toolsList
    : toolsList.filter(t => t.category === selectedCategory);

  return (
    <section id="ferramentas" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guia e Catálogo Oficial de Ferramentas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Ferramentas Sugeridas para as Atividades
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-2">
            Acesso direto, logótipos e descrição pedagógica de cada recurso digital e modelo de Inteligência Artificial mencionado.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'todas' ? 'Todas as Ferramentas' : cat}
            </button>
          ))}
        </div>

        {/* Tools Grid with Logos and Direct Hyperlinks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="group bg-slate-50/70 hover:bg-white rounded-3xl p-5 border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2 rounded-2xl bg-white shadow-xs border border-slate-100 group-hover:scale-105 transition-transform">
                    <ToolIcon toolId={tool.id} size={36} />
                  </div>

                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    tool.isAI ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {tool.isAI ? 'IA Generativa' : 'Recurso Digital'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-purple-700 transition-colors mb-1">
                  {tool.name}
                </h3>

                <span className="inline-block text-[11px] font-bold text-slate-500 mb-2">
                  {tool.badge}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {tool.description}
                </p>
              </div>

              {/* Actions: Open direct link & Filter activities */}
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    onSelectToolForFilter(tool.id);
                    const el = document.getElementById('atividades');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[11px] font-bold text-purple-700 hover:text-purple-900"
                >
                  Ver atividades →
                </button>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-2xs"
                  title={`Visitar site oficial de ${tool.name}`}
                >
                  <span>Aceder</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
