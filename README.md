**Anleitung zum Starten des Backend für delivery breakfast**

# Requirement
1. Terminal in VSCode starten (Shortcut Str+J). 
2. Anforderung: node.js `Node Version 19.3.0`für die bequeme Nutzung von npm. Falls der nvm Manager für Windows eingesetzt wird `nvm use 19.3.0`. Wenn die Version nicht installiert ist, den Command `nvm install 19.3.0`verwenden.
3. Hinzufügen einer .env Datei im Verzeichnis unter Ordner backendDB mit dem Inhalt `DATABASE = "sqlite"`.


# Lokal laufen lassen

1. Die aktuellsten notwendigen Komponenten installieren mit `npm i`. 
2. `npm test` befüllt die Datenbank mit einem Datensatz. Die  durch `npm test` erstellte Datenbank mit dem Titel productionEnvironment.sqlite kann mit dem https://sqliteviewer.app/ oder direkt in VS Code mit der Extension SQLite Viewer betrachtet werden. 
3. `npm start` startet das Backend.
 





