#!/bin/bash

yarn build
docker build -t osama/rota-web:latest . --no-cache
heroku container:push --app=rota-web web
heroku container:release --app=rota-web web