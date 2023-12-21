#!/usr/bin/env just --justfile
export PATH := "./node_modules/.bin:" + env_var('PATH')

build:
  rm -rf dist
  pnpm run build
  git add dist

push: build
    git add .
    git commit -m 'update'
    git push
