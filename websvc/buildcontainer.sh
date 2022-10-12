#! /usr/bin/env bash

pack build "thedevelopnik/es-overview-websvc:$1" \
  --creation-time now \
  --env "VUE_APP_CHATSVC_HOST=api.thedevelopnik.com/chatsvc" \
  --env "VUE_APP_CHATSVC_TCP_PROTOCOL=https://" \
  --env "VUE_APP_CHATSVC_SOCKET_PROTOCOL=wss://" \
  --env "VUE_APP_USERSVC_HOST=api.thedevelopnik.com/usersvc" \
  --env "VUE_APP_USERSVC_TCP_PROTOCOL=https://" \
  --env "VUE_APP_BASE_URL=esdemo.thedevelopnik.com" \
  --builder heroku/buildpacks:20 \
  --buildpack heroku/nodejs \
  --buildpack heroku/procfile@0.6.2 \
  --publish
