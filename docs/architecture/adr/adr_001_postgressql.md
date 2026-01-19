# ADR-001: Auswahl der Persistenztechnologie (PostgreSQL)

## Status

Pending

## Datum

2026-01-13

## Kontext

Das Backend des Mengenmeldung-Systems benötigt eine Persistenzlösung zur Speicherung von:

- Benutzerdaten [Login daten]
- Mengenmeldungen
- Statusinformationen (NEW, SENT, FAILED)
- Fehlermeldungen externer Systeme (in diesem Fall SOAP-dienst)

Die Persistenzlösung muss:

- relationale Daten unterstützen
- ACID-konform sein
- Spring Boot / JPA integrierbar
- testbar (Unit, Integrations und E2E Tests)

## Entscheidung

Als haupt Persistenztechnologie wird **PostgreSQL** eingesetzt.

Für Tests werden ergänzend verwendet:

- **H2** (In-Memory) für schnelle lokale Tests (Nur Temporal um sicherzustellen, dass alles läuft wie normal)
- **PostgreSQL** via Testcontainers für Integrationstests

## Begründung

PostgreSQL bietet:

- vollständige ACID-Unterstützung
- starke Konsistenz und Constraints
- sehr gute Integration mit Spring Data JPA & Hibernate
- hohe Stabilität und **Skalierbarkeit**
- ...

## Alternativen

- **MySQL / MariaDB**
  - weniger strikt bei Constraints
- **MongoDB / NoSQL**
  - ungeeignet für relationale Domänen
- **Nur In-Memory**
  - nicht produktionsfähig

## Konsequenzen

### Positiv

- stabile Datenhaltung
- klare relationale Modellierung
- gute Testbarkeit
- einfache Erweiterbarkeit

### Negativ

- Betrieb einer externen Datenbank notwendig
- höherer Ressourcenbedarf als In-Memory-Lösungen

## Umsetzung

- ORM: Hibernate (Spring Data JPA)
- Teststrategie:
  - Unit Tests → H2
  - Integrationstests → Testcontainers
