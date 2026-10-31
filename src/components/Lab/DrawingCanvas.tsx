import React, { useRef, useState, useEffect } from 'react';
import { 
  Paintbrush, 
  Eraser, 
  RotateCcw, 
  Download, 
  Sparkles, 
  Copy, 
  Check, 
  Palette,
  Lightbulb
} from 'lucide-react';

const PRESET_IDEAS = [
  {
    name: 'Peixe com Rodas',
    phrase: 'Ilustração infantil de um peixe azul com quatro rodas de carro a andar numa estrada.',
    color: '#3B82F6',
  },
  {
    name: 'Lápis que Voa',
    phrase: 'Desenho colorido de um lápis gigante com asas de pássaro a voar por cima das nuvens.',
    color: '#F59E0B',
  },
  {
    name: 'Casa de Chocolate',
    phrase: 'Ilustração fofa de uma casa feita de barra de chocolate com telhado de bolachas e chaminé de caramelo.',
    color: '#8B5CF6',
  },
  {
    name: 'Robô no Deserto',
    phrase: 'Pintura em aguarela de um pequeno robô enferrujado a regar uma flor dourada no meio de um deserto ao pôr do sol.',
    color: '#EC4899',
  },
];

const COLORS = [
  '#000000', '#EF4444', '#F97316', '#EAB308', 
  '#10B981', '#06B6D4', '#3B82F6', '#8B5CF6', 
  '#EC4899', '#78350F'
];

export const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#3B82F6');
  const [brushSize, setBrushSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(PRESET_IDEAS[0]);
  const [customPhrase, setCustomPhrase] = useState('');
  const [copied, setCopied] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Initial white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isEraser ? '#ffffff' : brushColor;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  const handleDownloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `o-meu-desenho-${selectedPreset.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const currentPrompt = customPhrase.trim() || selectedPreset.phrase;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
      
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-lg">
          🎨
        </span>
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            Laboratório Criativo: A IA Desenha o que Eu Imagino (Atividades 1 e 6)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Imagina uma ideia invulgar, gera o prompt para a IA e desenha a tua própria versão no quadro digital!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Idea Chooser & Prompt Generator */}
        <div className="lg:col-span-5 space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Ideia invulgar:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_IDEAS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setSelectedPreset(item);
                    setCustomPhrase('');
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedPreset.name === item.name && !customPhrase
                      ? 'border-purple-500 bg-purple-50/70 ring-2 ring-purple-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-800 block">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Ou inventa a tua frase com adjetivos:
            </label>
            <input
              type="text"
              value={customPhrase}
              onChange={(e) => setCustomPhrase(e.target.value)}
              placeholder="Ex: Um elefante voador com patins dourados na praia..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-purple-500"
            />
          </div>

          {/* Generated Prompt Box */}
          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Prompt pronto para colar no Canva ou Copilot:</span>
              </span>
              <button
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 hover:text-purple-900 bg-white px-2 py-1 rounded-lg border border-purple-200 shadow-2xs"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <p className="font-mono text-purple-950 text-xs bg-white p-2.5 rounded-xl border border-purple-100">
              "{currentPrompt}"
            </p>
          </div>

          {/* Teacher observation callout */}
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Exercício de sala de aula:</strong> Mostra aos alunos como alterar apenas uma cor ou tamanho muda totalmente o desenho gerado pela IA.
            </p>
          </div>

        </div>

        {/* Right: Interactive Drawing Canvas for the Student */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-5 flex flex-col justify-between">
          
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Desenha a tua própria versão do objeto:
                </span>
              </div>

              {/* Tools Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEraser(false)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all ${
                    !isEraser ? 'bg-purple-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                  title="Pincel"
                >
                  <Paintbrush className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsEraser(true)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all ${
                    isEraser ? 'bg-purple-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                  title="Borracha"
                >
                  <Eraser className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleClearCanvas}
                  className="p-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                  title="Limpar quadro"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleDownloadDrawing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                  title="Guardar o desenho do aluno"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Descarregar</span>
                </button>
              </div>
            </div>

            {/* Color Palette & Brush Size */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-white p-2.5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Palette className="w-3.5 h-3.5 text-slate-400 mr-1" />
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setBrushColor(c);
                      setIsEraser(false);
                    }}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      brushColor === c && !isEraser ? 'scale-125 border-slate-900 shadow-xs' : 'border-white'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <span>Espessura:</span>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-20 accent-purple-600"
                />
              </div>
            </div>

            {/* Drawing Board */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-300 bg-white shadow-inner">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-64 sm:h-72 cursor-crosshair touch-none"
              />
              <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 bg-white/80 px-2 py-0.5 rounded-md pointer-events-none">
                Área de Desenho do Aluno
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-3 text-center">
            Compara depois o teu desenho original com o resultado obtido na ferramenta de IA!
          </p>

        </div>

      </div>

    </div>
  );
};
