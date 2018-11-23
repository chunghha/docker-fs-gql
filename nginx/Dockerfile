FROM node:10-alpine as builder

WORKDIR /app
RUN npm -g i yarn
COPY . .
COPY proxy.conf.docker.json proxy.conf.json
RUN yarn

RUN yarn build client

FROM nginx:1.15-alpine

COPY /nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/apps/client/ /usr/share/nginx/html

EXPOSE 80 3333 4333

CMD ["nginx", "-g", "daemon off;"]
