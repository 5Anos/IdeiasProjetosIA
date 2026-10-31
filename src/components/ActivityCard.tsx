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
  ChevronRight, 
  GraduationCap, 
  BookMarked,
  Play
} from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onOpenDetails: (activity: Activity) => void;
  onOpenLabDemo?: (demoId: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  onOpenLabDemo,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(activity.promptSuggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article 
      onClick={() => onOpenDetails(activity)}
      className="group bg-white rounded-3xl border border-slate-200/90 hover:border-purple-300 p-5 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      
      {/* Top Bar: Number, Badges, and Favorite Button */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* Activity Number Badge */}
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-extrabold text-xs flex items-center justify-center font-heading">
              #{activity.number < 10 ? `0${activity.number}` : activity.number}
            </span>

            {/* School Grade / Cycle */}
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
              <GraduationCap className="w-3 h-3 text-slate-500" />
              <span>{activity.gradeText}</span>
            </span>

            {/* Disciplines Badges */}
            {activity.disciplines.map((d) => (
              <span
                key={d}
                className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Favorite Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(activity.id);
            }}
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
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors font-heading tracking-tight mb-2">
          {activity.title}
        </h3>

        {/* Idea Summary */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {activity.idea}
        </p>

        {/* Tools Section with Logos, Names and Hyperlinks (User explicit requirement) */}
        <div className="mb-4 bg-slate-50/90 rounded-2xl p-3 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500">
              Ferramentas Sugeridas:
            </span>
            <span className="text-[10px] text-purple-600 font-bold">
              Links Oficiais ↗
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {activity.toolIds.map((tId) => {
              const tool = TOOLS[tId];
              if (!tool) return null;

              return (
                <a
                  key={tId}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-purple-50 text-slate-800 hover:text-purple-700 text-xs font-semibold border border-slate-200/80 hover:border-purple-300 transition-all shadow-2xs group/tool"
                  title={`Abrir ${tool.name} em nova aba`}
                >
                  <ToolIcon toolId={tId} size={16} />
                  <span className="truncate max-w-[140px] sm:max-w-none">{tool.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover/tool:text-purple-600 shrink-0" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Prompt Suggestion Card */}
        <div className="mb-4 bg-purple-50/70 border border-purple-100 rounded-2xl p-3 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1 font-bold text-purple-900 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Sugestão de Prompt:
            </span>
            <button
              onClick={handleCopyPrompt}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 hover:text-purple-900 bg-white/80 hover:bg-white px-2 py-0.5 rounded-md border border-purple-200 transition-colors"
              title="Copiar prompt para a área de transferência"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
          <p className="font-mono text-purple-950/80 text-[11px] bg-white/60 p-2 rounded-lg border border-purple-100/80 italic">
            "{activity.promptSuggestion}"
          </p>
        </div>

        {/* Teacher tip pill preview */}
        <div className="flex items-start gap-2 text-xs text-amber-900/90 bg-amber-50/80 border border-amber-100 p-2.5 rounded-xl">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] line-clamp-2">
            <strong className="font-bold">Dica:</strong> {activity.teacherTip}
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        {activity.interactiveDemoId && onOpenLabDemo ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenLabDemo(activity.interactiveDemoId!);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition-colors"
          >
            <Play className="w-3 h-3 fill-amber-700" />
            <span>Testar no Lab</span>
          </button>
        ) : (
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <BookMarked className="w-3.5 h-3.5" />
            Ficha Pedagógica
          </span>
        )}

        <button
          onClick={() => onOpenDetails(activity)}
          className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 group-hover:text-purple-800 group-hover:translate-x-0.5 transition-all ml-auto"
        >
          <span>Ver Ficha Completa</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </article>
  );
};
