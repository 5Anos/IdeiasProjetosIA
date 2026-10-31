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
    assert.ok(activity.teacherTip.length > 5, `Activity ${activity.id} must have a teacher tip`);
    assert.ok(activity.geniallyUrl.startsWith('https://'), `Activity ${activity.id} must have a valid Genially URL`);
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

test('filterActivities correctly filters by search term', () => {
  const animalResults = filterActivities(ACTIVITIES, { searchQuery: 'animal' });
  assert.ok(animalResults.length >= 1);
  assert.ok(animalResults.some(a => a.id === 2));

  const mathResults = filterActivities(ACTIVITIES, { searchQuery: 'equação' });
  assert.ok(mathResults.length >= 1);
  assert.ok(mathResults.some(a => a.id === 12));
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
