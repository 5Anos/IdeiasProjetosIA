import React, { useState } from 'react';
import { Sparkles, Copy, Check, Sliders, ExternalLink, RefreshCw } from 'lucide-react';
import { TOOLS } from '../../data/tools';
import { ToolIcon } from '../ToolIcon';

interface PresetPromptTemplate {
  subject: string;
  grade: string;
  goal: string;
  suggestedTool: string;
  template: (grade: string, topic: string) => string;
}

const TEMPLATES: PresetPromptTemplate[] = [
  {
    subject: 'Português',
    grade: '3.º ou 4.º ano',
    goal: 'Reescrita Criativa de Fábula',
    suggestedTool: 'chatgpt',
    template: (grade, topic) =>
      `Atua como um professor de Português para alunos do ${grade}. Reescreve o final da história ou fábula "${topic || 'A Lebre e a Tartaruga'}" onde as personagens colaboram em equipa para resolver um obstáculo comum. Usa frases curtas e vocabulário expressivo.`
  },
  {
    subject: 'Ciências Naturais',
    grade: '5.º ou 6.º ano',
    goal: 'Quiz Interativo do Ciclo da Água',
    suggestedTool: 'notebooklm',
    template: (grade, topic) =>
      `Sugere 5 perguntas de escolha múltipla para alunos do ${grade} sobre o tema "${topic || 'o ciclo da água e as alterações climáticas'}". Inclui 4 opções por pergunta, indica a resposta correta e explica sucintamente porquê com rigor científico.`
  },
  {
    subject: 'Matemática',
    grade: '5.º ano',
    goal: 'Enigmas de Sólidos Geométricos',
    suggestedTool: 'chatgpt',
    template: (grade, topic) =>
      `Cria 3 enigmas matemáticos para o ${grade} sobre "${topic || 'prismas, pirâmides e poliedros'}", dando pistas graduais sobre o número de faces, vértices e arestas, sem revelar logo a solução.`
  },
  {
    subject: 'História',
    grade: '8.º ano',
    goal: 'Diálogo entre Figuras Históricas',
    suggestedTool: 'chatgpt',
    template: (grade, topic) =>
      `Escreve um guião de diálogo curto e rigoroso para alunos do ${grade} entre "${topic || 'Montesquieu e um monarca absolutista'}" sobre a separação dos três poderes do Estado, com linguagem acessível para encenação em sala de aula.`
  },
  {
    subject: 'Cidadania',
    grade: '7.º ao 9.º ano',
    goal: 'Simulador de Debate Crítico',
    suggestedTool: 'claude',
    template: (grade, topic) =>
      `Vamos preparar um debate de sala de aula sobre "${topic || 'o uso ético das redes sociais e privacidade de dados'}". Atua como um adversário experiente e apresenta 3 contra-argumentos fortes e bem fundamentados para os alunos refutarem.`
  }
];

export const PromptGenerator: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [topic, setTopic] = useState('');
  const [customGrade, setCustomGrade] = useState('');
  const [copied, setCopied] = useState(false);

  const activeTemplate = TEMPLATES[selectedIdx];
  const effectiveGrade = customGrade || activeTemplate.grade;
  const generatedPrompt = activeTemplate.template(effectiveGrade, topic);
  const tool = TOOLS[activeTemplate.suggestedTool] || TOOLS['chatgpt'];

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
      
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-lg">
          🪄
        </span>
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            Gerador de Prompts Pedagógicos Personalizáveis
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Estrutura comandos educativos prontos para usar com os teus alunos nos principais chatbots e geradores de IA
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Configuration */}
        <div className="lg:col-span-5 space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Seleciona o modelo pedagógico:
            </label>
            <div className="space-y-2">
              {TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedIdx(idx);
                    setCustomGrade('');
                  }}
                  className={`w-full p-3 rounded-2xl border text-left transition-all ${
                    selectedIdx === idx
                      ? 'border-purple-600 bg-purple-50/70 ring-2 ring-purple-500/20 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-700">{tmpl.subject}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{tmpl.grade}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{tmpl.goal}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tema ou Conteúdo Específico (opcional):
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: As fontes de energia renováveis / O ciclo da água..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-purple-500"
            />
          </div>

        </div>

        {/* Right: Output and Tool Launcher */}
        <div className="lg:col-span-7 bg-slate-900 text-slate-100 rounded-3xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Prompt Estruturado Pronto a Usar</span>
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Prompt'}</span>
              </button>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-purple-100 leading-relaxed mb-4 select-all">
              "{generatedPrompt}"
            </div>
          </div>

          {/* Recommended Tool Launcher with link and icon */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-800/40 p-3.5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-xl bg-slate-800 shrink-0">
                <ToolIcon toolId={tool.id} size={24} />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Ferramenta recomendada:</span>
                <span className="font-bold text-white text-xs sm:text-sm">{tool.name}</span>
              </div>
            </div>

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-900 hover:bg-purple-100 text-xs font-bold transition-colors shrink-0"
            >
              <span>Abrir {tool.name.split(' ')[0]} ↗</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
