#!/usr/bin/env bash

if [ "$1" = "rebuild" ]; then
    docker build --tag=docker-fs-gql-api -f ./api/Dockerfile .
    docker build --tag=docker-fs-gql-front -f ./nginx/Dockerfile .
fi

docker-compose up -d nginx
docker-compose up -d api
