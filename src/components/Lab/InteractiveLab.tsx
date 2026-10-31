import React, { useState } from 'react';
import { AnimalGuesser } from './AnimalGuesser';
import { DrawingCanvas } from './DrawingCanvas';
import { GeometryArchitect } from './GeometryArchitect';
import { PromptGenerator } from './PromptGenerator';
import { Sparkles, HelpCircle, Palette, Box, Sliders } from 'lucide-react';

interface InteractiveLabProps {
  initialTab?: 'guess_animal' | 'draw_imagine' | 'geometry_shapes' | 'prompt_helper' | string;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ initialTab = 'guess_animal' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const tabs = [
    {
      id: 'guess_animal',
      label: 'A IA Adivinha o Animal',
      badge: 'Atividade 2',
      icon: '🐾',
    },
    {
      id: 'draw_imagine',
      label: 'A IA Desenha o que Imagino',
      badge: 'Atividades 1 e 6',
      icon: '🎨',
    },
    {
      id: 'geometry_shapes',
      label: 'Arquiteto das Formas',
      badge: 'Atividades 4 e 9',
      icon: '📐',
    },
    {
      id: 'prompt_helper',
      label: 'Gerador de Prompts',
      badge: 'Apoio Pedagógico',
      icon: '🪄',
    },
  ];

  return (
    <section id="laboratorio" className="py-12 bg-gradient-to-b from-slate-50 via-purple-50/20 to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Laboratório Interativo Escolar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Experimenta as Atividades na Prática
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-2">
            Simuladores práticos concebidos para professores e alunos testarem como a Inteligência Artificial responde em contexto pedagógico.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-2xs ${
                activeTab === tab.id
                  ? 'bg-purple-700 text-white shadow-md shadow-purple-200 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-purple-800 text-purple-200' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'guess_animal' && <AnimalGuesser />}
          {activeTab === 'draw_imagine' && <DrawingCanvas />}
          {activeTab === 'geometry_shapes' && <GeometryArchitect />}
          {activeTab === 'prompt_helper' && <PromptGenerator />}
        </div>

      </div>
    </section>
  );
};
