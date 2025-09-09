FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "until nc -z mysql $MYSQL_TCP_PORT; do echo 'Waiting for MySQL...'; sleep 2; done; npm run start"]