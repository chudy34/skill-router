// Parser wyniku `npx skills find`. Wynik to dane: nic z niego nie jest wykonywane.

export type Candidate = {
  owner: string
  repo: string
  skill: string
  installs: number
  url: string
}

const ANSI = /\u001b\[[0-9;]*m/g
const HEAD = /^([\w.-]+\/[\w.-]+)@([\w:.-]+)\s+([\d.,]+)([KM]?)\s+installs$/
const URL_LINE = /^└\s+(https:\/\/skills\.sh\/[\w.\-/:]+)$/

function count(num: string, unit: string): number {
  const n = Number(num.replace(',', '.'))
  if (!Number.isFinite(n)) return 0
  return Math.round(n * (unit === 'M' ? 1_000_000 : unit === 'K' ? 1_000 : 1))
}

export function parseFind(raw: string, max = 20): Candidate[] {
  const lines = raw.replace(ANSI, '').split('\n').map(l => l.trim())
  const out: Candidate[] = []
  for (let i = 0; i < lines.length && out.length < max; i++) {
    const head = HEAD.exec(lines[i] ?? '')
    if (!head) continue
    const [, repoPath = '', skill = '', num = '', unit = ''] = head
    const [owner = '', repo = ''] = repoPath.split('/')
    const next = URL_LINE.exec(lines[i + 1] ?? '')
    if (!owner || !repo || !next?.[1]) continue
    out.push({ owner, repo, skill, installs: count(num, unit), url: next[1] })
  }
  return out
}
