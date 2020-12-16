ARG NODE_VERSION=14

FROM node:${NODE_VERSION}-alpine as builder

WORKDIR /app
RUN npm -g i yarn --force
COPY . .
RUN yarn
RUN yarn build server

EXPOSE 3333

CMD ["yarn", "run:server"]
