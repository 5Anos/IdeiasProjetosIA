import React, { useState } from 'react';
import { Box, Triangle, Circle, Cylinder, Plus, Minus, RotateCcw, Copy, Check, Sparkles, Lightbulb } from 'lucide-react';

interface ShapeItem {
  id: string;
  name: string;
  type: '3D (Sólido)' | '2D (Plana)';
  colorName: string;
  hexColor: string;
  faces: number;
  vertices: number;
  count: number;
}

const INITIAL_SHAPES: ShapeItem[] = [
  { id: 'cube', name: 'Cubo', type: '3D (Sólido)', colorName: 'amarelo', hexColor: '#EAB308', faces: 6, vertices: 8, count: 1 },
  { id: 'pyramid', name: 'Pirâmide', type: '3D (Sólido)', colorName: 'vermelha', hexColor: '#EF4444', faces: 5, vertices: 5, count: 1 },
  { id: 'sphere', name: 'Esfera', type: '3D (Sólido)', colorName: 'verde', hexColor: '#10B981', faces: 1, vertices: 0, count: 2 },
  { id: 'cylinder', name: 'Cilindro', type: '3D (Sólido)', colorName: 'azul', hexColor: '#3B82F6', faces: 3, vertices: 0, count: 0 },
  { id: 'prism', name: 'Prisma Triangular', type: '3D (Sólido)', colorName: 'laranja', hexColor: '#F97316', faces: 5, vertices: 6, count: 0 },
];

export const GeometryArchitect: React.FC = () => {
  const [shapes, setShapes] = useState<ShapeItem[]>(INITIAL_SHAPES);
  const [buildingType, setBuildingType] = useState('uma casa geométrica');
  const [copied, setCopied] = useState(false);

  const updateCount = (id: string, delta: number) => {
    setShapes(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextCount = Math.max(0, item.count + delta);
          return { ...item, count: nextCount };
        }
        return item;
      })
    );
  };

  const handleReset = () => {
    setShapes(INITIAL_SHAPES);
  };

  const totalShapes = shapes.reduce((sum, s) => sum + s.count, 0);
  const totalFaces = shapes.reduce((sum, s) => sum + (s.count * s.faces), 0);

  // Generate dynamic prompt
  const shapeDescriptions = shapes
    .filter(s => s.count > 0)
    .map(s => `${s.count} ${s.name.toLowerCase()} ${s.colorName}`)
    .join(', ');

  const promptText = `Gera a imagem de ${buildingType} do futuro construída apenas com formas geométricas rigorosas: ${shapeDescriptions || 'com blocos geométricos coloridos'}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
      
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-lg">
          📐
        </span>
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-heading">
            O Arquiteto das Formas Geométricas (Atividades 4 e 9)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Define as figuras e sólidos geométricos e gera instruções matemáticas precisas para a IA construir uma cidade do futuro.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Shape Selector */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Seleciona as formas e quantidades:
            </label>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-purple-600 font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Repor</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {shapes.map((shape) => (
              <div
                key={shape.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: shape.hexColor }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs"
                  >
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      {shape.name} <span className="text-xs font-normal text-slate-500">({shape.colorName})</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {shape.type} • {shape.faces} faces • {shape.vertices} vértices
                    </p>
                  </div>
                </div>

                {/* Counter */}
                <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-slate-200">
                  <button
                    onClick={() => updateCount(shape.id, -1)}
                    disabled={shape.count === 0}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-slate-900">
                    {shape.count}
                  </span>
                  <button
                    onClick={() => updateCount(shape.id, 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Building Type Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Tipo de construção:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['uma casa geométrica', 'um edifício do futuro', 'uma torre científica'].map((type) => (
                <button
                  key={type}
                  onClick={() => setBuildingType(type)}
                  className={`p-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    buildingType === type
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Real-time Math Summary & Prompt */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 rounded-3xl p-5 border border-blue-100 flex flex-col justify-between">
          
          <div>
            {/* Live Count Cards */}
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-3">
              📊 Registo Matemático de Contagem:
            </span>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-3 bg-white rounded-2xl border border-blue-100 text-center">
                <span className="text-2xl font-extrabold text-blue-700 font-heading">{totalShapes}</span>
                <p className="text-[11px] font-bold text-slate-600">Total de Sólidos</p>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-blue-100 text-center">
                <span className="text-2xl font-extrabold text-purple-700 font-heading">{totalFaces}</span>
                <p className="text-[11px] font-bold text-slate-600">Total de Faces</p>
              </div>
            </div>

            {/* Visual Builder Representation */}
            <div className="bg-slate-900 rounded-2xl p-4 text-center mb-4 min-h-[120px] flex items-center justify-center flex-wrap gap-2 border border-slate-800">
              {shapes.filter(s => s.count > 0).map((s) => (
                Array.from({ length: s.count }).map((_, idx) => (
                  <div
                    key={`${s.id}-${idx}`}
                    style={{ backgroundColor: s.hexColor }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md transform hover:scale-110 transition-transform"
                    title={`${s.name} (${s.colorName})`}
                  >
                    {s.name[0]}
                  </div>
                ))
              ))}
              {totalShapes === 0 && (
                <span className="text-xs text-slate-400">Adiciona sólidos para montar a estrutura</span>
              )}
            </div>

            {/* Generated Prompt */}
            <div className="bg-white rounded-2xl p-3.5 border border-blue-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Prompt Matemático:
                </span>
                <button
                  onClick={handleCopy}
                  className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <p className="font-mono text-slate-800 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                "{promptText}"
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-100 text-[11px] text-slate-500 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong>Dica pedagógica:</strong> Pede aos alunos para conferirem se a IA desenhou figuras 2D ou sólidos 3D!
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
