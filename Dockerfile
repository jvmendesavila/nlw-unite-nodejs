# BASE
FROM node:20 AS base

RUN npm i -g pnpm

# DEPENDENCIES
FROM base AS dependencies

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

# BUILD
FROM base AS build

WORKDIR /usr/src/app

COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN pnpm build
RUN pnpm prune --prod

# DEPLOY
FROM node:20.12.1-alpine3.19 AS deploy

WORKDIR /usr/src/app

RUN npm i -g pnpm prisma

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/prisma ./prisma

ENV DATABASE_URL="file:./dev.db"

RUN pnpm prisma generate

EXPOSE 3333

CMD ["pnpm", "start"]