import test from 'node:test';
import assert from 'node:assert/strict';
import { ACTIVITIES } from '../data/activities';
import { TOOLS } from '../data/tools';
import { filterActivities, getDisciplineCounts } from './filterActivities';

test('activities dataset has exactly 20 items with sequential ids', () => {
  assert.equal(ACTIVITIES.length, 20);
  ACTIVITIES.forEach((activity, index) => {
    assert.equal(activity.id, index + 1);
    assert.equal(activity.number, index + 1);
    assert.ok(activity.title.length > 0, `Activity ${activity.id} must have a title`);
    assert.ok(activity.idea.length > 20, `Activity ${activity.id} must have an idea`);
    assert.ok(activity.result.length > 5, `Activity ${activity.id} must have a result`);
    assert.ok(activity.promptSuggestion.length > 5, `Activity ${activity.id} must have a prompt`);
    assert.ok(activity.duration && activity.duration.length > 2, `Activity ${activity.id} must have duration`);
    assert.ok(activity.assessmentCriteria, `Activity ${activity.id} must have assessmentCriteria`);
  });
});

test('every tool referenced in activities exists in the tools catalogue', () => {
  ACTIVITIES.forEach((activity) => {
    assert.ok(activity.toolIds.length > 0, `Activity ${activity.id} should have tool IDs`);
    activity.toolIds.forEach((tId) => {
      assert.ok(TOOLS[tId], `Tool ID "${tId}" referenced in activity ${activity.id} must exist in TOOLS dictionary`);
      assert.ok(TOOLS[tId].url.startsWith('https://'), `Tool "${tId}" must have a valid URL`);
      assert.ok(TOOLS[tId].name.length > 0, `Tool "${tId}" must have a name`);
    });
  });
});

test('filterActivities search query operates strictly by discipline', () => {
  // Searching a discipline returns its activities
  const mathResults = filterActivities(ACTIVITIES, { searchQuery: 'Matemática' });
  assert.equal(mathResults.length, 4);
  mathResults.forEach(a => assert.ok(a.disciplines.includes('Matemática')));

  const portResults = filterActivities(ACTIVITIES, { searchQuery: 'Português' });
  assert.ok(portResults.length >= 5);
  portResults.forEach(a => assert.ok(a.disciplines.includes('Português')));

  // Non-discipline terms (such as 'chocolate' or 'peixe') do NOT match when searching strictly by discipline
  const nonDisciplineResults = filterActivities(ACTIVITIES, { searchQuery: 'chocolate' });
  assert.equal(nonDisciplineResults.length, 0);

  const animalNonDiscipline = filterActivities(ACTIVITIES, { searchQuery: 'peixe' });
  assert.equal(animalNonDiscipline.length, 0);
});

test('filterActivities correctly filters by discipline and cycle', () => {
  const mathActivities = filterActivities(ACTIVITIES, { selectedDiscipline: 'Matemática' });
  assert.equal(mathActivities.length, 4);

  const firstCycle = filterActivities(ACTIVITIES, { selectedCycle: '1.º Ciclo' });
  assert.ok(firstCycle.length >= 5);
});

test('discipline counts calculates accurately', () => {
  const counts = getDisciplineCounts(ACTIVITIES);
  assert.equal(counts['Matemática'], 4);
  assert.ok(counts['Português'] >= 5);
  assert.ok(counts['Ciências Naturais'] >= 3);
});
