import { expect, test } from 'claude-code/testing'

const PENDING = {
  text: 'make a summary of these invoices in a sheet',
  suggestions: [
    { id: 's1', kind: 'skill', name: 'markitdown', title: 'markitdown', reason: 'Turns invoices into text.', stars: 4, starsWhy: 'Reads PDF.', role: 'reads', group: 'pdf', direct: true },
  ],
  plan: { alias: 'sonnet', label: 'Sonnet 5.5', effort: 'medium', why: ['The task is mechanical.'], subagent: false },
  isFirst: true,
  deadline: Date.now() + 60_000,
  total: 15,
  currentLabel: 'Opus 5.5',
  limits: [{ kind: 'five_hour', percentUsed: 12, resetsAt: '2026-11-11T16:40:00Z' }],
  contextTokens: 0,
  needsSearch: false,
  improve: { why: 'Adds the goal and the output format.', status: 'ready', text: 'Summarize invoices 1-3 in a sheet.', accepted: false },
  lang: 'en',
}

const PROPS = { hasSurvey: false, isWorking: false, maxRows: 40, bodyColumns: 100, scroll: { offset: 0, bodyRows: 39 }, view: {} } as const

test('angielski interfejs w pasku i panelu', async ($, on) => {
  on('state.get', (_$, e, next) =>
    (e as { key?: string }).key === 'pending' ? { value: { value: { shape: 'pending-5', value: PENDING }, version: 1 } } : next(e),
  )
  const bar = await $.ui.mount({ plugin: 'skill-router', component: 'AbovePrompt', requestId: 'above-prompt', surface: 'desktop', props: PROPS } as const)
  expect(await bar.find({ type: 'Text', text: /Model choice/ })).toBeDefined()
  expect(await bar.find({ type: 'Text', text: /This prompt could be clearer/ })).toBeDefined()
  expect(await bar.find({ type: 'Text', text: /Wybór modelu/ })).toBeUndefined()
  await bar.unmount()

  const pane = await $.ui.mount({
    plugin: 'skill-router',
    component: 'Pane',
    requestId: 'skill-router',
    surface: 'desktop',
    props: { title: 'Skill Router', isFocused: false, bodyColumns: 60, placement: 'dock', scroll: { offset: 0, bodyRows: 40 }, view: {} },
  } as const)
  expect(await pane.find({ type: 'Text', text: /Could help/ })).toBeDefined()
  expect(await pane.find({ type: 'Text', text: /IN PROMPT/ })).toBeDefined()
  expect(await pane.find({ type: 'Text', text: /Może pomóc/ })).toBeUndefined()
  await pane.unmount()
})
