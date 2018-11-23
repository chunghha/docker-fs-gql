#!/usr/bin/env bash

docker stop $(docker ps -aqf "name=front")
docker stop $(docker ps -aqf "name=api")
