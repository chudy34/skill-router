import { expect, test } from 'claude-code/testing'

const SETTINGS_PANE = {
  plugin: 'skill-router',
  component: 'Pane',
  requestId: 'skill-router-settings',
  props: { title: 'Skill Router', isFocused: false, bodyColumns: 60, placement: 'dock', scroll: { offset: 0, bodyRows: 40 }, view: {} },
} as const

test('panel ustawień zmienia język na stałe i przerysowuje się', async ($, on) => {
  const saved: unknown[] = []
  on('store.get', () => ({ value: undefined }))
  on('store.set', (_$, e) => {
    saved.push((e as { value?: unknown }).value)
    return { value: undefined }
  })
  const ui = await $.ui.mount({ ...SETTINGS_PANE, surface: 'desktop' })
  expect(await ui.find({ type: 'Text', text: /Skill Router settings/ })).toBeDefined()
  expect(await ui.find({ key: 'base-inc' })).toBeDefined()
  await ui.press({ key: 'lang-pl' })
  expect(await ui.find({ type: 'Text', text: /Ustawienia Skill Routera/ })).toBeDefined()
  expect(JSON.stringify(saved)).toContain('"lang":"pl"')
  await ui.unmount()
})
