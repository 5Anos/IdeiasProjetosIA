export type EducationalCycle = '1.º Ciclo' | '2.º Ciclo' | '3.º Ciclo' | 'Ensino Secundário';

export type DisciplineName = 
  | 'Português'
  | 'Matemática'
  | 'Ciências Naturais'
  | 'História'
  | 'Educação Artística'
  | 'TIC'
  | 'Cidadania'
  | 'Inglês';

export interface ToolInfo {
  id: string;
  name: string;
  category: 'Imagem' | 'Texto / Chatbot' | 'Áudio / Voz' | 'Música' | 'Vídeo / Avatar' | 'Pesquisa' | 'Geometria / Dados' | 'Jogos / Interativo' | 'Revisão';
  description: string;
  url: string;
  isAI: boolean;
  color: string;
  badge: string;
}

export interface Activity {
  id: number;
  number: number;
  title: string;
  disciplines: DisciplineName[];
  rawDisciplinesText: string;
  gradeText: string;
  cycle: EducationalCycle[];
  idea: string;
  result: string;
  toolIds: string[];
  rawToolsText: string;
  promptSuggestion: string;
  teacherTip: string;
  geniallyUrl?: string;
  tags: string[];
  duration?: string;
  grouping?: string;
  assessmentCriteria?: {
    criticalThinking: string;
    authorship: string;
    ethics: string;
  };
  differentiation?: {
    support: string;
    extension: string;
  };
  interactiveDemoId?: 'draw_imagine' | 'guess_animal' | 'sound_world' | 'geometry_shapes' | 'fable_choice' | 'prompt_helper';
}

export interface DisciplineCardData {
  name: DisciplineName;
  slug: string;
  label: string;
  count: number;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  colorIcon: string;
  iconName: string;
}
