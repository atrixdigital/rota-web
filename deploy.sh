#!/bin/bash

yarn build
docker build -t osama/my-profile-next:latest . --no-cache
heroku container:push --app=osama-ahmed-resume web
heroku container:release --app=osama-ahmed-resume web