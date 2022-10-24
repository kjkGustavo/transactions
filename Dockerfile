FROM node:16.18 as dependencies
WORKDIR /app
COPY package.json ./

RUN npm install

FROM node:16.18 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN npx prisma generate
RUN npm run build

FROM node:16.18 as runner
WORKDIR /app

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/src/env ./src/env
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "run", "start"]