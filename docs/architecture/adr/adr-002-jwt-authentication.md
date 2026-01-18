# ADR-002: Authentifizierung und Autorisierung mittels JWT

## Status

Pending

## Datum

2026-01-13

## Kontext

Das Mengenmeldung-System benötigt eine Authentifizierungslösung für:

- Benutzer-Login
- Absicherung von REST-Endpunkten
- stateless Kommunikation zwischen Frontend und Backend

## Entscheidung

Es wird **JWT (JSON Web Token)** für Authentifizierung und Autorisierung verwendet.

Die Tokens werden:

- beim Login generiert
- im HTTP `Authorization` Header (`Bearer <token>`) übertragen
- serverseitig durch einen Filter validiert

## Begründung

JWT bietet:

- Stateless Authentifizierung
- Keine Server-Sessions notwendig
- Gute Unterstützung in Spring Security
- Einfache Integration im Frontend

## Alternativen

- **OAuth2 / Keycloak**
  - zu komplex für den Projektumfang
- **Basic Auth**
  - sicherheitstechnisch ungeeignet

## Konsequenzen

### Positiv

- gute Trennung von Frontend und Backend
- skalierbar

### Negativ

- Token-Invalidierung komplexer
- Token-Handling im Frontend notwendig

## Umsetzung

- Token-Erstellung: `JwtUtils`
- Filter: `OncePerRequestFilter`
- Security:
  - geschützte Endpunkte via Spring Security
  - Öffentliche Endpunkte: `/auth/login`
- Tests:
  - Controller Tests ohne Filter
  - Integrationstests mit echtem JWT [Mocked]
