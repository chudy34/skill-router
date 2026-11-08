# Skill Router

Mod do Claude Code. Zanim prompt zostanie wysłany, sprawdza, czego zadanie potrzebuje, i pokazuje:

- **zainstalowane skille i konektory MCP**, które pasują do zadania, z jednym zdaniem uzasadnienia i oceną trafności 1–5 gwiazdek. Narzędzia nazwane wprost w prompcie są zaznaczone od razu.
- **propozycję modelu** (np. Haiku lub Sonnet do prostszych zadań) z krótkim uzasadnieniem, szacunkiem kosztu i Twoimi limitami planu.
- **zewnętrzne skille** z publicznego katalogu, wyszukiwane na żądanie albo automatycznie. Każdy kandydat jest skanowany przed użyciem. Nic nie jest instalowane.
- **poprawę promptu.** Gdy prompt jest niejasny, mod proponuje wersję doprecyzowaną z krótkim wyjaśnieniem. Ty decydujesz, czy wysłać oryginał, czy poprawiony tekst.

Wybrane skille i konektory trafiają do modelu jako kontekst tylko do wiadomości, którą wysyłasz. Nic nie jest instalowane bez Twojej zgody.

English version: [README.md](README.md)

## Jak to działa

Po naciśnięciu Enter rusza krótkie odliczanie. W jego trakcie możesz:

| Akcja | Klawisz | Co się dzieje |
| --- | --- | --- |
| Wyślij bez zmian | `b` | Wysyła prompt; zostają tylko narzędzia, które wskazałeś wprost |
| Wyślij z domyślnymi | `d` | Wysyła z narzędziami, które zaznaczyłeś |
| Użyj proponowanego modelu | `m` | Przełącza model sesji na proponowany |
| Popraw prompt | `o` | Otwiera widok przed/po nad polem wpisywania |
| Pauza / wznów | `p` | Zatrzymuje lub wznawia odliczanie |

Po upływie czasu prompt idzie bez zmian (jak `b`). Domyślne czasy: 15 s na decyzję o modelu, 15 s plus 5 s za każdą propozycję w pozostałych przypadkach, a przy proponowanej poprawie dodatkowe 10 s.

W widoku poprawy: `x` odrzuca, `a` przyjmuje poprawiony tekst, a `w` przyjmuje go i wysyła z proponowanym modelem.

## Komendy

- `/router on|off` – włącza lub wyłącza mod
- `/router czas <baza> <na propozycję>` – czas odliczania w sekundach
- `/router auto on|off` – automatyczne szukanie w katalogu, gdy zadanie wymaga zewnętrznego narzędzia
- `/router stack <technologie>` – Twój stack, np. `Next.js, Supabase`, używany przy ocenie propozycji

## Wymagania

- Claude Code z obsługą modów (hooki pluginów).
- Node.js z `npx` w PATH, do wyszukiwania w katalogu (`npx skills find`).

## Instalacja

W sesji Claude Code:

```bash
/plugin install skill-router --marketplace chudy34/skill-router
```

Albo z powłoki:

```bash
claude plugin marketplace add chudy34/skill-router
claude plugin install skill-router@skill-router
```

Repozytorium jest publiczne, więc do instalacji nie trzeba dostępu do GitHuba.

Aktualizacja:

```bash
claude plugin marketplace update skill-router
claude plugin update skill-router@skill-router
```

## Prywatność i koszty

- Routing działa na Haiku przy każdym prompcie. Poprawa promptu działa na Sonnecie tylko wtedy, gdy prompt uznano za niejasny albo gdy naciśniesz `o`.
- Wyszukiwanie w katalogu wysyła krótkie słowa kluczowe po angielsku, wyprowadzone z promptu, do indeksu skilli przez `npx`. Cały prompt tam nie trafia.
- Pobrane pliki `SKILL.md` są czytane i audytowane lokalnie oraz przez model, zanim będzie można ich użyć.

## Rozwój

```bash
claude plugin test .
claude plugin validate .
```

## Licencja

Udostępnione na licencji MIT. Zobacz [LICENSE](LICENSE).
