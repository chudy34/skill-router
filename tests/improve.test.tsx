import { expect, test } from 'claude-code/testing'

const PENDING = {
  text: 'sprawdź fakturę',
  suggestions: [],
  plan: null,
  isFirst: false,
  deadline: Date.now() + 60_000,
  total: 25,
  currentLabel: 'Opus 5.5',
  limits: [],
  contextTokens: 0,
  needsSearch: false,
  lang: 'pl',
  improve: {
    why: 'Brak celu i zakresu, dopisano je.',
    status: 'ready',
    text: 'Sprawdź fakturę 12/2026 i zwróć sumę netto.',
    accepted: false,
  },
}

const PROPS = {
  hasSurvey: false,
  isWorking: false,
  maxRows: 40,
  bodyColumns: 100,
  scroll: { offset: 0, bodyRows: 39 },
  view: {},
} as const

const stateWith = (open: boolean) => (_$: unknown, e: unknown, next: (e: unknown) => unknown) => {
  const key = (e as { key?: string }).key
  if (key === 'pending') return { value: { value: { shape: 'pending-5', value: PENDING }, version: 1 } }
  if (key === 'improveOpen') return { value: { value: open, version: 1 } }
  return next(e)
}

for (const surface of ['terminal', 'desktop'] as const) {
  test(`poprawa zamknięta: podpowiedź i przycisk nad polem (${surface})`, async ($, on) => {
    on('state.get', stateWith(false) as never)
    const ui = await $.ui.mount({
      plugin: 'skill-router',
      component: 'AbovePrompt',
      requestId: 'above-prompt',
      surface,
      props: PROPS,
    } as const)
    expect(await ui.find({ type: 'Text', text: /Prompt można doprecyzować/ })).toBeDefined()
    expect(await ui.find({ key: 'improve' })).toBeDefined()
    expect(await ui.find({ key: 'plain' })).toBeDefined()
    expect(await ui.find({ type: 'Text', text: /Poprawiony prompt/ })).toBeUndefined()
    await ui.unmount()
  })

  test(`poprawa otwarta: porównanie i decyzja zamiast karty modelu (${surface})`, async ($, on) => {
    on('state.get', stateWith(true) as never)
    const ui = await $.ui.mount({
      plugin: 'skill-router',
      component: 'AbovePrompt',
      requestId: 'above-prompt',
      surface,
      props: PROPS,
    } as const)
    expect(await ui.find({ type: 'Text', text: /Poprawiony prompt/ })).toBeDefined()
    expect(await ui.find({ type: 'Text', text: /Sprawdź fakturę 12\/2026/ })).toBeDefined()
    expect(await ui.find({ type: 'Text', text: /Brak celu i zakresu/ })).toBeDefined()
    expect(await ui.find({ key: 'reject' })).toBeDefined()
    expect(await ui.find({ key: 'accept' })).toBeDefined()
    expect(await ui.find({ key: 'acceptSend' })).toBeDefined()
    expect(await ui.find({ key: 'plain' })).toBeUndefined()
    await ui.unmount()
  })
}
