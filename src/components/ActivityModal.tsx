import React, { useState } from 'react';
import { Activity } from '../types';
import { TOOLS } from '../data/tools';
import { ToolIcon } from './ToolIcon';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Lightbulb, 
  GraduationCap, 
  CheckCircle2, 
  Printer, 
  ChevronLeft, 
  ChevronRight, 
  Heart,
  Share2,
  BookOpen
} from 'lucide-react';

interface ActivityModalProps {
  activity: Activity | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onOpenLabDemo?: (demoId: string) => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  activity,
  onClose,
  onNext,
  onPrev,
  isFavorite,
  onToggleFavorite,
  onOpenLabDemo,
}) => {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  if (!activity) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(activity.promptSuggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: activity.title,
        text: `Atividade de IA na Educação: ${activity.title} (${activity.gradeText})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-purple-50/50 via-white to-indigo-50/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-purple-700 text-white font-extrabold text-sm flex items-center justify-center font-heading shadow-md shadow-purple-200">
              #{activity.number}
            </span>
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Ficha Pedagógica Completa
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading leading-tight">
                {activity.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Favorite */}
            <button
              onClick={() => onToggleFavorite(activity.id)}
              className={`p-2 rounded-xl transition-colors ${
                isFavorite ? 'bg-rose-100 text-rose-600' : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
              }`}
              title="Guardar nos favoritos"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors hidden sm:inline-flex"
              title="Imprimir ficha de atividade"
            >
              <Printer className="w-5 h-5" />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Partilhar"
            >
              {linkCopied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Fechar ficha"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>{activity.gradeText}</span>
            </span>

            {activity.cycle.map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                {c}
              </span>
            ))}

            {activity.disciplines.map((d) => (
              <span key={d} className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold">
                {d}
              </span>
            ))}

            {activity.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 text-[11px] font-medium border border-slate-200">
                #{t}
              </span>
            ))}
          </div>

          {/* Ideia da Atividade */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Ideia da Atividade e Dinâmica</span>
            </h4>
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
              {activity.idea}
            </div>
          </div>

          {/* Resultado Esperado */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Resultado Esperado dos Alunos</span>
            </h4>
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 sm:p-5 text-emerald-950 font-medium text-sm sm:text-base flex items-start gap-3">
              <span className="p-1.5 rounded-xl bg-emerald-500 text-white mt-0.5">
                <Check className="w-4 h-4" />
              </span>
              <p>{activity.result}</p>
            </div>
          </div>

          {/* Ferramentas Sugeridas com Logótipos e Hiperligações */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Ferramentas Sugeridas (Logótipos e Acesso Direto)
              </h4>
              <span className="text-xs text-slate-400">Clique para abrir o site oficial</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activity.toolIds.map((tId) => {
                const tool = TOOLS[tId];
                if (!tool) return null;

                return (
                  <a
                    key={tId}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all flex items-start gap-3.5 group/link"
                  >
                    <div className="p-2 rounded-xl bg-slate-50 group-hover/link:bg-purple-50 transition-colors shrink-0">
                      <ToolIcon toolId={tId} size={32} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-bold text-slate-900 group-hover/link:text-purple-700 text-sm truncate">
                          {tool.name}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-purple-600 shrink-0" />
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 mb-1">
                        {tool.badge}
                      </span>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Sugestão de Prompt */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Sugestão de Prompt para a IA</span>
              </h4>
              <button
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copiado com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Prompt</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 text-purple-100 p-4 sm:p-5 rounded-2xl font-mono text-xs sm:text-sm border border-slate-800 relative group">
              <p className="leading-relaxed">"{activity.promptSuggestion}"</p>
            </div>
          </div>

          {/* Dica para o Professor */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Dica de Ouro para o Professor</span>
            </h4>
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 text-amber-950 text-sm sm:text-base leading-relaxed flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
                💡
              </div>
              <p>
                {activity.teacherTip}
              </p>
            </div>
          </div>

          {/* Link para o Genially Original */}
          <div className="pt-2">
            <div className="rounded-2xl p-4 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center font-bold shrink-0">
                  <ToolIcon toolId="genially" size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-900">
                    Fonte e Apresentação Interativa Original
                  </h5>
                  <p className="text-xs text-slate-600">
                    Desenvolvido e partilhado no Genially
                  </p>
                </div>
              </div>

              <a
                href={activity.geniallyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs transition-colors shrink-0 shadow-xs"
              >
                <span>Abrir no Genially</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Lab Demo CTA if exists */}
          {activity.interactiveDemoId && onOpenLabDemo && (
            <div className="rounded-2xl p-4 bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-amber-900 text-sm">Esta atividade tem um simulador interativo!</p>
                <p className="text-xs text-amber-700">Experimenta esta dinâmica diretamente no nosso laboratório escolar.</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenLabDemo(activity.interactiveDemoId!);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shrink-0"
              >
                Abrir Simulador 🚀
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer with Prev / Next Navigation */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={!onPrev}
            className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl transition-colors ${
              onPrev ? 'text-slate-700 hover:bg-white hover:shadow-xs' : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Atividade Anterior</span>
          </button>

          <span className="text-xs text-slate-500 font-semibold">
            {activity.number} de 20
          </span>

          <button
            onClick={onNext}
            disabled={!onNext}
            className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl transition-colors ${
              onNext ? 'text-slate-700 hover:bg-white hover:shadow-xs' : 'text-slate-300 cursor-not-allowed'
            }`}
          >
            <span>Atividade Seguinte</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
