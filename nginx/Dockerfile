ARG NGINX_VERSION=1.17
ARG NODE_VERSION=12

FROM node:${NODE_VERSION}-alpine as builder

WORKDIR /app
RUN npm -g i yarn
COPY . .
RUN yarn
RUN yarn build client

COPY proxy.conf.docker.json proxy.conf.json

FROM nginx:${NGINX_VERSION}-alpine

COPY /nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/apps/client/ /usr/share/nginx/html

EXPOSE 80 3333 4333

CMD ["nginx", "-g", "daemon off;"]
