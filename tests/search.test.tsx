import { expect, test } from 'claude-code/testing'

import { parseFind } from '../hooks/search'

const SAMPLE = [
  '\u001b[38;5;102mInstall with\u001b[0m npx skills add <owner/repo@skill>',
  '',
  '\u001b[38;5;145manthropics/skills@pdf\u001b[0m \u001b[36m224.7K installs\u001b[0m',
  '\u001b[38;5;102m└ https://skills.sh/anthropics/skills/pdf\u001b[0m',
  '',
  '\u001b[38;5;145mpilioai/skills@remove-pdf-watermark\u001b[0m \u001b[36m7.4K installs\u001b[0m',
  '\u001b[38;5;102m└ https://skills.sh/pilioai/skills/remove-pdf-watermark\u001b[0m',
  '',
  'śmieć bez formatu',
  'owner/repo@bad skill 1K installs',
].join('\n')

test('parser wyciąga kandydatów z wyniku find i odrzuca śmieci', () => {
  const list = parseFind(SAMPLE)
  expect(list.length).toBe(2)
  expect(list[0]).toEqual({
    owner: 'anthropics',
    repo: 'skills',
    skill: 'pdf',
    installs: 224700,
    url: 'https://skills.sh/anthropics/skills/pdf',
  })
  expect(list[1]?.skill).toBe('remove-pdf-watermark')
})
