FROM node:18-alpine

WORKDIR /app

# Copiar package.json
COPY package.json .

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
