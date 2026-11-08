import { expect, test } from 'claude-code/testing'

const PENDING = {
  text: 'zrób zestawienie z tych faktur w arkuszu',
  suggestions: [
    { id: 's1', kind: 'skill', name: 'markitdown', title: 'markitdown', reason: 'Zamiana faktur na tekst.', stars: 4, starsWhy: 'Czyta PDF.', role: 'czyta', group: 'pdf', direct: true },
    { id: 's2', kind: 'mcp', name: '1550be9b-4217-4762-91b3-22ba21297033', title: 'Google Sheets', reason: 'Zapisze zestawienie do arkusza.', stars: 5, starsWhy: 'Zapis do arkusza.', role: 'zapisuje', group: 'sheets', direct: false },
  ],
  plan: { alias: 'sonnet', label: 'Sonnet 5.5', effort: 'medium', why: ['Zadanie jest mechaniczne.'], subagent: false },
  isFirst: true,
  deadline: Date.now() + 60_000,
  total: 14,
  currentLabel: 'Opus 5.5',
  limits: [{ kind: 'five_hour', percentUsed: 72, resetsAt: '2026-11-08T16:40:00Z' }],
  contextTokens: 0,
}

const BAND = {
  plugin: 'skill-router',
  component: 'Pane',
  requestId: 'skill-router',
  props: { title: 'Skill Router', isFocused: false, bodyColumns: 60, placement: 'dock', scroll: { offset: 0, bodyRows: 40 }, view: {} },
} as const

test('pasek pokazuje nazwę konektora i tag użycia bezpośredniego', async ($, on) => {
  on('state.get', ($, e, next) =>
    (e as { key?: string }).key === 'pending'
      ? { value: { value: { shape: 'pending-3', value: PENDING }, version: 1 } }
      : next(e),
  )

  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...BAND, surface })
    expect(await ui.find({ type: 'Text', text: /markitdown/ })).toBeDefined()
    expect(await ui.find({ type: 'Text', text: /Google Sheets/ })).toBeDefined()
    expect(await ui.find({ type: 'Text', text: /Z PROMPTU/ })).toBeDefined()
    expect(await ui.find({ type: 'Text', text: /1550be9b/ })).toBeUndefined()
    await ui.unmount()
  }
})

test('pasek nad polem ma przyciski wysyłki i zaznaczenia z panelu', async ($, on) => {
  on('state.get', ($, e, next) =>
    (e as { key?: string }).key === 'pending'
      ? { value: { value: { shape: 'pending-3', value: PENDING }, version: 1 } }
      : next(e),
  )
  const ui = await $.ui.mount({
    plugin: 'skill-router',
    component: 'AbovePrompt',
    requestId: 'above-prompt',
    surface: 'desktop',
    props: { hasSurvey: false, isWorking: false, maxRows: 40, bodyColumns: 100, scroll: { offset: 0, bodyRows: 39 }, view: {} },
  } as const)
  expect(await ui.find({ key: 'plan' })).toBeDefined()
  expect(await ui.find({ key: 'plain' })).toBeDefined()
  await ui.unmount()
})
