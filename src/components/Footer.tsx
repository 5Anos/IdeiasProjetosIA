import React from 'react';
import { ExternalLink, ArrowUp, Sparkles, BookOpen, Wrench, Microscope, Info } from 'lucide-react';
import { MainTabType } from './Navbar';

interface FooterProps {
  onScrollToTop: () => void;
  setActiveTab: (tab: MainTabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
                💡
              </div>
              <div>
                <span className="text-white text-lg font-bold font-heading">IA na Educação</span>
                <p className="text-xs text-slate-400">Ideias que inspiram • 20 Atividades Curriculares</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Portal pedagógico para capacitar professores e alunos na integração consciente, criativa e ética da Inteligência Artificial em sala de aula, do 1.º Ciclo ao Ensino Secundário.
            </p>
          </div>

          {/* Quick Tab links */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Navegação por Disciplinas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setActiveTab('disciplinas'); onScrollToTop(); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3 h-3 text-blue-400" />
                  <span>Projetos por Disciplina</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('ferramentas'); onScrollToTop(); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Wrench className="w-3 h-3 text-emerald-400" />
                  <span>Catálogo de 24 Ferramentas</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('validacao'); onScrollToTop(); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Microscope className="w-3 h-3 text-amber-400" />
                  <span>Validação Científica & Rigor</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('sobre'); onScrollToTop(); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-3 h-3 text-pink-400" />
                  <span>Sobre o Projeto & Ética</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Ferramentas Populares */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Ferramentas Oficiais
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="https://copilot.microsoft.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Microsoft Copilot</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://www.canva.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Canva Texto para Imagem</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>ChatGPT (OpenAI)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Google Gemini</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://suno.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Suno AI (Música)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            <span>Desenvolvido com rigor pedagógico e científico para a comunidade educativa.</span>
          </p>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white font-bold transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
