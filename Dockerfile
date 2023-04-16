FROM node:16-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/prisma ./prisma

RUN npx prisma generate

EXPOSE 40005

CMD ["node", "dist/main.js"]