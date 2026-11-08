import { expect, test } from 'claude-code/testing'

const FIND_OUTPUT = [
  '\u001b[38;5;145manthropics/skills@pdf\u001b[0m \u001b[36m224.7K installs\u001b[0m',
  '\u001b[38;5;102m└ https://skills.sh/anthropics/skills/pdf\u001b[0m',
  '',
  'pilioai/skills@remove-pdf-watermark 7.4K installs',
  '└ https://skills.sh/pilioai/skills/remove-pdf-watermark',
].join('\n')

const PENDING = {
  text: 'zrób zestawienie z tych faktur w arkuszu',
  suggestions: [],
  plan: null,
  isFirst: false,
  deadline: Date.now() + 60_000,
  total: 14,
  currentLabel: 'Opus 5.5',
  limits: [],
  contextTokens: 0,
  needsSearch: false,
}

const PANE = {
  plugin: 'skill-router',
  component: 'Pane',
  requestId: 'skill-router',
  props: { title: 'Skill Router', isFocused: false, bodyColumns: 60, placement: 'dock', scroll: { offset: 0, bodyRows: 40 }, view: {} },
} as const

test('wynik wyszukiwania pojawia się w panelu po kliknięciu', async ($, on) => {
  on('state.get', ($, e, next) =>
    (e as { key?: string }).key === 'pending'
      ? { value: { value: { shape: 'pending-3', value: PENDING }, version: 1 } }
      : next(e),
  )
  on('store.get', () => ({ value: undefined }))
  on('store.set', () => ({ value: undefined }))
  let runs = 0
  on('process.run', () => {
    runs += 1
    return {
      value: { exitCode: 0, stdout: FIND_OUTPUT, stderr: '', isStdoutTruncated: false, isStderrTruncated: false },
    }
  })
  on('http.fetch', () => ({ value: { status: 404, ok: false, headers: {}, text: '' } }))
  on('model.complete', () => ({ value: { isAnswered: false, reason: 'api-error', status: 500, error: 'test' } }))

  const ui = await $.ui.mount({ ...PANE, surface: 'desktop' })
  await ui.press({ key: 'search' })

  expect(runs).toBe(1)
  expect(await ui.find({ type: 'Text', text: /ZEWN/ })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: /pdf/ })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: /remove-pdf-watermark/ })).toBeDefined()
  await ui.unmount()
})
