# Einsatz von JWT (JSON Web Token)

## 1. Ausgangssituation

Das Mengenmeldungssystem besteht aus einem FE und einem BE und benötigt eine sichere Authentifizierung für REST-APIs.

## 2. Ziel der Entscheidung

- Sichere Authentifizierung ohne Server-Session-State
- Einfache Integration zwischen Frontend und Backend

## 3. Betrachtete Alternativen

- Session-basierte Authentifizierung
- JWT (JSON Web Token)
- OAuth2 mit externem Identity Provider

## 4. Bewertung der Alternativen

| Kriterium               | JWT      | Session       | OAuth2 |
| ----------------------- | -------- | ------------- | ------ |
| Stateless               | Ja       | Nein          | Ja     |
| Skalierbarkeit          | Hoch     | Mittel        | Hoch   |
| Implementierungsaufwand | Mittel   | Niedrig       | Hoch   |
| Infrastrukturbedarf     | Gering   | Mittel        | Hoch   |
| Frontend-Integration    | Sehr gut | Eingeschränkt | Mittel |

## 5. Entscheidung

Es wird **JWT** für Authentifizierung und Autorisierung eingesetzt.

## 6. Auswirkungen & Risiken

- Sichere Verwaltung des JWT-Secrets erforderlich
- Token-Ablaufzeiten müssen korrekt konfiguriert werden

## 7. Empfehlung

JWT ermöglicht eine moderne, skalierbare und frontendfreundliche Authentifizierung und ist optimal für REST-basierte Architekturen geeignet.
