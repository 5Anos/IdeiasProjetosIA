import React from 'react';
import { DISCIPLINE_CARDS } from '../data/disciplines';
import { DisciplineName } from '../types';
import { BookOpen, Sigma, Leaf, Landmark, Palette, Laptop, Users, ChevronRight, Sparkles } from 'lucide-react';

interface DisciplineCardsProps {
  selectedDiscipline: DisciplineName | 'todas';
  onSelectDiscipline: (discipline: DisciplineName | 'todas') => void;
  disciplineCounts: Record<DisciplineName, number>;
}

export const DisciplineCards: React.FC<DisciplineCardsProps> = ({
  selectedDiscipline,
  onSelectDiscipline,
  disciplineCounts,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'book-open':
        return <BookOpen className="w-5 h-5" />;
      case 'sigma':
        return <Sigma className="w-5 h-5" />;
      case 'leaf':
        return <Leaf className="w-5 h-5" />;
      case 'landmark':
        return <Landmark className="w-5 h-5" />;
      case 'palette':
        return <Palette className="w-5 h-5" />;
      case 'laptop':
        return <Laptop className="w-5 h-5" />;
      case 'users':
        return <Users className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="disciplinas" className="py-6 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading tracking-tight">
              Explorar por Disciplina
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Seleciona uma disciplina para filtrar as atividades pedagógicas com IA correspondentes
            </p>
          </div>

          {/* Reset / All Button */}
          {selectedDiscipline !== 'todas' && (
            <button
              onClick={() => onSelectDiscipline('todas')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full transition-colors self-start sm:self-auto"
            >
              <span>Ver todas (20 ideias)</span>
              <span>×</span>
            </button>
          )}
        </div>

        {/* Horizontal Scrollable / Responsive Cards Grid matching the mockup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {DISCIPLINE_CARDS.map((card) => {
            const isSelected = selectedDiscipline === card.name;
            const actualCount = disciplineCounts[card.name] || card.count;

            return (
              <button
                key={card.slug}
                onClick={() => {
                  onSelectDiscipline(isSelected ? 'todas' : card.name);
                  const el = document.getElementById('atividades');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col justify-between h-36 sm:h-40 ${
                  card.colorBg
                } ${card.colorBorder} ${
                  isSelected
                    ? 'ring-2 ring-purple-600 shadow-md scale-[1.02]'
                    : 'hover:shadow-md hover:-translate-y-0.5'
                }`}
                aria-pressed={isSelected}
              >
                {/* Top: Icon Badge */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 ${card.colorIcon}`}
                >
                  {getIcon(card.iconName)}
                </div>

                {/* Bottom: Name & Count */}
                <div>
                  <h3 className={`font-bold text-sm sm:text-base leading-tight ${card.colorText}`}>
                    {card.label}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {actualCount} {actualCount === 1 ? 'ideia' : 'ideias'}
                  </p>
                </div>

                {/* Bottom right indicator arrow */}
                <div className="absolute bottom-3 right-3 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
