import React, { useState } from 'react';
import { Sparkles, HelpCircle, CheckCircle2, AlertTriangle, RefreshCw, Send } from 'lucide-react';

interface PresetAnimal {
  name: string;
  emoji: string;
  vagueClues: string[];
  goodClues: string[];
  explanation: string;
}

const PRESETS: PresetAnimal[] = [
  {
    name: 'Pinguim',
    emoji: '🐧',
    vagueClues: ['É um bicho que anda', 'Gosta de frio', 'Não voa'],
    goodClues: [
      'Tem o corpo coberto por pequenas penas impermeáveis',
      'É uma ave marinha adaptada ao mergulho, mas não voa no ar',
      'Vive em regiões polares glaciais no Hemisfério Sul e alimenta-se de peixes e krill'
    ],
    explanation: 'Excelente! Usaste termos específicos de Estudo do Meio: "penas impermeáveis", "ave marinha", "regiões polares".'
  },
  {
    name: 'Golfinho',
    emoji: '🐬',
    vagueClues: ['Vive na água', 'É simpático', 'Nada bem'],
    goodClues: [
      'É um mamífero aquático que respira por um espiráculo no topo da cabeça',
      'Desloca-se ondulando a barbatana caudal na vertical',
      'Comunica através de ecolocalização e vive em grupos (oceanos e estuários)'
    ],
    explanation: 'Muito rigoroso! Diferenciaste mamífero marinho de peixe através da respiração e locomoção.'
  },
  {
    name: 'Camaleão',
    emoji: '🦎',
    vagueClues: ['Muda de cor', 'Tem quatro patas', 'Come insetos'],
    goodClues: [
      'É um réptil ovíparo com pele coberta de escamas finas que alteram a pigmentação',
      'Possui olhos com movimento independente e cauda preênsil',
      'Captura presas através de uma língua comprida e elástica'
    ],
    explanation: 'Termos biológicos fantásticos: réptil ovíparo, cauda preênsil, pigmentação!'
  },
  {
    name: 'Coruja',
    emoji: '🦉',
    vagueClues: ['Anda à noite', 'Tem penas', 'Tem olhos grandes'],
    goodClues: [
      'É uma ave de rapina noturna com voo silencioso e audição apurada',
      'Possui garras curvas fortes para agarrar roedores',
      'Consegue girar a cabeça quase 270 graus'
    ],
    explanation: 'Perfeito! As características de ave de rapina noturna identificam logo a espécie.'
  }
];

export const AnimalGuesser: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<PresetAnimal>(PRESETS[0]);
  const [clueMode, setClueMode] = useState<'good' | 'vague' | 'custom'>('good');
  const [customClues, setCustomClues] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [guessResult, setGuessResult] = useState<{
    guessedAnimal: string;
    confidence: number;
    feedback: string;
    emoji: string;
    isVague: boolean;
  } | null>(null);

  const handleTestGuess = () => {
    setIsThinking(true);
    setGuessResult(null);

    setTimeout(() => {
      setIsThinking(false);

      if (clueMode === 'vague') {
        setGuessResult({
          guessedAnimal: 'Animal Desconhecido (Pode ser um Pato, Urso ou Galinha!)',
          confidence: 35,
          feedback: '⚠️ Pistas muito vagas! "Gosta de frio" e "não voa" aplicam-se a muitos animais diferentes. O professor ensina: precisamos de vocabulário específico de Estudo do Meio (habitat, revestimento, alimentação)!',
          emoji: '❓',
          isVague: true,
        });
      } else if (clueMode === 'good') {
        setGuessResult({
          guessedAnimal: selectedPreset.name,
          confidence: 98,
          feedback: `🎯 Acertou em cheio! ${selectedPreset.explanation}`,
          emoji: selectedPreset.emoji,
          isVague: false,
        });
      } else {
        // Custom clues evaluation
        const text = customClues.toLowerCase();
        let guessed = 'Animal Misterioso';
        let emoji = '🐾';
        let feedback = 'A IA analisou as tuas pistas personalizadas!';

        if (text.includes('pena') || text.includes('bico') || text.includes('asa')) {
          guessed = 'Uma Ave (ex: Pinguim, Falcão ou Águia)';
          emoji = '🦅';
        } else if (text.includes('escama') || text.includes('brânquia') || text.includes('barbatana')) {
          guessed = 'Um Peixe ou Criatura Aquática';
          emoji = '🐠';
        } else if (text.includes('pêlo') || text.includes('leite') || text.includes('mamífero')) {
          guessed = 'Um Mamífero terrestre ou marinho';
          emoji = '🐺';
        } else {
          guessed = 'Animal não identificado claramente';
        }

        setGuessResult({
          guessedAnimal: guessed,
          confidence: text.length > 50 ? 85 : 45,
          feedback: text.length > 50
            ? 'Boas pistas descritivas! As características de locomoção e revestimento ajudaram a limitar a resposta.'
            : 'Pistas um pouco curtas. Experimenta acrescentar: onde dorme? De que se alimenta? Como é a sua pele?',
          emoji,
          isVague: text.length <= 50,
        });
      }
    }, 700);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
      
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
          🐾
        </span>
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            Simulador: A IA Adivinha o Animal (Atividade 2)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Testa a diferença entre dar pistas vagas vs pistas científicas detalhadas ao chatbot
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Config & Clues */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Pick Animal Preset */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Escolhe um animal secreto:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESETS.map((animal) => (
                <button
                  key={animal.name}
                  onClick={() => {
                    setSelectedPreset(animal);
                    setGuessResult(null);
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedPreset.name === animal.name
                      ? 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl block mb-1">{animal.emoji}</span>
                  <span className="text-xs font-bold text-slate-800">{animal.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pick Clue Style */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Como vais descrever o animal?
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setClueMode('good'); setGuessResult(null); }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  clueMode === 'good'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ✓ Pistas Precisas (Estudo do Meio)
              </button>
              <button
                onClick={() => { setClueMode('vague'); setGuessResult(null); }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  clueMode === 'vague'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ⚠️ Pistas Muito Vagas
              </button>
              <button
                onClick={() => { setClueMode('custom'); setGuessResult(null); }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  clueMode === 'custom'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ✏️ Escrever as Minhas Pistas
              </button>
            </div>
          </div>

          {/* Clues Display Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Pistas enviadas para a IA:
            </span>

            {clueMode === 'custom' ? (
              <textarea
                value={customClues}
                onChange={(e) => setCustomClues(e.target.value)}
                placeholder="Exemplo: Tem o corpo coberto de penas, é uma ave mas não voa, nada no gelo..."
                rows={4}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500"
              />
            ) : (
              <ul className="space-y-2">
                {(clueMode === 'good' ? selectedPreset.goodClues : selectedPreset.vagueClues).map((clue, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Action */}
          <button
            onClick={handleTestGuess}
            disabled={isThinking || (clueMode === 'custom' && !customClues.trim())}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-emerald-200 flex items-center justify-center gap-2 transition-all"
          >
            {isThinking ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>A IA está a analisar as pistas biológicas...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Desafiar o Chatbot de IA a Adivinhar</span>
              </>
            )}
          </button>

        </div>

        {/* Right Column: AI Deduction Result */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/40 rounded-3xl p-5 border border-emerald-100 flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Resposta da IA</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">Simulação Pedagógica</span>
            </div>

            {guessResult ? (
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="text-center p-4 bg-white rounded-2xl border border-emerald-100 shadow-xs">
                  <span className="text-5xl block mb-2">{guessResult.emoji}</span>
                  <h4 className="text-lg font-bold text-slate-900 font-heading">
                    {guessResult.guessedAnimal}
                  </h4>
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <span>Confiança: {guessResult.confidence}%</span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                  guessResult.isVague 
                    ? 'bg-amber-50 text-amber-900 border-amber-200' 
                    : 'bg-emerald-50 text-emerald-950 border-emerald-200'
                }`}>
                  {guessResult.feedback}
                </div>
              </div>
            ) : (
              <div className="h-56 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-emerald-200/80 rounded-2xl">
                <span className="text-4xl mb-2 opacity-60">🤖</span>
                <p className="text-xs font-bold text-slate-700 mb-1">
                  O Chatbot está à espera das tuas pistas!
                </p>
                <p className="text-[11px] text-slate-500">
                  Clica em "Desafiar o Chatbot de IA" para veres se as pistas fornecidas foram precisas.
                </p>
              </div>
            )}
          </div>

          {/* Dica da Atividade */}
          <div className="mt-4 pt-3 border-t border-emerald-100 text-[11px] text-slate-500 flex items-center gap-1.5">
            <span className="text-emerald-600 font-bold">💡 Dica do Professor:</span>
            <span>A precisão da resposta da IA depende diretamente da clareza das pistas!</span>
          </div>

        </div>

      </div>

    </div>
  );
};
