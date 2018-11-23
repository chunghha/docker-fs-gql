FROM node:10-alpine as builder

WORKDIR /app
RUN npm -g i yarn
COPY . .
RUN yarn

RUN yarn build server

EXPOSE 3333

CMD ["yarn", "run:server"]
