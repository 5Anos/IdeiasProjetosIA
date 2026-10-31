import React, { useState, useEffect } from 'react';
import { Activity, DisciplineName, EducationalCycle } from '../types';
import { TOOLS } from '../data/tools';
import { ToolIcon } from './ToolIcon';
import { 
  Sparkles, 
  Check, 
  Copy, 
  ExternalLink, 
  Lightbulb, 
  GraduationCap, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Microscope, 
  CheckCircle2,
  Clock,
  Users,
  Printer,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

interface DisciplineProjectTabsProps {
  disciplines: { name: DisciplineName; icon: string; count: number; colorBg: string; colorText: string; colorBorder: string }[];
  selectedDiscipline: DisciplineName;
  onSelectDiscipline: (discipline: DisciplineName) => void;
  activities: Activity[];
  savedFavorites: number[];
  onToggleFavorite: (id: number) => void;
  searchDisciplineQuery: string;
}

export const DisciplineProjectTabs: React.FC<DisciplineProjectTabsProps> = ({
  disciplines,
  selectedDiscipline,
  onSelectDiscipline,
  activities,
  savedFavorites,
  onToggleFavorite,
}) => {
  // Quick cycle filter inside the discipline
  const [selectedCycleFilter, setSelectedCycleFilter] = useState<EducationalCycle | 'Todos'>('Todos');

  // Filter activities that belong to the selected discipline
  const allProjectsInDiscipline = activities.filter((act) =>
    act.disciplines.includes(selectedDiscipline)
  );

  const projectsInDiscipline = selectedCycleFilter === 'Todos'
    ? allProjectsInDiscipline
    : allProjectsInDiscipline.filter((act) => act.cycle.includes(selectedCycleFilter));

  // Active project within the selected discipline
  const [activeProjectId, setActiveProjectId] = useState<number>(() => {
    return allProjectsInDiscipline[0]?.id || 1;
  });

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [projectorMode, setProjectorMode] = useState(false);

  // When selectedDiscipline changes, make sure activeProjectId belongs to that discipline
  useEffect(() => {
    if (allProjectsInDiscipline.length > 0) {
      const exists = allProjectsInDiscipline.some((p) => p.id === activeProjectId);
      if (!exists) {
        setActiveProjectId(allProjectsInDiscipline[0].id);
      }
    }
    // Reset cycle filter when discipline changes
    setSelectedCycleFilter('Todos');
  }, [selectedDiscipline]);

  const activeProject = activities.find((p) => p.id === activeProjectId) || allProjectsInDiscipline[0] || activities[0];

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Previous & Next navigation within the filtered discipline list
  const currentIndex = allProjectsInDiscipline.findIndex((p) => p.id === activeProject.id);
  const prevProject = currentIndex > 0 ? allProjectsInDiscipline[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjectsInDiscipline.length - 1 ? allProjectsInDiscipline[currentIndex + 1] : null;

  // Specific scientific note for this project
  const getScientificFactForProject = (actId: number): { title: string; fact: string; isCaution?: boolean } | null => {
    switch (actId) {
      case 2:
        return {
          title: 'Validação Biológica (Pinguins / Aves marinhas)',
          fact: 'Pinguins (Spheniscidae) são aves marinhas do Hemisfério Sul adaptadas ao mergulho com penas hidrofóbicas densas e ossos densos. Não voam no ar, mas "voam" na água.',
        };
      case 4:
        return {
          title: 'Rigor Matemático (Poliedros vs Corpos Redondos)',
          fact: 'Cubos e pirâmides são poliedros (faces poligonais planas). Esferas e cilindros são corpos redondos (não-poliedros delimitados por superfícies curvas). A esfera tem 0 faces planas, 0 arestas e 0 vértices.',
          isCaution: true,
        };
      case 7:
        return {
          title: 'Validação Paleontológica (Extinção K-Pg)',
          fact: 'A extinção Cretácico-Paleogénico ocorreu há ~66 milhões de anos (impacto de Chicxulub + vulcanismo Deccan). Dinossauros não-avianos foram extintos; aves são os únicos dinossauros sobreviventes.',
        };
      case 8:
      case 11:
      case 13:
        return {
          title: 'Validação Hidrológica e Climatológica',
          fact: 'O ciclo hidrológico obedece à equação de Clausius-Clapeyron: cada 1 °C de aquecimento atmosférico aumenta a capacidade de retenção de vapor em ~7%, intensificando secas e precipitações extremas.',
        };
      case 12:
        return {
          title: 'Rigor Algébrico',
          fact: 'Equação de 1.º grau: 4x + 12 = 60 resulta exatamente em x = 12. Os enunciados contextualizados da IA devem ser sempre testados pelos alunos para verificar coerência.',
        };
      case 10:
      case 18:
        return {
          title: 'Rigor Epistemológico e RGPD',
          fact: 'Chatbots não pensam; prevêem o próximo token estatisticamente. Menores de 13 anos não devem ter contas próprias segundo os termos das empresas de IA e a Lei 58/2019 (RGPD em Portugal).',
          isCaution: true,
        };
      default:
        return null;
    }
  };

  const projectScientificNote = getScientificFactForProject(activeProject.id);

  // Helper to render prompt with highlighted variables [exemplo]
  const renderPromptWithHighlightedVars = (text: string) => {
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span 
            key={i} 
            className="inline-block bg-amber-400 text-slate-950 font-bold px-2 py-0.5 mx-0.5 rounded-md border border-amber-500 shadow-2xs"
            title="Variável a personalizar pela turma"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. SELEÇÃO DA DISCIPLINA */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 block mb-1">
              Passo 1 • Seleciona a Disciplina
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
              Disciplinas Curriculares
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Mostrando projetos de: <strong className="text-purple-800 font-bold">{selectedDiscipline}</strong> ({allProjectsInDiscipline.length} projetos)
          </span>
        </div>

        {/* Discipline Selection Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-2">
          {disciplines.map((disc) => {
            const isSelected = selectedDiscipline === disc.name;

            return (
              <button
                key={disc.name}
                onClick={() => onSelectDiscipline(disc.name)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[82px] ${
                  isSelected
                    ? 'bg-purple-700 text-white border-purple-700 shadow-md ring-2 ring-purple-300 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-base">{disc.icon}</span>
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-purple-800 text-purple-100' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {disc.count}
                  </span>
                </div>
                <div className="mt-2 font-bold text-xs leading-tight line-clamp-1">
                  {disc.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. DENTRO DA DISCIPLINA: ABAS POR NOME DE PROJETO */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4 print:hidden">
        
        {/* Header & Quick Cycle Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-700 block">
              Passo 2 • Escolhe o Projeto em {selectedDiscipline}
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Abas de Projetos ({projectsInDiscipline.length})
            </h3>
          </div>

          {/* Quick cycle pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-semibold mr-1">Filtrar Ciclo:</span>
            {(['Todos', '1.º Ciclo', '2.º Ciclo', '3.º Ciclo', 'Ensino Secundário'] as const).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setSelectedCycleFilter(cycle)}
                className={`px-2.5 py-1 rounded-xl font-bold transition-colors ${
                  selectedCycleFilter === cycle
                    ? 'bg-purple-100 text-purple-900 border border-purple-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cycle}
              </button>
            ))}
          </div>
        </div>

        {/* Project Name Tabs Bar with Grade Badge */}
        <div className="flex flex-wrap gap-2 pt-1">
          {projectsInDiscipline.map((project) => {
            const isSelected = project.id === activeProject.id;
            const isFav = savedFavorites.includes(project.id);

            return (
              <button
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                className={`group px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-purple-700 text-white border-purple-700 shadow-sm ring-2 ring-purple-200'
                    : 'bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-900 border-slate-200 hover:border-purple-200'
                }`}
                title={project.title}
              >
                {/* Number & Grade Badge */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-extrabold ${
                      isSelected ? 'bg-purple-800 text-purple-100' : 'bg-slate-200 text-slate-600 group-hover:bg-purple-200'
                    }`}
                  >
                    {project.number}
                  </span>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {project.gradeText}
                  </span>
                </div>

                <span className="max-w-[200px] sm:max-w-xs truncate">
                  {project.title}
                </span>

                {isFav && (
                  <span className="text-rose-400 text-xs shrink-0">★</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. VISUALIZAÇÃO COMPLETA DO PROJETO SELECIONADO (SEM POP-UPS, SEM LINKS GENIALLY) */}
      <div 
        id="project-print-sheet" 
        className={`bg-white rounded-3xl border border-purple-100 shadow-md overflow-hidden animate-in fade-in duration-150 print:border-none print:shadow-none ${
          projectorMode ? 'p-8 max-w-5xl mx-auto ring-4 ring-purple-500 shadow-2xl' : ''
        }`}
      >
        
        {/* Project Header Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 print:bg-none print:text-slate-900 print:p-0 print:border-b-2 print:border-slate-900 print:pb-4">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-purple-500/30 text-purple-200 font-extrabold text-xs flex items-center justify-center font-heading border border-purple-400/30 print:border-slate-800 print:text-slate-900">
                  #{activeProject.number < 10 ? `0${activeProject.number}` : activeProject.number}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-200 bg-white/10 px-3 py-1 rounded-full border border-white/10 print:border-slate-400 print:text-slate-800">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-300" />
                  <span>{activeProject.gradeText}</span>
                </span>

                {activeProject.disciplines.map((d) => (
                  <span
                    key={d}
                    className="text-xs font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 print:border-slate-400 print:text-slate-800"
                  >
                    {d}
                  </span>
                ))}

                <span className="text-xs text-slate-300 font-medium print:text-slate-600">
                  {activeProject.cycle.join(', ')}
                </span>
              </div>

              <h1 className={`${projectorMode ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-4xl'} font-extrabold font-heading tracking-tight text-white leading-tight print:text-slate-900`}>
                {activeProject.title}
              </h1>

              {/* Classroom metadata pills: Duration & Grouping */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold">
                {activeProject.duration && (
                  <div className="inline-flex items-center gap-1.5 bg-purple-800/80 text-purple-100 px-3 py-1 rounded-xl border border-purple-600/50 print:border-slate-300 print:bg-slate-100 print:text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-purple-300 print:text-slate-600" />
                    <span>Duração: {activeProject.duration}</span>
                  </div>
                )}

                {activeProject.grouping && (
                  <div className="inline-flex items-center gap-1.5 bg-indigo-800/80 text-indigo-100 px-3 py-1 rounded-xl border border-indigo-600/50 print:border-slate-300 print:bg-slate-100 print:text-slate-800">
                    <Users className="w-3.5 h-3.5 text-indigo-300 print:text-slate-600" />
                    <span>Modalidade: {activeProject.grouping}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Tools: Print, Projector, Favorite (no Genially links) */}
            <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto print:hidden">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-xs"
                title="Imprimir ou Guardar em PDF como Ficha de Aula A4"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Ficha A4</span>
              </button>

              <button
                onClick={() => setProjectorMode(!projectorMode)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shadow-xs ${
                  projectorMode
                    ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
                title={projectorMode ? 'Sair do Modo Projetor' : 'Modo Projetor / Quadro Interativo (Letra Grande)'}
              >
                {projectorMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>{projectorMode ? 'Vista Padrão' : 'Modo Projetor'}</span>
              </button>

              <button
                onClick={() => onToggleFavorite(activeProject.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                  savedFavorites.includes(activeProject.id)
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
                title={savedFavorites.includes(activeProject.id) ? 'Remover dos favoritos' : 'Guardar nos favoritos'}
              >
                <Heart className={`w-3.5 h-3.5 ${savedFavorites.includes(activeProject.id) ? 'fill-white' : ''}`} />
                <span>{savedFavorites.includes(activeProject.id) ? 'Guardado' : 'Favoritar'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Project Body: Structured Content */}
        <div className="p-6 sm:p-8 space-y-8 print:p-4 print:space-y-6">
          
          {/* Section A: Ideia Pedagógica e Dinâmica de Sala de Aula */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900">
              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm print:hidden">
                💡
              </span>
              <h3 className={`${projectorMode ? 'text-xl' : 'text-base sm:text-lg'} font-bold font-heading text-slate-900`}>
                Ideia da Atividade & Dinâmica na Aula
              </h3>
            </div>

            <div className={`bg-slate-50 border border-slate-200/90 rounded-2xl p-5 ${
              projectorMode ? 'text-lg sm:text-xl leading-relaxed text-slate-900' : 'text-sm sm:text-base leading-relaxed text-slate-700'
            } print:bg-white print:border-none print:p-0`}>
              {activeProject.idea}
            </div>
          </div>

          {/* Section B: Resultado Esperado */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 text-emerald-950 flex items-start gap-3.5 shadow-2xs print:bg-white print:border-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className={`${projectorMode ? 'text-base' : 'text-sm sm:text-base'} font-extrabold block text-emerald-900 mb-0.5`}>
                Resultado Concreto Esperado:
              </strong>
              <p className={`${projectorMode ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'} leading-relaxed text-emerald-900/90`}>
                {activeProject.result}
              </p>
            </div>
          </div>

          {/* Section C: Sugestão de Prompt Pronta a Copiar com Variáveis em Destaque */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-900">
                <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm print:hidden">
                  ✨
                </span>
                <h3 className={`${projectorMode ? 'text-xl' : 'text-base sm:text-lg'} font-bold font-heading`}>
                  Sugestão de Prompt para a IA
                </h3>
              </div>

              <button
                onClick={() => handleCopyPrompt(activeProject.promptSuggestion)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors shadow-2xs print:hidden"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Prompt Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-purple-600" />
                    <span>Copiar Comando</span>
                  </>
                )}
              </button>
            </div>

            <div className={`bg-slate-900 text-purple-200 p-5 rounded-2xl font-mono ${
              projectorMode ? 'text-base sm:text-xl' : 'text-xs sm:text-sm'
            } leading-relaxed border border-purple-950 shadow-inner print:bg-slate-50 print:text-slate-900 print:border-slate-300`}>
              <span className="text-amber-400 select-none block text-[11px] font-sans font-bold uppercase tracking-wider mb-2 print:text-slate-700">
                Comando pronto a usar (personalizar termos destacados):
              </span>
              "{renderPromptWithHighlightedVars(activeProject.promptSuggestion)}"
            </div>
          </div>

          {/* Section D: Rubrica de Avaliação Formativa (Alinhada ao PASEO/DGE) */}
          {activeProject.assessmentCriteria && (
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-950">
                <Award className="w-5 h-5 text-indigo-700 shrink-0" />
                <h4 className="font-extrabold text-sm sm:text-base font-heading">
                  Critérios de Avaliação Formativa (Processo de Aprendizagem):
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-1">
                  <span className="font-bold text-indigo-900 block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    Pensamento Crítico:
                  </span>
                  <p>{activeProject.assessmentCriteria.criticalThinking}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-1">
                  <span className="font-bold text-purple-900 block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                    Autoria e Transformação:
                  </span>
                  <p>{activeProject.assessmentCriteria.authorship}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-1">
                  <span className="font-bold text-emerald-900 block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Ética e Responsabilidade:
                  </span>
                  <p>{activeProject.assessmentCriteria.ethics}</p>
                </div>
              </div>
            </div>
          )}

          {/* Section E: Diferenciação Pedagógica (Inclusão / DUA) */}
          {activeProject.differentiation && (
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-900">
                <ShieldCheck className="w-5 h-5 text-purple-700 shrink-0" />
                <h4 className="font-extrabold text-sm sm:text-base font-heading">
                  Diferenciação Pedagógica & Inclusão (DUA):
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="text-purple-900 font-bold block mb-0.5">
                    Apoio / Simplificação:
                  </strong>
                  <p>{activeProject.differentiation.support}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="text-indigo-900 font-bold block mb-0.5">
                    Extensão / Desafio Avançado:
                  </strong>
                  <p>{activeProject.differentiation.extension}</p>
                </div>
              </div>
            </div>
          )}

          {/* Section F: Ferramentas Sugeridas com Hiperligações Oficiais (Sem Genially) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm print:hidden">
                🛠️
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold font-heading">
                  Ferramentas Sugeridas ({activeProject.toolIds.length})
                </h3>
                <span className="text-xs text-slate-500">
                  {activeProject.rawToolsText}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {activeProject.toolIds.map((tId) => {
                const tool = TOOLS[tId];
                if (!tool) return null;

                return (
                  <a
                    key={tId}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-purple-50/80 border border-slate-200 hover:border-purple-300 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-white shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                        <ToolIcon toolId={tId} size={26} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 group-hover:text-purple-700 text-xs sm:text-sm truncate">
                            {tool.name}
                          </span>
                          {tool.isAI && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800">
                              IA
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 block truncate">
                          {tool.category} • {tool.badge}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 bg-white group-hover:bg-purple-600 group-hover:text-white px-2.5 py-1.5 rounded-xl transition-colors shrink-0 shadow-2xs print:hidden">
                      <span>Abrir</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Section G: Dica do Professor */}
          <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-5 text-amber-950 flex items-start gap-3.5 shadow-2xs">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold text-sm sm:text-base block text-amber-900 mb-0.5">
                Dica Pedagógica para o Professor:
              </strong>
              <p className="text-xs sm:text-sm leading-relaxed text-amber-950/90">
                {activeProject.teacherTip}
              </p>
            </div>
          </div>

          {/* Section H: Nota de Rigor Científico Específica deste Projeto */}
          {projectScientificNote && (
            <div className={`rounded-2xl p-5 border flex items-start gap-3.5 shadow-2xs ${
              projectScientificNote.isCaution 
                ? 'bg-blue-50/80 border-blue-200 text-blue-950' 
                : 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
            }`}>
              <Microscope className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold text-sm sm:text-base block mb-0.5">
                  🔬 {projectScientificNote.title}:
                </strong>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {projectScientificNote.fact}
                </p>
              </div>
            </div>
          )}

          {/* Bottom Project Navigator */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 print:hidden">
            <div className="flex flex-wrap gap-1.5">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {prevProject && (
                <button
                  onClick={() => setActiveProjectId(prevProject.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-purple-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Projeto Anterior ({prevProject.number})</span>
                </button>
              )}

              {nextProject && (
                <button
                  onClick={() => setActiveProjectId(nextProject.id)}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
                >
                  <span>Próximo Projeto ({nextProject.number})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
