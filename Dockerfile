FROM node:24-bookworm-slim AS builder

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@11.3.0 --activate
ENV CI=true

RUN apt update && apt install -y git

COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./

COPY web/package.json web/package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

WORKDIR /app/web
RUN pnpm build

RUN pnpm prune --prod

FROM node:24-bookworm-slim AS runner

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@11.3.0 --activate
ENV NODE_ENV=production
ENV CI=true

RUN apt-get update -y && apt-get install -y --no-install-recommends git && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/web/build ./web/build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

COPY ./.git ./.git

COPY ./package.json ./
COPY ./docker-entrypoint.sh ./

RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["/app/docker-entrypoint.sh"]