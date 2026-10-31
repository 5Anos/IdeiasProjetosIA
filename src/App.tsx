/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ACTIVITIES } from './data/activities';
import { TOOLS } from './data/tools';
import { Activity, DisciplineName, EducationalCycle } from './types';
import { filterActivities, getDisciplineCounts } from './utils/filterActivities';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DisciplineCards } from './components/DisciplineCards';
import { ActivityCard } from './components/ActivityCard';
import { ActivityModal } from './components/ActivityModal';
import { ToolsDirectory } from './components/ToolsDirectory';
import { PedagogicalGuide } from './components/PedagogicalGuide';
import { Footer } from './components/Footer';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Heart, 
  RotateCcw, 
  BookOpen, 
  GraduationCap, 
  Wrench,
  CheckCircle,
  Layers
} from 'lucide-react';

const CYCLES: (EducationalCycle | 'todos')[] = [
  'todos',
  '1.º Ciclo',
  '2.º Ciclo',
  '3.º Ciclo',
  'Ensino Secundário',
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineName | 'todas'>('todas');
  const [selectedCycle, setSelectedCycle] = useState<EducationalCycle | 'todos'>('todos');
  const [selectedToolId, setSelectedToolId] = useState<string>('todas');
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [savedFavorites, setSavedFavorites] = useState<number[]>([]);
  
  // Modal state
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

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

  // Filtered activities
  const filteredActivities = useMemo(() => {
    return filterActivities(ACTIVITIES, {
      searchQuery,
      selectedDiscipline,
      selectedCycle,
      selectedToolId,
      favoritesOnly,
      savedFavorites,
    });
  }, [searchQuery, selectedDiscipline, selectedCycle, selectedToolId, favoritesOnly, savedFavorites]);

  const disciplineCounts = useMemo(() => {
    return getDisciplineCounts(ACTIVITIES);
  }, []);

  // Modal navigation
  const currentIndex = selectedActivity
    ? filteredActivities.findIndex((a) => a.id === selectedActivity.id)
    : -1;

  const handleNextActivity = () => {
    if (currentIndex >= 0 && currentIndex < filteredActivities.length - 1) {
      setSelectedActivity(filteredActivities[currentIndex + 1]);
    }
  };

  const handlePrevActivity = () => {
    if (currentIndex > 0) {
      setSelectedActivity(filteredActivities[currentIndex - 1]);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDiscipline('todas');
    setSelectedCycle('todos');
    setSelectedToolId('todas');
    setFavoritesOnly(false);
  };

  const scrollToActivities = () => {
    const el = document.getElementById('atividades');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDisciplines = () => {
    const el = document.getElementById('disciplinas');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedDiscipline !== 'todas' ||
    selectedCycle !== 'todos' ||
    selectedToolId !== 'todas' ||
    favoritesOnly;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={savedFavorites.length}
        onOpenFavorites={() => {
          setFavoritesOnly(true);
          scrollToActivities();
        }}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q.trim()) scrollToActivities();
        }}
        onSelectDiscipline={setSelectedDiscipline}
      />

      <main className="flex-1">
        {/* Hero Section matching attached mockup */}
        <Hero
          onExploreAll={scrollToActivities}
          onExploreDisciplines={scrollToDisciplines}
        />

        {/* Discipline Cards Bar matching mockup */}
        <DisciplineCards
          selectedDiscipline={selectedDiscipline}
          onSelectDiscipline={setSelectedDiscipline}
          disciplineCounts={disciplineCounts}
        />

        {/* Activities Section */}
        <section id="atividades" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          
          {/* Section Header & Search/Filters Controls */}
          <div className="space-y-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Catálogo Curricular</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                  20 Ideias de Atividades com IA
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Com prompts testados, dinâmica de sala de aula e ferramentas com hiperligações diretas
                </p>
              </div>

              {/* Counter Pill */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <span className="px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                  A mostrar {filteredActivities.length} de {ACTIVITIES.length} ideias
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-purple-700 bg-white border border-slate-200 px-3 py-1.5 rounded-full transition-colors"
                    title="Limpar todos os filtros aplicados"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Limpar Filtros</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filter Toolbar Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
              
              {/* Row 1: Search & Quick Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                
                {/* Search Input */}
                <div className="md:col-span-6 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar por tema (ex: animal, fábula, sólido, clima, música, robô)..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-purple-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs font-bold text-slate-400 hover:text-slate-600"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Filter by Tool Dropdown */}
                <div className="md:col-span-3">
                  <div className="relative">
                    <select
                      value={selectedToolId}
                      onChange={(e) => setSelectedToolId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:outline-hidden focus:border-purple-500 appearance-none cursor-pointer"
                    >
                      <option value="todas">Todas as Ferramentas</option>
                      {Object.values(TOOLS).map((tool) => (
                        <option key={tool.id} value={tool.id}>
                          {tool.name}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-3.5 top-3 pointer-events-none text-slate-400 text-xs">
                      ▼
                    </span>
                  </div>
                </div>

                {/* Favorites Toggle Button */}
                <div className="md:col-span-3">
                  <button
                    onClick={() => setFavoritesOnly(!favoritesOnly)}
                    className={`w-full py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      favoritesOnly
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favoritesOnly ? 'fill-white' : 'fill-rose-400'}`} />
                    <span>Apenas Favoritos ({savedFavorites.length})</span>
                  </button>
                </div>

              </div>

              {/* Row 2: Cycle Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Ciclo de Ensino:
                </span>
                {CYCLES.map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => setSelectedCycle(cycle)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedCycle === cycle
                        ? 'bg-purple-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cycle === 'todos' ? 'Todos os Ciclos' : cycle}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Activities Grid */}
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  isFavorite={savedFavorites.includes(activity.id)}
                  onToggleFavorite={toggleFavorite}
                  onOpenDetails={(act) => setSelectedActivity(act)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
              <span className="text-5xl block mb-3">🔍</span>
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
                Nenhuma atividade encontrada com estes filtros
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-5">
                Tenta pesquisar por outro termo ou limpa os filtros ativos para veres todas as 20 atividades.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
              >
                Repor Todos os Filtros
              </button>
            </div>
          )}

        </section>

        {/* Tools Directory Section with all 24 tools, logos and hyperlinks */}
        <ToolsDirectory
          onSelectToolForFilter={(tId) => {
            setSelectedToolId(tId);
            scrollToActivities();
          }}
        />

        {/* Pedagogical Guide & Ethics */}
        <PedagogicalGuide />
      </main>

      {/* Footer */}
      <Footer onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      {/* Activity Details Modal */}
      <ActivityModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onNext={currentIndex < filteredActivities.length - 1 ? handleNextActivity : undefined}
        onPrev={currentIndex > 0 ? handlePrevActivity : undefined}
        isFavorite={selectedActivity ? savedFavorites.includes(selectedActivity.id) : false}
        onToggleFavorite={toggleFavorite}
      />

    </div>
  );
}
