import React, { useState } from 'react';
import { Search, Heart, Menu, X, Sparkles, BookOpen, Wrench, Microscope, Info, Compass } from 'lucide-react';

export type MainTabType = 'atividades' | 'disciplinas' | 'ferramentas' | 'validacao' | 'sobre';

interface NavbarProps {
  activeTab: MainTabType;
  setActiveTab: (tab: MainTabType) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  onOpenFavorites,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks: { id: MainTabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'disciplinas', label: 'Por Disciplina', icon: <Compass className="w-4 h-4" />, badge: '8' },
    { id: 'ferramentas', label: 'Ferramentas de IA', icon: <Wrench className="w-4 h-4" />, badge: '24' },
    { id: 'validacao', label: 'Validação Científica', icon: <Microscope className="w-4 h-4" /> },
    { id: 'sobre', label: 'Sobre o Projeto', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('disciplinas')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-300 flex items-center justify-center shadow-md shadow-amber-200/50 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-amber-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M12 2a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3 5.5v2.5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V13.5c1.5-1 3-3 3-5.5a6 6 0 0 0-6-6Z" />
                <path d="M9 22h6" />
                <path d="M10 18h4" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-heading">
                  IA na Educação
                </span>
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                  20 Ideias
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium -mt-0.5">
                Ideias que inspiram
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === link.id
                    ? 'text-purple-800 bg-purple-50 font-bold shadow-xs border border-purple-200/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
                {link.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    activeTab === link.id
                      ? 'bg-purple-200 text-purple-900'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Discipline Search */}
            <div className="relative hidden sm:block">
              {searchOpen ? (
                <div className="flex items-center bg-slate-100 rounded-full pl-3 pr-2 py-1.5 border border-purple-300">
                  <Search className="w-4 h-4 text-slate-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Pesquisar por disciplina..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activeTab !== 'disciplinas') setActiveTab('disciplinas');
                    }}
                    autoFocus
                    className="bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden w-44 sm:w-56"
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1 hover:bg-slate-200 rounded-full text-slate-500"
                    title="Fechar pesquisa"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                  title="Pesquisar por disciplina"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Favorites Button */}
            <button
              onClick={() => {
                onOpenFavorites();
                if (activeTab !== 'disciplinas') setActiveTab('disciplinas');
              }}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all font-semibold text-xs sm:text-sm border border-rose-200/60"
              title="Ver atividades favoritas salvas"
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-rose-400'}`} />
              <span className="hidden md:inline">Favoritos</span>
              {favoritesCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 text-slate-700 hover:bg-slate-200"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Pesquisar por disciplina (ex: Português, Matemática)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'disciplinas') setActiveTab('disciplinas');
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-purple-400"
            />
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                  activeTab === link.id
                    ? 'bg-purple-100 text-purple-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
