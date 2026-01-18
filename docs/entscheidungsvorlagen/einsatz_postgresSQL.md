# Einsatz von PostgreSQL

## 1. Ausgangssituation

Für das Mengenmeldungssystem wird eine relationale Datenbank benötigt, die zuverlässig (ACID), skalierbar ist.

## 2. Ziel der Entscheidung

- Zuverlässige Persistenz von Geschäftsdaten
- Gute Wartbarkeit und Skalierbarkeit
- Keine hohen Lizenzkosten
- Langfristige Zukunftssicherheit (Open Source)

## 3. Betrachtete Alternativen

- PostgreSQL
- MySQL
- Oracle Database
- NoSQL [Kein Fit für dieses Projekt]

## 4. Bewertung der Alternativen

| Kriterium               | PostgreSQL  | MySQL         | Oracle      |
| ----------------------- | ----------- | ------------- | ----------- |
| Lizenzkosten            | Open Source | Open Source   | Hoch        |
| Spring-Boot-Integration | Sehr gut    | Gut           | Aufwendig   |
| ACID / Transaktionen    | Vollständig | Eingeschränkt | Vollständig |
| Skalierbarkeit          | Hoch        | Mittel        | Hoch        |
| Vendor Lock-in          | Nein        | Nein          | Ja          |

## 5. Entscheidung

Es wird **PostgreSQL** als relationale Datenbank eingesetzt.

## 6. Auswirkungen & Risiken

- Betrieb und Wartung einer PostgreSQL-Instanz erforderlich
- Integrationstests benötigen Docker/Testcontainers
- Regelmäßige Backups und Updates notwendig [immer so für jede Technlogie]

## 7. Empfehlung

PostgreSQL bietet eine stabile, kostenfreie und enterprise-taugliche Lösung mit sehr guter Spring-Boot-Integration und hoher Zukunftssicherheit.
