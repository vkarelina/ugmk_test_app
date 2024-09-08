FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g json-server

CMD ["sh", "-c", "json-server --watch public/products.json --port 3001 & npm run start"]

# Порт для приложения
EXPOSE 3000

# Порт для json-server
EXPOSE 3001
