import { expect, test } from 'claude-code/testing'

const ROUTER_ANSWER = JSON.stringify({
  explicit: false,
  suggestions: [
    { kind: 'skill', name: 'pdf', reason: 'Prompt dotyczy faktur w PDF.', stars: 5, starsWhy: 'Wprost wspomina PDF.', role: 'czyta', group: 'pdf' },
  ],
  model: { suggest: true, alias: 'sonnet', effort: 'medium', why: ['Zadanie jest mechaniczne.'], subagent: false },
})

test('prompt z klawiatury wstrzymuje się i rysuje pasek', async ($, on) => {
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('ui.close', () => ({ value: undefined }))
  on('store.get', () => ({ value: undefined }))
  on('store.set', () => ({ value: undefined }))
  on('clock.now', () => ({ value: 1_000_000 }))
  on('env.get', () => ({ value: undefined }))
  on('model.complete', () => ({ value: { isAnswered: true, text: ROUTER_ANSWER, usage: {} } }))
  on('session.usage', () => ({
    value: {
      model: 'claude-opus-5-5',
      context: { totalTokens: 18000, breakdown: { model: 'claude-opus-5-5', totalTokens: 18000, skills: { skillFrontmatter: [{ name: 'pdf', source: 'userSettings' }] }, mcpTools: [] } },
      rateLimits: [{ kind: 'five_hour', percentUsed: 72 }],
    },
  }))

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  const res = await $.prompt.submit({ text: 'zrób mi z tych faktur PDF zestawienie w arkuszu', origin: { kind: 'composer' } } as never)

  expect(JSON.stringify(res)).toContain('Skill Router')
})
