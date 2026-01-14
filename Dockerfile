FROM node:lts

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

WORKDIR /app/web
COPY web/package.json web/package-lock.json ./
RUN npm ci

WORKDIR /app
COPY . .

RUN npm run build

WORKDIR /app/web
RUN npm run build

WORKDIR /app

ENV NODE_ENV=production

CMD ["npm", "start"]