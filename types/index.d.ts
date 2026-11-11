export type SuggestionKind = 'skill' | 'mcp'

export type Suggestion = {
  id: string
  kind: SuggestionKind
  name: string
  title: string
  reason: string
  stars: number
  starsWhy: string
  role: string
  group: string
  direct: boolean
}

export type Limit = { kind: string; percentUsed: number; resetsAt?: string }

export type ModelPlan = {
  alias: string
  label: string
  effort?: string
  why: string[]
  subagent: boolean
}

// Propozycja poprawy promptu: generowana przez Sonneta, przyjęta przez użytkownika albo nie.
export type Improve = {
  why: string
  status: 'loading' | 'ready' | 'failed'
  text: string
  accepted: boolean
}

export type Pending = {
  text: string
  suggestions: Suggestion[]
  plan: ModelPlan | null
  isFirst: boolean
  deadline: number
  total: number
  currentLabel: string
  limits: Limit[]
  contextTokens: number
  needsSearch: boolean
  improve: Improve | null
  // Język interfejsu dla tego promptu: ustawiony ręcznie albo wykryty z promptu.
  lang: 'pl' | 'en'
}

// Kandydat z katalogu zewnętrznego wraz z wynikiem audytu.
export type ExternalItem = {
  id: string
  owner: string
  repo: string
  skill: string
  installs: number
  url: string
  score: number
  verdict: 'ok' | 'warn' | 'block' | 'pending' | 'unchecked'
  reasons: string[]
  content: string | null
}

declare module 'claude-code' {
  interface PluginState {
    'skill-router': {
      pending: Shaped<Pending | null>
      selected: string[]
      paused: boolean
      now: number
      sessionModel: string | null
      external: Shaped<ExternalItem[]>
      searching: boolean
      note: string
      currentEffort: string | null
      improveOpen: boolean
    }
  }
}
