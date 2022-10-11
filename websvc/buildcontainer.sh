#! /usr/bin/env bash

pack build thedevelopnik/es-overview-websvc \
  --env "someenv=somethingelse" \
  --creation-time now \
  --builder heroku/buildpacks:20 \
  --buildpack heroku/nodejs \
  --buildpack heroku/procfile@0.6.2 \
  --publish
