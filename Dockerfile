FROM node:16.18.0

WORKDIR /server.ts

COPY . .

RUN yarn

EXPOSE 3333

CMD [ "node", "" ]