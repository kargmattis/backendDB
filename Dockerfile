# Verwende ein offizielles Node.js-Image als Basis
FROM node:14

# Setze das Arbeitsverzeichnis innerhalb des Containers
WORKDIR /usr/src/app

# Kopiere die Abhängigkeiten und den Backend-Code
COPY package*.json ./
RUN npm install

# Kopiere den restlichen Backend-Code
COPY . .

# Exponiere den Port, auf dem die Anwendung läuft
EXPOSE 3000

# Starte die Anwendung
CMD ["npm", "start"]
