# Skill Router

A Claude Code mod that looks at your prompt **before** it is sent and shows what the task needs:

- **Installed skills and MCP connectors** that fit the task, each with a one-line reason and a 1–5 star relevance rating. Items the prompt names directly are pre-selected.
- **A model suggestion** (for example Haiku or Sonnet for simpler work) with a short rationale, a rough cost estimate and your current plan limits.
- **External skills** from the public skills catalog, searched on demand or automatically. Each candidate is scanned before you can use it. Nothing is installed.
- **Prompt improvement.** When the prompt is vague, the mod offers a clearer version with a short explanation. You decide whether to send the original or the improved text.

Selected skills and connectors are added as context only for the message you send. Nothing is installed without your consent.

Polish version: [README.pl.md](README.pl.md)

## How it works

After you press Enter, a short countdown starts. Inside it you can:

| Action | Key | What happens |
| --- | --- | --- |
| Send as is | `b` | Sends your prompt; only tools you named directly stay selected |
| Send with defaults | `d` | Sends with the tools you selected |
| Use the suggested model | `m` | Switches the session model to the suggested one |
| Improve the prompt | `o` | Opens a before/after view above the input |
| Pause / resume | `p` | Stops or restarts the countdown |

When the countdown runs out, the prompt is sent as is (`b`). The timing defaults are 15 s for the model decision, 15 s plus 5 s per suggestion otherwise, and +10 s when a prompt improvement is offered.

In the improvement view: `x` rejects, `a` accepts the improved text, and `w` accepts it and sends it with the suggested model.

## Commands

- `/router on|off` – enable or disable the mod
- `/router czas <base> <per suggestion>` – countdown in seconds
- `/router auto on|off` – automatic catalog search when a task needs an external tool
- `/router stack <technologies>` – your stack, e.g. `Next.js, Supabase`, used when ranking suggestions

## Requirements

- Claude Code with mod (plugin hooks) support.
- Node.js with `npx` on the PATH, for catalog search (`npx skills find`).

## Installation

In a Claude Code session:

```bash
/plugin install skill-router --marketplace chudy34/skill-router
```

Or from the shell:

```bash
claude plugin marketplace add chudy34/skill-router
claude plugin install skill-router@skill-router
```

The repository is public, so installing it does not require GitHub access.

To update:

```bash
claude plugin marketplace update skill-router
claude plugin update skill-router@skill-router
```

## Privacy and cost

- Routing runs on Haiku on every prompt. Prompt improvement runs on Sonnet only when the prompt is judged vague, or when you press `o`.
- Catalog search sends short English keywords derived from your prompt to the skills index through `npx`. Your full prompt is not sent there.
- Downloaded `SKILL.md` files are read and audited locally and by a model before they can be used.

## Development

```bash
claude plugin test .
claude plugin validate .
```

## License

No license has been chosen yet. All rights reserved by the author until one is added.
