import React from 'react';
import { Sparkles, Heart, ExternalLink, ArrowUp } from 'lucide-react';
import { GENIALLY_BASE_URL } from '../data/activities';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
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
                <p className="text-xs text-slate-400">Ideias que inspiram • 20 Atividades Práticas</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Portal pedagógico para capacitar professores e alunos na integração consciente, criativa e ética da Inteligência Artificial em sala de aula, desde o 1.º Ciclo até ao Ensino Secundário.
            </p>

            <div className="pt-2">
              <a
                href={GENIALLY_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-pink-400 hover:text-pink-300 font-bold bg-pink-950/60 border border-pink-800/60 px-3 py-1.5 rounded-xl transition-colors"
              >
                <span>Apresentação Interativa Original no Genially</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Navegação Rápida
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#atividades" className="hover:text-white transition-colors">20 Atividades Curriculares</a>
              </li>
              <li>
                <a href="#disciplinas" className="hover:text-white transition-colors">Explorar por Disciplina</a>
              </li>
              <li>
                <a href="#ferramentas" className="hover:text-white transition-colors">Catálogo de Ferramentas</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">Boas Práticas e Ética</a>
              </li>
            </ul>
          </div>

          {/* Ferramentas Populares */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Ferramentas de IA
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
                  <span>Suno AI</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>Desenvolvido com inspiração pedagógica para a comunidade educativa.</span>
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
