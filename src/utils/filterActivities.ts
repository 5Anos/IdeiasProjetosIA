import { Activity, DisciplineName, EducationalCycle } from '../types';

export interface FilterOptions {
  searchQuery?: string;
  selectedDiscipline?: DisciplineName | 'todas';
  selectedCycle?: EducationalCycle | 'todos';
  selectedToolId?: string | 'todas';
  favoritesOnly?: boolean;
  savedFavorites?: number[];
}

export function filterActivities(
  activities: Activity[],
  options: FilterOptions
): Activity[] {
  const query = (options.searchQuery || '').trim().toLowerCase();
  const discipline = options.selectedDiscipline || 'todas';
  const cycle = options.selectedCycle || 'todos';
  const toolId = options.selectedToolId || 'todas';
  const favoritesOnly = !!options.favoritesOnly;
  const savedFavorites = options.savedFavorites || [];

  return activities.filter((act) => {
    // Favorites check
    if (favoritesOnly && !savedFavorites.includes(act.id)) {
      return false;
    }

    // Discipline check
    if (discipline !== 'todas') {
      if (!act.disciplines.includes(discipline)) {
        return false;
      }
    }

    // Cycle check
    if (cycle !== 'todos') {
      if (!act.cycle.includes(cycle)) {
        return false;
      }
    }

    // Tool check
    if (toolId !== 'todas') {
      if (!act.toolIds.includes(toolId)) {
        return false;
      }
    }

    // Search query check
    if (query) {
      const matchTitle = act.title.toLowerCase().includes(query);
      const matchIdea = act.idea.toLowerCase().includes(query);
      const matchPrompt = act.promptSuggestion.toLowerCase().includes(query);
      const matchGrade = act.gradeText.toLowerCase().includes(query);
      const matchDisciplines = act.disciplines.some(d => d.toLowerCase().includes(query));
      const matchTags = act.tags.some(t => t.toLowerCase().includes(query));
      const matchResult = act.result.toLowerCase().includes(query);
      const matchTools = act.rawToolsText.toLowerCase().includes(query);

      if (
        !matchTitle &&
        !matchIdea &&
        !matchPrompt &&
        !matchGrade &&
        !matchDisciplines &&
        !matchTags &&
        !matchResult &&
        !matchTools
      ) {
        return false;
      }
    }

    return true;
  });
}

export function getDisciplineCounts(activities: Activity[]): Record<DisciplineName, number> {
  const counts: Record<string, number> = {
    'Português': 0,
    'Matemática': 0,
    'Ciências Naturais': 0,
    'História': 0,
    'Educação Artística': 0,
    'TIC': 0,
    'Cidadania': 0,
    'Inglês': 0,
  };

  activities.forEach(act => {
    act.disciplines.forEach(d => {
      if (counts[d] !== undefined) {
        counts[d]++;
      }
    });
  });

  return counts as Record<DisciplineName, number>;
}
