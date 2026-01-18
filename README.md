# README – Mengenmeldung Frontend

Diese Dokumentation bezieht sich auf das **Mengenmeldung Frontend**.  
Folgende Programme, Tools und Frameworks werden im Projekt verwendet:

**Editor:** [Visual Studio Code](https://code.visualstudio.com/)  
**Package-Manager:** [npm](https://docs.npmjs.com/about-npm)  
(Node.js **>= 18.x** erforderlich)

**Framework:** [Angular](https://angular.io/docs) (Angular CLI erforderlich)  
**UI-Komponenten & Layout:** [Bootstrap](https://getbootstrap.com/), [ng-bootstrap](https://ng-bootstrap.github.io/)

**Testing:**

- Unit Tests: Jasmine / Angular TestBed
- E2E Tests: Playwright

**CI/CD:**

- GitLab CI (Build & Tests)

---

## Quicklinks 🔗

- [Allgemeine Hinweise](#allgemeine-hinweise)
- [Projektspezifische Hinweise](#projektspezifische-fragen--antworten)
- [Troubleshooting](#troubleshooting)

---

### Allgemeine Hinweise

> Für alle unten aufgeführten Befehle kann das integrierte Terminal von VS Code verwendet werden.

### Projekt lokal klonen & installieren

1. Repository aus GitLab klonen:

   ```bash
   git clone <gitlab-repo-url>
   cd mengenmeldung-fe
   ```

2. Dependencies installieren

   ```bash
   npm install # Installiert node_modules
   ```

   - Aufgrund von Versionskonflikten, vorallem in älteren Projekten, kommt es vor, dass `npm install` mit der Flag `--legacy-peer-deps` ausgeführt.

3. Projekt local starten installieren

   ```bash
   npx ng serve
   ```

4. Die Anwendung ist anschließend unter <http://localhost:4200> erreichbar.
   - `Str` + `C`: Schließt _localhost_

### Projektspezifische Fragen & Antworten

Fragen, die spezifisch für das **Mengenmeldung Frontend** relevant sind:

1. **Muss die App Internet Explorer unterstützen?**
   - Nein

2. **Unter welcher Angular-Version ist die App entstanden?**
   - Angular 20

3. **Wird die App bzw. ihre Dependencies weiterhin upgedated?**
   - Ja (Angular, Bootstrap, ng-bootstrap, Playwright)

4. **Wo ist die API-Dokumentation zu finden (Swagger, …)?**
   - Lokal: <http://localhost:8080/swagger-ui.html>

5. **Gibt es Dependencies, die beim Entwickeln besonders beachtet werden müssen?**
   - Angular & Angular CLI müssen versionskompatibel sein
   - Node.js Version **>= 18** erforderlich
   - Playwright-Version muss zur installierten Chromium-Version passen
   - ng-bootstrap-Version muss zur Angular-Version kompatibel sein

---

## Troubleshooting

Ziel dieses Abschnittes ist es, häufig auftretende Probleme gesammelt zu dokumentieren.

### Mein Frontend startet nicht mehr mit `ng serve` – was tun?

1. Prüfe, ob du den neuesten Stand gepullt hast:

   ```bash
   git pull
   ```

2. Lösche den Ordner `node_modules` sowie die Datei `package-lock.json` und installiere die Dependencies neu:

   ```bash
   npm install
   ```

3. Prüfe deine `Node.js-Version`:

   ```bash
   node -v
   ```
