# Einsatz von Angular & Spring Boot

## 1. Ausgangssituation

Für das Mengenmeldungssystem wird eine Webanwendung mit klarer Trennung zwischen Frontend und Backend benötigt.

## 2. Ziel der Entscheidung

- Saubere Architektur mit klarer Verantwortlichkeit
- Gute Wartbarkeit und Erweiterbarkeit
- Einsatz etablierter Enterprise-Technologien

## 3. Betrachtete Alternativen

- Angular + Spring Boot
- React + Spring Boot
- Serverseitige Templates (z. B. Thymeleaf) [HTML + CSS in BE]

## 4. Bewertung der Alternativen

| Kriterium                 | Angular + Spring Boot | React + Spring Boot | Server-Templates |
| ------------------------- | --------------------- | ------------------- | ---------------- |
| Trennung FE / BE          | Sehr gut              | Sehr gut            | Gering           |
| Struktur & Skalierbarkeit | Hoch                  | Mittel              | Niedrig          |
| Enterprise-Eignung        | Sehr hoch             | Mittel              | Niedrig          |
| Wartbarkeit               | Hoch                  | Mittel              | Niedrig          |

## 5. Entscheidung

Es wird **Angular** für das Frontend und **Spring Boot** für das Backend eingesetzt.

## 6. Auswirkungen & Risiken

- Versionierung von Frontend und Backend notwendig
- CI/CD-Pipelines für zwei Repositories erforderlich

## 7. Empfehlung

Angular und Spring Boot bilden eine bewährte Enterprise-Architektur mit klarer Struktur, guter Wartbarkeit und langfristiger Erweiterbarkeit.
