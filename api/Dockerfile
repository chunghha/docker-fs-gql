ARG NODE_VERSION=12

FROM node:${NODE_VERSION}-alpine as builder

WORKDIR /app
RUN npm -g i yarn
COPY . .
RUN yarn
RUN yarn build server

EXPOSE 3333

CMD ["yarn", "run:server"]
