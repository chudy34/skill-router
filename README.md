# Skill Router

Mod do Claude Code. Przed wysłaniem prompta sprawdza, czego zadanie potrzebuje, i pokazuje:

- zainstalowane skille i MCP z uzasadnieniem i gwiazdkami trafności,
- propozycję modelu (np. Sonnet dla prostych zadań) z kosztem i limitami,
- wyniki z katalogu zewnętrznego, sprawdzone skanem treści przed użyciem.

Zewnętrzne skille są używane tylko w wiadomości, którą wybrałeś, i nic nie jest instalowane bez zgody.

## Komendy

- `/router on|off` – włącza lub wyłącza mod
- `/router czas <baza> <na propozycję>` – czas na decyzję w sekundach
- `/router auto on|off` – automatyczne szukanie w katalogu przy zadaniach wymagających zewnętrznego narzędzia
- `/router stack <technologie>` – Twój stack, np. `Next.js, Supabase`

## Instalacja

W terminalu, w sesji Claude Code:

```bash
/plugin install skill-router --marketplace chudy34/skill-router
```

Repozytorium jest prywatne: instalować mogą je tylko osoby, które mają dostęp na GitHubie i skonfigurowany GitHub na swoim komputerze.
