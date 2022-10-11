#! /usr/bin/env bash

pack build "thedevelopnik/es-overview-usersvc:$1" \
  --creation-time now \
  --builder heroku/buildpacks:20 \
  --buildpack heroku/go \
  --buildpack heroku/procfile@0.6.2 \
  --publish