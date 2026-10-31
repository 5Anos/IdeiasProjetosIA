/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ACTIVITIES } from './data/activities';
import { Activity, DisciplineName } from './types';
import { getDisciplineCounts } from './utils/filterActivities';
import { Navbar, MainTabType } from './components/Navbar';
import { Hero } from './components/Hero';
import { DisciplineProjectTabs } from './components/DisciplineProjectTabs';
import { ToolsDirectory } from './components/ToolsDirectory';
import { PedagogicalGuide } from './components/PedagogicalGuide';
import { ScientificValidation } from './components/ScientificValidation';
import { Footer } from './components/Footer';
import { 
  BookOpen, 
  Compass, 
  Wrench, 
  Microscope, 
  Info, 
  Sparkles,
  Search
} from 'lucide-react';

export default function App() {
  // Main Tab Navigation: Default is 'disciplinas' (by discipline with project name tabs)
  const [activeMainTab, setActiveMainTab] = useState<MainTabType>('disciplinas');
  
  // Selected discipline
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineName>('Português');
  
  // Discipline search query
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Favorites storage
  const [savedFavorites, setSavedFavorites] = useState<number[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ia_educacao_favorites');
      if (stored) {
        setSavedFavorites(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  const toggleFavorite = (id: number) => {
    setSavedFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('ia_educacao_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const disciplineCounts = useMemo(() => {
    return getDisciplineCounts(ACTIVITIES);
  }, []);

  // List of disciplines with icons and styling
  const disciplinesList: { name: DisciplineName; icon: string; count: number; colorBg: string; colorText: string; colorBorder: string }[] = [
    { name: 'Português', icon: '📖', count: disciplineCounts['Português'] || 10, colorBg: 'bg-rose-50', colorText: 'text-rose-900', colorBorder: 'border-rose-200' },
    { name: 'Matemática', icon: '∑', count: disciplineCounts['Matemática'] || 4, colorBg: 'bg-blue-50', colorText: 'text-blue-900', colorBorder: 'border-blue-200' },
    { name: 'Ciências Naturais', icon: '🌿', count: disciplineCounts['Ciências Naturais'] || 4, colorBg: 'bg-emerald-50', colorText: 'text-emerald-900', colorBorder: 'border-emerald-200' },
    { name: 'História', icon: '🏛️', count: disciplineCounts['História'] || 5, colorBg: 'bg-amber-50', colorText: 'text-amber-900', colorBorder: 'border-amber-200' },
    { name: 'Educação Artística', icon: '🎨', count: disciplineCounts['Educação Artística'] || 5, colorBg: 'bg-purple-50', colorText: 'text-purple-900', colorBorder: 'border-purple-200' },
    { name: 'TIC', icon: '💻', count: disciplineCounts['TIC'] || 2, colorBg: 'bg-cyan-50', colorText: 'text-cyan-900', colorBorder: 'border-cyan-200' },
    { name: 'Cidadania', icon: '👥', count: disciplineCounts['Cidadania'] || 4, colorBg: 'bg-indigo-50', colorText: 'text-indigo-900', colorBorder: 'border-indigo-200' },
    { name: 'Inglês', icon: '🌐', count: disciplineCounts['Inglês'] || 1, colorBg: 'bg-teal-50', colorText: 'text-teal-900', colorBorder: 'border-teal-200' },
  ];

  // If user searches for a discipline, automatically select it
  const handleDisciplineSearch = (query: string) => {
    setSearchQuery(query);
    const cleanQ = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    if (!cleanQ) return;

    const matched = disciplinesList.find(d => {
      const cleanD = d.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (cleanD.includes(cleanQ)) return true;
      if (d.name === 'Ciências Naturais' && (cleanQ.includes('ciencia') || cleanQ.includes('estudo do meio') || cleanQ === 'cn')) return true;
      if (d.name === 'Educação Artística' && (cleanQ.includes('arte') || cleanQ.includes('artistica') || cleanQ.includes('ev'))) return true;
      if (d.name === 'Português' && (cleanQ.includes('portug') || cleanQ === 'pt')) return true;
      if (d.name === 'Matemática' && (cleanQ.includes('matemat') || cleanQ === 'mat')) return true;
      if (d.name === 'Cidadania' && cleanQ.includes('cidadan')) return true;
      return false;
    });

    if (matched) {
      setSelectedDiscipline(matched.name);
      setActiveMainTab('disciplinas');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeMainTab}
        setActiveTab={setActiveMainTab}
        favoritesCount={savedFavorites.length}
        onOpenFavorites={() => {
          setActiveMainTab('disciplinas');
        }}
        searchQuery={searchQuery}
        setSearchQuery={handleDisciplineSearch}
      />

      {/* Main Tab Navigation Bar */}
      <section className="bg-white border-b border-slate-200 shadow-2xs sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start md:justify-center overflow-x-auto py-2.5 gap-2 no-scrollbar">
            
            <button
              onClick={() => setActiveMainTab('disciplinas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeMainTab === 'disciplinas' || activeMainTab === 'atividades'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Por Disciplina (Abas por Projeto)</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                activeMainTab === 'disciplinas' || activeMainTab === 'atividades' 
                  ? 'bg-purple-800 text-purple-100' 
                  : 'bg-slate-200 text-slate-700'
              }`}>
                8 Disciplinas
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab('ferramentas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeMainTab === 'ferramentas'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Ferramentas de IA</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                activeMainTab === 'ferramentas' ? 'bg-purple-800 text-purple-100' : 'bg-slate-200 text-slate-700'
              }`}>
                24
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab('validacao')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeMainTab === 'validacao'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Microscope className="w-4 h-4" />
              <span>Validação Científica & Rigor</span>
            </button>

            <button
              onClick={() => setActiveMainTab('sobre')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeMainTab === 'sobre'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Sobre o Projeto & Ética</span>
            </button>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* ======================================================== */}
        {/* VISTA PRINCIPAL: POR DISCIPLINA & ABAS POR NOME DE PROJETO */}
        {/* ======================================================== */}
        {(activeMainTab === 'disciplinas' || activeMainTab === 'atividades') && (
          <DisciplineProjectTabs
            disciplines={disciplinesList}
            selectedDiscipline={selectedDiscipline}
            onSelectDiscipline={setSelectedDiscipline}
            activities={ACTIVITIES}
            savedFavorites={savedFavorites}
            onToggleFavorite={toggleFavorite}
            searchDisciplineQuery={searchQuery}
          />
        )}

        {/* ======================================================== */}
        {/* VISTA: FERRAMENTAS DE IA                                  */}
        {/* ======================================================== */}
        {activeMainTab === 'ferramentas' && (
          <div className="animate-in fade-in duration-200">
            <ToolsDirectory
              onSelectToolForFilter={(tId) => {
                // Find discipline containing this tool
                const act = ACTIVITIES.find(a => a.toolIds.includes(tId));
                if (act) {
                  setSelectedDiscipline(act.disciplines[0]);
                }
                setActiveMainTab('disciplinas');
              }}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* VISTA: VALIDAÇÃO CIENTÍFICA & RIGOR                      */}
        {/* ======================================================== */}
        {activeMainTab === 'validacao' && (
          <ScientificValidation />
        )}

        {/* ======================================================== */}
        {/* VISTA: SOBRE O PROJETO & ÉTICA                           */}
        {/* ======================================================== */}
        {activeMainTab === 'sobre' && (
          <div className="animate-in fade-in duration-200">
            <PedagogicalGuide />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        setActiveTab={(tab) => {
          setActiveMainTab(tab);
        }}
      />

    </div>
  );
}
