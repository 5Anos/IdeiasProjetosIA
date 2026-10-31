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

    // Search query check: STRICTLY by discipline as requested
    if (query) {
      const cleanQuery = query
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();

      const matchDiscipline = act.disciplines.some((d) => {
        const cleanD = d
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();

        // Exact or substring match within the discipline name
        if (cleanD.includes(cleanQuery)) return true;

        // Common educational synonyms
        if (d === 'Ciências Naturais' && (cleanQuery.includes('ciencia') || cleanQuery.includes('estudo do meio') || cleanQuery === 'cn')) {
          return true;
        }
        if (d === 'Educação Artística' && (cleanQuery.includes('arte') || cleanQuery.includes('artistica') || cleanQuery.includes('ev') || cleanQuery.includes('et'))) {
          return true;
        }
        if (d === 'Cidadania' && cleanQuery.includes('cidadan')) {
          return true;
        }
        if (d === 'Português' && (cleanQuery.includes('portug') || cleanQuery === 'pt')) {
          return true;
        }
        if (d === 'Matemática' && (cleanQuery.includes('matemat') || cleanQuery === 'mat')) {
          return true;
        }

        return false;
      });

      if (!matchDiscipline) {
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
