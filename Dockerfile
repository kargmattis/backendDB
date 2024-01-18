# Verwende ein offizielles Node.js-Image als Basis
FROM node:18

# Setze das Arbeitsverzeichnis innerhalb des Containers
WORKDIR /usr/src/app

# Kopiere die Abhängigkeiten und den Backend-Code
COPY package*.json ./
RUN npm install
# Kopiere den restlichen Backend-Code
ENV DATABASE=postgres NODE_ENV=production
COPY . .
RUN npm run build

# Exponiere den Port, auf dem die Anwendung läuft
EXPOSE 3001:3001

# Starte die Anwendung
CMD ["npm", "run", "startprod"]
