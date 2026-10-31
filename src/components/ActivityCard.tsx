import React, { useState } from 'react';
import { Activity } from '../types';
import { TOOLS } from '../data/tools';
import { ToolIcon } from './ToolIcon';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Heart, 
  Lightbulb, 
  GraduationCap, 
  BookOpen, 
  Wrench,
  CheckCircle2
} from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  isFavorite,
  onToggleFavorite,
}) => {
  // Internal tab state to avoid "informação toda corrida"
  const [activeCardTab, setActiveCardTab] = useState<'ideia' | 'ferramentas' | 'prompt' | 'dica'>('ideia');
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(activity.promptSuggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="bg-white rounded-3xl border border-slate-200/90 hover:border-purple-300 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden">
      
      {/* Card Header */}
      <div className="p-5 sm:p-6 pb-4">
        
        {/* Top Meta Row */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-extrabold text-xs flex items-center justify-center font-heading">
              #{activity.number < 10 ? `0${activity.number}` : activity.number}
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
              <GraduationCap className="w-3 h-3 text-slate-500" />
              <span>{activity.gradeText}</span>
            </span>

            {activity.disciplines.map((d) => (
              <span
                key={d}
                className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full"
              >
                {d}
              </span>
            ))}
          </div>

          <button
            onClick={() => onToggleFavorite(activity.id)}
            className={`p-2 rounded-xl transition-colors ${
              isFavorite
                ? 'bg-rose-50 text-rose-600'
                : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50'
            }`}
            title={isFavorite ? 'Remover dos favoritos' : 'Guardar nos favoritos'}
            aria-label={`Guardar atividade ${activity.number} nos favoritos`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 font-heading tracking-tight mb-3">
          {activity.title}
        </h3>

        {/* Internal Navigation Tabs (evita a informação toda corrida) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl mb-4 text-xs font-bold">
          <button
            onClick={() => setActiveCardTab('ideia')}
            className={`flex-1 py-1.5 px-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
              activeCardTab === 'ideia'
                ? 'bg-white text-purple-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Ideia</span>
          </button>

          <button
            onClick={() => setActiveCardTab('ferramentas')}
            className={`flex-1 py-1.5 px-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
              activeCardTab === 'ferramentas'
                ? 'bg-white text-purple-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-3 h-3" />
            <span>Ferramentas</span>
          </button>

          <button
            onClick={() => setActiveCardTab('prompt')}
            className={`flex-1 py-1.5 px-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
              activeCardTab === 'prompt'
                ? 'bg-white text-purple-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Prompt</span>
          </button>

          <button
            onClick={() => setActiveCardTab('dica')}
            className={`flex-1 py-1.5 px-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
              activeCardTab === 'dica'
                ? 'bg-white text-purple-800 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-3 h-3" />
            <span>Dica</span>
          </button>
        </div>

        {/* Tab 1: Ideia & Dinâmica */}
        {activeCardTab === 'ideia' && (
          <div className="space-y-3 min-h-[140px] animate-in fade-in duration-150">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activity.idea}
            </p>

            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 text-xs text-emerald-950 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-emerald-900">Resultado Esperado:</strong>
                <p>{activity.result}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Ferramentas com Logótipos e Hiperligações */}
        {activeCardTab === 'ferramentas' && (
          <div className="space-y-2.5 min-h-[140px] animate-in fade-in duration-150">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Ferramentas Sugeridas (Clica para abrir):
            </span>

            <div className="space-y-2">
              {activity.toolIds.map((tId) => {
                const tool = TOOLS[tId];
                if (!tool) return null;

                return (
                  <a
                    key={tId}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-purple-50/80 border border-slate-200 hover:border-purple-300 transition-all flex items-center justify-between gap-3 group/tool"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-xl bg-white shadow-2xs shrink-0">
                        <ToolIcon toolId={tId} size={22} />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 group-hover/tool:text-purple-700 text-xs block truncate">
                          {tool.name}
                        </span>
                        <span className="text-[10px] text-slate-500 block truncate">
                          {tool.badge}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-white group-hover/tool:bg-purple-600 group-hover/tool:text-white px-2.5 py-1 rounded-xl transition-colors shrink-0 shadow-2xs">
                      <span>Abrir</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Prompt da IA com Cópia */}
        {activeCardTab === 'prompt' && (
          <div className="space-y-2.5 min-h-[140px] animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-purple-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Comando pronto a usar:
              </span>

              <button
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-xl border border-purple-200 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            <div className="p-3 bg-purple-50/80 border border-purple-100 rounded-2xl text-xs font-mono text-purple-950 leading-relaxed italic">
              "{activity.promptSuggestion}"
            </div>
          </div>
        )}

        {/* Tab 4: Dica do Professor */}
        {activeCardTab === 'dica' && (
          <div className="space-y-3 min-h-[140px] animate-in fade-in duration-150">
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Conselho de sala de aula:</strong> {activity.teacherTip}
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Card Bottom Meta Footer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex flex-wrap gap-1">
          {activity.tags.slice(0, 2).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-medium">
              #{t}
            </span>
          ))}
        </div>

        <span className="font-semibold text-purple-700">
          Atividade {activity.number} de 20
        </span>
      </div>

    </article>
  );
};
