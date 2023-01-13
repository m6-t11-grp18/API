FROM node:16.18.0

WORKDIR /app

COPY "package.json" ./
COPY prisma ./prisma/

RUN yarn

EXPOSE 3333

COPY . .

CMD [ "yarn", "dev" ]